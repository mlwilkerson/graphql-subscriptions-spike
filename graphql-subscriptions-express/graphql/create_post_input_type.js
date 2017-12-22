const {GraphQLInputObjectType, GraphQLString, GraphQLNonNull} = require('graphql');


const CreatePostInputType = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        body: {type: new GraphQLNonNull(GraphQLString)}
    }
});

module.exports = CreatePostInputType;
