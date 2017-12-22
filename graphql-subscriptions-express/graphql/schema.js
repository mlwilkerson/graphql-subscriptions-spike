const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList} = require('graphql');
const PostType = require('./types/post_type');

const helloResolver = require('../resolvers/hello');
const createPostResolver = require('../resolvers/create_post');
const updatePostResolver = require('../resolvers/update_post');
const retrievePostsResolver = require('../resolvers/retrieve_posts');

const CreatePostInputType = require('./input_types/create_post_input_type');
const UpdatePostInputType = require('./input_types/update_post_input_type');


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
                createPostInput: { type: CreatePostInputType }
            },
            resolve: createPostResolver
        },
        updatePost: {
            type: PostType,
            description: 'Update an existing post',
            args: {
                updatePostInput: { type: UpdatePostInputType }
            },
            resolve: updatePostResolver
        }
    }
});

const schema = new GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType
});

module.exports = schema;
