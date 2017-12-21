const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList} = require('graphql');
const helloResolver = require('../resolvers/hello');
const PostType = require('./post_type');
const CommentType = require('./comment_type');


const rootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: helloResolver
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: () => {
                return [
                    {id: 1, title: 'This is it!', body: 'I can\'t take it any longer.'}
                ]
            }
        }
    }
});
const schema = new GraphQLSchema({
    query: rootQueryType
});

module.exports = schema;