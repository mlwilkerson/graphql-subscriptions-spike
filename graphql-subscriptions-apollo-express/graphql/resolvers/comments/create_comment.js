const {Comment} = require('../../../database/models');
const {pubsub} = require('../../../pubsub/local_pubsub');

const createComment = async (_, {postId, body}) => {
    const comment = await Comment.create({post_id: postId, body: body});
    pubsub.publish('commentAdded', {commentAdded: comment});
    return comment;
};

module.exports = createComment;
