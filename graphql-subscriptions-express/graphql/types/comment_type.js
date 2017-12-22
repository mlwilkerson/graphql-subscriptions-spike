const {GraphQLObjectType, GraphQLString, GraphQLInt} = require('graphql');

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: {
        id: {type: GraphQLInt},
        body: {type: GraphQLString}
    }
});

module.exports = CommentType;
