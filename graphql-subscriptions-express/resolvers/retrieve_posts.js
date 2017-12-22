const {Post} = require('../database/models');

const retrievePosts = (value) => {
    return Post.findAll({});
};

module.exports = retrievePosts;
