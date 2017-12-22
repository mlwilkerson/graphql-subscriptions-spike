const {Post} = require('../database/models');

const createPost = (value, { postInput }) => {
    return Post.create({ title: postInput.title, body: postInput.body});
};

module.exports = createPost;
