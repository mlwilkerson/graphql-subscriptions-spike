const {Post} = require('../../../database/models');

const retrievePosts = () => {
    return Post.findAll({order: [['created_at', 'DESC']]});
};

module.exports = retrievePosts;
