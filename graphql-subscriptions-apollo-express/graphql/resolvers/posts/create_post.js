const {Post} = require('../../../database/models');
const {pubsub} = require('../../../pubsub/local_pubsub');

const createPost = async (_, {title, body}) => {
    const post = await Post.create({title: title, body: body});
    pubsub.publish('postAdded', {postAdded: post});
    return post;
};

module.exports = createPost;
