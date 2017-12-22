const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList} = require('graphql');
const helloResolver = require('../resolvers/hello');
const createPostResolver = require('../resolvers/create_post');
const retrievePostsResolver = require('../resolvers/retrieve_posts');
const PostType = require('./post_type');
const CommentType = require('./comment_type');
const PostInputType = require('./post_input_type');


const rootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: helloResolver
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: retrievePostsResolver
        }
    }
});

const rootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        createPost: {
            type: PostType,
            description: 'Creates a new post',
            args: {
                postInput: { type: PostInputType }
            },
            resolve: createPostResolver
        }
    }
});

const schema = new GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType
});

module.exports = schema;
