const {GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLNonNull} = require('graphql');


const UpdatePostInputType = new GraphQLInputObjectType({
    name: 'UpdatePostInput',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        title: {type: GraphQLString},
        body: {type: GraphQLString}
    }
});

module.exports = UpdatePostInputType;
