import "reflect-metadata"
import {MikroORM} from "@mikro-orm/core"
import { __prod__ } from "./constant";
import microConfig from './mikro-orm.config'
import express from 'express'
import {ApolloServer} from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/PostResolver";

const main = async () =>{
    
    const orm = await MikroORM.init(microConfig);

    await orm.getMigrator().up(); // executa as migraçoes


    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver,PostResolver],
            validate:false

        }),
        context:() =>({em: orm.em}), // o contexto serve para por objectos que podem ser acedidos por todos os resolvers do graphql
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({app});
    

    app.listen(4000,() =>{
        console.log("server started at porst 4000")

    })


    

};

main();
console.log("hello world")


//const post = orm.em.create(Post,{title:"my first post"}); insere um post na bd
//await orm.em.persistAndFlush(post);

// const post = await orm.em.find(Post,{}) vai buscar todos os posts
 // console.log(post);