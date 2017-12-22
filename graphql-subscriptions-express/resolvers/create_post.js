const {Post} = require('../database/models');
const pubsub = require('../subscriptions_pubsub');
const SubscriptionResultType = require('../graphql/types/subscription_result_type');

const createPost = async (value, { createPostInput }) => {
    const post = await Post.create({ title: createPostInput.title, body: createPostInput.body});
    pubsub.publish('postsChanged', {postsChanged: {id: post.id, change: 'CREATE'}});
    return post;
};

module.exports = createPost;
