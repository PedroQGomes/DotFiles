import { Ctx, Resolver,Arg, Mutation, InputType, Field, ObjectType } from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../entities/User";
import argon2 from 'argon2';


@InputType()
class UsernamePasswordInput {

    @Field()
    username:string

    @Field()
    password:string
}

@ObjectType()
class FieldError {

    @Field()
    field:String;

    @Field()
    message:String;
}

@ObjectType()
class UserResponse{
    @Field(() => [FieldError],{ nullable:true })
    errors?: FieldError[]

    @Field(()=> User,{ nullable:true })
    user?:User
}



@Resolver()
export class UserResolver{//

    
    @Mutation(() => UserResponse) 
    async register(@Ctx() {em}: MyContext, @Arg('options') options : UsernamePasswordInput): Promise<UserResponse>
    {
        if(options.username.length < 2){
            return{
                errors:[{field:"username",message:"length must be greater then 2"}]
            }
        }
        if(options.password.length < 3){
            return{
                errors:[{field:"password",message:"length must be greater then 3"}]
            }
        }

        const passwordHashed = await argon2.hash(options.password);
        const user = em.create(User,{username:options.username,password:passwordHashed});
        
        try{
            await em.persistAndFlush(user);
        }catch(err){
            if(err.code === '23505' || err.detail.includes("already exists")){
                return {
                    errors:[{field:"username",message:"username already taken"}]
                }
            }
        }
        
        return {user};

    }


    @Mutation(() => UserResponse) 
    async login(@Ctx() {em}: MyContext, @Arg('options') options : UsernamePasswordInput): Promise<UserResponse>
    {
        const user = await em.findOne(User,{username:options.username});
        
        if(!user){
            return{
                errors:[
                    {
                        field: "Username",
                        message: "Username doesnt exist",
                    },
                ]
            }
        }
        const valid = await argon2.verify(user.password,options.password);
        if(!valid){
            return{
                errors:[
                    {
                        field: "Password",
                        message: "Incorrect Password",
                    },
                ]
            }
        }

        return {
            user,
        }

    }


}