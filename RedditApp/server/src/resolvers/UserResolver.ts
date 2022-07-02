import { Ctx, Resolver,Arg, Mutation, Field, ObjectType, Query, FieldResolver, Root } from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../entities/User";
import argon2 from 'argon2';
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constant";
import { UsernamePasswordInput } from "../utils/UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";

@ObjectType()
class FieldError {

    @Field()
    field:string;

    @Field()
    message:string;
}

@ObjectType()
class UserResponse{
    @Field(() => [FieldError],{ nullable:true })
    errors?: FieldError[]

    @Field(()=> User,{ nullable:true })
    user?:User
}



@Resolver(User)
export class UserResolver{//

    

    @FieldResolver(() => String)
    email(@Root() user:User, @Ctx(){req}:MyContext){ // only show email to the user and not to everyone
        if(req.session.userId === user.id){
            return user.email;
        }

        return "";
    }


    @Mutation(()=>UserResponse)
    async changePassword(@Arg("token") token:string,@Arg("newPassword") newPassword:string,@Ctx() { redis,req }:MyContext):Promise<UserResponse>{
        
        if(newPassword.length <= 2){
            return{ errors: [
                {
                    field:"newPassword",
                    message:"password must be greater than 2 characters"
                }
            ]
        }}

        const key = FORGOT_PASSWORD_PREFIX + token;
        const userId = await redis.get(key);
        
        
        if(!userId){
            return {
                errors:[{
                    field:"token",
                    message:"token expired"
                }]
            }
        }

        const userIdNum = parseInt(userId);

        const user = await User.findOne(userIdNum);

        if(!user){
            return {
                errors:[{
                    field:"token",
                    message:"user no longer exists"
                }]
            }
        }

        await User.update({id:userIdNum},{ password: await argon2.hash(newPassword) });

        await redis.del(key); // elimina a chave do redis para o link nao voltar a ser valido

        req.session.userId = user.id;


        return {user};
    }



    @Mutation(()=>Boolean) 
    async forgotPassword(@Arg("email") email:string,@Ctx() {redis }:MyContext){
        const user = await User.findOne( {where:{email}} );
        if(!user){
            // the email is not in the db
            return true;
        }

        // send email to user with the token
        const token =  v4();

        await redis.set(FORGOT_PASSWORD_PREFIX + token,user.id, "ex",1000*60*60*24*3);//3 days

        sendEmail(email,`<a href="http://localhost:3000/change-password/${token}">reset password</a>`);
        return true;
    }




    @Mutation(() => UserResponse) 
    async register(@Ctx() {req}: MyContext, @Arg('options') options : UsernamePasswordInput): Promise<UserResponse>
    {
        const errors = validateRegister(options);

        if(errors){
            return {errors};
        }

        const passwordHashed = await argon2.hash(options.password);
        let user;
        
        try{
              user = await User.create({username: options.username,email: options.email,password: passwordHashed}).save();
        //    const result =  await getConnection().createQueryBuilder().insert().into(User).values({
        //         username: options.username,
        //         email: options.email,
        //         password: passwordHashed
        //    }).returning('*').execute();

        //    user = result.raw[0];
           
        }catch(err){
            if(err.code === '23505' || err.detail.includes("already exists")){
                return {
                    errors:[{field:"username",message:"username already taken"}]
                }
            }
        }

        req.session.userId = user?.id;

        return {user};

    }


    @Mutation(() => UserResponse) 
    async login(@Ctx() {req}: MyContext, @Arg('usernameOrEmail') usernameOrEmail : string,@Arg("password") password :string): Promise<UserResponse>
    {
        const user = await User.findOne(usernameOrEmail.includes("@") ? { where :{ email:usernameOrEmail }}: { where: { username:usernameOrEmail }});
        
        if(!user){
            return{
                errors:[
                    {
                        field: "usernameOrEmail",
                        message: "Username doesnt exist",
                    },
                ]
            }
        }
        const valid = await argon2.verify(user.password,password);
        if(!valid){
            return{
                errors:[
                    {
                        field: "password",
                        message: "Incorrect Password",
                    },
                ]
            }
        }

        req.session.userId = user.id;
        return {
            user,
        }

    }

    @Query(() => User, {nullable:true})
    async me(@Ctx() {req}: MyContext){
        if(!req.session.userId){
            return null;
        }

        
        return User.findOne(req.session.userId);
    }


    @Mutation(() => Boolean, {nullable:true})
    async logout(@Ctx() {req,res}: MyContext){
        return new Promise(resolve => req.session.destroy(
            (err) =>{
                res.clearCookie(COOKIE_NAME);
                if(err){
                    console.log(err);
                    resolve(false)
                    return;
                }
                resolve(true)
            }
        ))
    }

}