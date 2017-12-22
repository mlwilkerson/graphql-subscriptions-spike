const {Post} = require('../database/models');

const updatePost = (value, {updatePostInput}) => {
    return Post.findById(updatePostInput.id).then((post) => {
        if (updatePostInput.title) {
            post.title = updatePostInput.title;
        }
        if (updatePostInput.body) {
            post.body = updatePostInput.body;
        }
        return post.save();
    });
};

module.exports = updatePost;
