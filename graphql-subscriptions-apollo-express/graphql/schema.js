const {makeExecutableSchema} = require('graphql-tools');
const {Post} = require('../database/models');
// const async = require('asyncawait/async');
// const await = require('asyncawait/await');


const typeDefs = `
    type Comment { 
        id: Int!
        body: String! 
    }

    type Post { 
        id: Int!
        title: String! 
        body: String! 
        comments: [Comment]
    }

    type Query { 
        posts: [Post] 
    }
  
    type Mutation {
        createPost (
            title: String!, 
            body: String!): Post
    }
`;

const resolvers = {
    Query: {
        posts: () => {
            return Post.findAll({})
        }
    },
    Mutation: {
        createPost: (_, {title, body}) => {
            const post = Post.create({title: title, body: body});
            // pubsub.publish('postsChanged', {postsChanged: {id: post.id, change: 'CREATE'}});
            return post;
        },
    }
};


const schema = makeExecutableSchema({typeDefs, resolvers});

module.exports = schema;
