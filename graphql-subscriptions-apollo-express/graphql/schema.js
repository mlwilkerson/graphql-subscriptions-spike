const {makeExecutableSchema} = require('graphql-tools');
const {Post} = require('../database/models');
// const async = require('asyncawait/async');
// const await = require('asyncawait/await');


const typeDefs = `
    type Query { 
        helloWorld: String
    }
`;

const resolvers = {
    Query: {
        helloWorld: () => {
            return "Hello world! ;-)";
        }
    },
    // Mutation: {
    //     createPost: (_, {title, body}) => {
    //         const post = Post.create({title: title, body: body});
    //         // pubsub.publish('postsChanged', {postsChanged: {id: post.id, change: 'CREATE'}});
    //         return post;
    //     },
    // }
};


module.exports = makeExecutableSchema({typeDefs, resolvers});
