const {Comment} = require('../../../database/models');

const retrieveComments = (postId) => {
    return Comment.findAll({postId: postId});
};

module.exports = retrieveComments;
