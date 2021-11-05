import "reflect-metadata"
import {MikroORM} from "@mikro-orm/core"
import { COOKIE_NAME, __prod__ } from "./constant";
import microConfig from './mikro-orm.config'
import express from 'express'
import {ApolloServer} from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/PostResolver";
import {UserResolver} from './resolvers/UserResolver';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'; 
import cors from 'cors'


const main = async () =>{
    
    const orm = await MikroORM.init(microConfig);

    await orm.getMigrator().up(); // executa as migraçoes


    const app = express();
    

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()
    
    app.use(cors({
        origin:"http://localhost:3000",
        credentials:true
    }));


    app.use(
    session({
        name:COOKIE_NAME,
        store: new RedisStore({ client: redisClient,disableTouch: true  }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            httpOnly:true,
            sameSite: 'lax',    //csrf
            secure:__prod__ 
        }, 
        saveUninitialized: false,
        secret: 'asjdnasjdasjdnajsnd',
        resave: false,
    }))

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[PostResolver,UserResolver],
            validate:false

        }),
        context:({req,res}) =>({em: orm.em,req,res}), // o contexto serve para por objectos que podem ser acedidos por todos os resolvers do graphql
    });

    await apolloServer.start();


    apolloServer.applyMiddleware({app,cors:false});
    

    app.listen(4000,() =>{
        console.log("server started at port 4000")
    })

};

main();

//const post = orm.em.create(Post,{title:"my first post"}); insere um post na bd
//await orm.em.persistAndFlush(post);

// const post = await orm.em.find(Post,{}) vai buscar todos os posts
 // console.log(post);