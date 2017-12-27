const {makeExecutableSchema} = require('graphql-tools');
const retrievePostsResolver = require('./resolvers/posts/retrieve_posts');
const createPostResolver = require('./resolvers/posts/create_post');
const postAddedResolver = require('./resolvers/posts/post_added');
const retrieveCommentsResolver = require('./resolvers/comments/retrieve_comments');
const createCommentResolver = require('./resolvers/comments/create_comment');
const commentAddedResolver = require('./resolvers/comments/comment_added');



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
        posts: [Post],
        comments(postId: ID!): [Comment] 
    }
  
    type Mutation {
        createPost (
            title: String!, 
            body: String!
        ): Post,
        createComment (
            postId: ID!,
            body: String! 
        ): Comment
    }
    
    type Subscription {
        postAdded: Post,
        commentAdded: Comment
    }
`;

const resolvers = {
    Query: {
        posts: retrievePostsResolver,
        comments: retrieveCommentsResolver
    },
    Mutation: {
        createPost: createPostResolver,
        createComment: createCommentResolver
    },
    Subscription: {
        postAdded: postAddedResolver,
        commentAdded: commentAddedResolver
    }
};


const schema = makeExecutableSchema({typeDefs, resolvers});

module.exports = schema;
