const {GraphQLInputObjectType, GraphQLString, GraphQLNonNull} = require('graphql');


const PostInputType = new GraphQLInputObjectType({
    name: 'PostInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
    }
});

module.exports = PostInputType;
