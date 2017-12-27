const {pubsub} = require('../../../pubsub/local_pubsub');
const {withFilter} = require('graphql-subscriptions');

const commentAdded = {
    // resolve: (payload, args, context, info) => {
    //     return payload;
    // },
    subscribe: withFilter(
        () => {
            return pubsub.asyncIterator(['commentAdded']);
        },
        (payload, variables) => {
            return payload.postId === variables.postId;
        }
    )
};

module.exports = commentAdded;
