const {makeExecutableSchema} = require('graphql-tools');
const retrievePostsResolver = require('./resolvers/posts/retrieve_posts');
const createPostResolver = require('./resolvers/posts/create_post');
const postAddedResolver = require('./resolvers/posts/post_added');

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
            body: String!
        ): Post
    }
    
    type Subscription {
        postAdded: Post
    }

`;

const resolvers = {
    Query: {
        posts: retrievePostsResolver
    },
    Mutation: {
        createPost: createPostResolver
    },
    Subscription: {
        postAdded: postAddedResolver
    }
};


const schema = makeExecutableSchema({typeDefs, resolvers});

module.exports = schema;
