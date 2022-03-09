import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types";
import { Query, Resolver,Arg, Mutation, InputType, Ctx,Field, UseMiddleware, Int, FieldResolver, Root } from "type-graphql";
import{ Post } from "../entities/Post"
import { getConnection } from "typeorm";


@InputType()
class PostInput {
    @Field()
    title:string;
    @Field()
    text:string;
}

@Resolver(Post)
export class PostResolver{

    @FieldResolver(()=>String)
    textSnippet(@Root() post: Post){
        return post.text.slice(0,50); // return the first 50 characters of the text
    }


    // Query para aceder a todos os Posts.
    @Query(() => [Post]) // tipo de output que a query retorna
    posts(@Arg('limit',()=> Int) limit :number,@Arg('cursor',()=> String, {nullable:true} ) cursor :string | null ): Promise<Post[]> // Contexto para ter acesso ao type orm e dps é type checking da query pelo Ts
    {

        const realLimit = Math.min(50,limit);
        const qb =  getConnection()
            .getRepository(Post)
            .createQueryBuilder("p")
            .orderBy('p.createdAt', 'DESC')
            .take(realLimit)

        if(cursor){
            qb.where('p.createdAt < :cursor', { cursor: new Date(parseInt(cursor)) });
        }
        return qb.getMany();
    }

    // Query para aceder a um post com um dado id
    @Query(() => Post,{ nullable:true }) 
    post(
        @Arg('id') id: number, 
        ): Promise<Post | undefined> 
    {
        return Post.findOne(id);
    }

    // Criaçao de um novo Post
    @Mutation(() => Post) 
    @UseMiddleware(isAuth)
    async createPost(
        @Arg('input') input: PostInput, @Ctx(){req} :MyContext): Promise<Post> 
    {
        return Post.create({...input, creatorId: req.session.userId }).save();
    }


    // Alteraçao de um Post dado um id.
    @Mutation(() => Post,{ nullable: true}) 
    async updatePost(
        @Arg('id') id: number,
        @Arg('title',() => String,{ nullable:true }) title: string, // Arg(key) value
         ): Promise<Post | null> 
    {
        const post = await Post.findOne(id)
        if(!post){
            return null;
        }

        if(typeof title !== "undefined"){
            await Post.update({id},{title});
        }
        return post;
    }

    // Eliminar um Post pelo id.
    @Mutation(() => Boolean) 
    async deletePostById(
        @Arg('id') id: number,
        ): Promise<boolean> 
    {
        await Post.delete(id);

        return true;
    }


}