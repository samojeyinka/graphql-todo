const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require('mongoose');
require('dotenv').config();



async function startServer(){
        const app = express();
        const apolloServer = new ApolloServer({
             typeDefs,
             resolvers, 
        });

        await apolloServer.start();

        apolloServer.applyMiddleware({app: app});

        app.use((req,res) => {
            res.send("Graphql Todo api");
        })

        await mongoose.connect(process.env.MONGO_URL,{
        
        });
        console.log('Mongoose connected successfully');
        app.listen(4000, () => console.log(`Server is listening on port 4000`));
}


startServer();