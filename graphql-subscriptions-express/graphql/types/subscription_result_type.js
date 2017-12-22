const {GraphQLObjectType, GraphQLString, GraphQLInt} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'SubscriptionResultType',
    fields: {
        id: {type: GraphQLInt},
        change: {type: GraphQLString}
    }
});
