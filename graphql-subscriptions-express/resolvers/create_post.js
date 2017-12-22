const {Post} = require('../database/models');

const createPost = (value, { createPostInput }) => {
    return Post.create({ title: createPostInput.title, body: createPostInput.body});
};

module.exports = createPost;
