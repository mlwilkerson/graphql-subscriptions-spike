const pubsub = require('../subscriptions_pubsub');

module.exports = () => pubsub.asyncIterator('postsChanged');
