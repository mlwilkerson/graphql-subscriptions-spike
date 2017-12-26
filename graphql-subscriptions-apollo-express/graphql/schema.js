const {makeExecutableSchema} = require('graphql-tools');
const {Post} = require('../database/models');

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
        createPost: async (_, {title, body}) => {
            const post = await Post.create({title: title, body: body});
            // pubsub.publish('postsChanged', {postsChanged: {id: post.id, change: 'CREATE'}});
            return post;
        },
    }
};


const schema = makeExecutableSchema({typeDefs, resolvers});

module.exports = schema;
