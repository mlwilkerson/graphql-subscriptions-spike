const {Post} = require('../../../database/models');

const retrievePosts = () => {
    return Post.findAll({});
};

module.exports = retrievePosts;
