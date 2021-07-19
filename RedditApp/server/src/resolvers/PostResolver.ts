import { Ctx, Query, Resolver } from "type-graphql";
import{ Post } from "../entities/Post"
import { MyContext } from "src/types";


@Resolver()
export class PostResolver{

    @Query(() => [Post]) // recebe nada de input e retorna um array de posts
    posts( @Ctx() {em}: MyContext): Promise<Post[]> // Contexto para ter acesso ao type orm e dps é type checking do
    {
        return em.find(Post,{});
    }
}