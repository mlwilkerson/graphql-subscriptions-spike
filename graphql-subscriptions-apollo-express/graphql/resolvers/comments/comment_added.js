const {pubsub} = require('../../../pubsub/local_pubsub');

const commentAdded = {
    subscribe: (() => {
        return pubsub.asyncIterator(['commentAdded']);
    })
};

module.exports = commentAdded;
