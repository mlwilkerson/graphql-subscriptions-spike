const {pubsub} = require('../../../pubsub/local_pubsub');

const postAdded = {
    subscribe: (() => {
        return pubsub.asyncIterator(['postAdded']);
    })
};

module.exports = postAdded;
