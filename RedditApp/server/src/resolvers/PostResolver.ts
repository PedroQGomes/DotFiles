import { Ctx, Query,Int, Resolver,Arg, Mutation } from "type-graphql";
import{ Post } from "../entities/Post"
import { MyContext } from "src/types";


@Resolver()
export class PostResolver{

    @Query(() => [Post]) // tipo de output que a query retorna
    posts( @Ctx() {em}: MyContext): Promise<Post[]> // Contexto para ter acesso ao type orm e dps é type checking da query pelo Ts
    {
        return em.find(Post,{});
    }

    @Query(() => Post,{nullable:true}) 
    post(
        @Arg('id') id: number, 
        @Ctx() {em}: MyContext ): Promise<Post | null> 
    {
        return em.findOne(Post,{id});
    }

    
    @Mutation(() => Post) 
    async creatPost(
        @Arg('title') title: string, // Arg(key) value
        @Ctx() {em}: MyContext ): Promise<Post> 
    {
        const post = em.create(Post,{title})
        await em.persistAndFlush(post);
        return post;
    }


     @Mutation(() => Post,{ nullable: true}) 
    async updatePost(
        @Arg('id') id: number,
        @Arg('title',() => String,{ nullable:true }) title: string, // Arg(key) value
        @Ctx() {em}: MyContext ): Promise<Post | null> 
    {
        const post = await em.findOne(Post,{id})
        if(!post){
            return null;
        }

        if(typeof title !== "undefined"){
            post.title = title;
            await em.persistAndFlush(post);
        }
        return post;
    }


    @Mutation(() => Boolean) 
    async deletePostById(
        @Arg('id') id: number,
        @Ctx() {em}: MyContext ): Promise<boolean> 
    {
        await em.nativeDelete(Post,{id});

        return true;
    }


}