const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt} = require('graphql');
const CommentType = require('./comment_type');

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        body: {type: GraphQLString},
        // comments: {
        //     type: GraphQLList(CommentType),
        //     resolve(post) {
        //         return [
        //             {id: 1, body: `A comment for post: ${post.title}.`},
        //             {id: 2, body: `A second comment for post: ${post.title}.`}
        //         ];
        //     }
        // }
    }
});

module.exports = PostType;
