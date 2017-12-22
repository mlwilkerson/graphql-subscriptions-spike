const {GraphQLObjectType, GraphQLString, GraphQLInt} = require('graphql');
// const CommentType = require('./comment_type');

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        body: {type: GraphQLString}
    }
});

module.exports = PostType;
