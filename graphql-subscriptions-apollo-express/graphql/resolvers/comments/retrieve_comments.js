const {Comment} = require('../../../database/models');

const retrieveComments = (_, args, context, info) => {
    const constraint = {where: {post_id: args.postId}};
    return Comment.findAll(constraint);
};

module.exports = retrieveComments;
