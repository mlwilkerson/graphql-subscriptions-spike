const {Post} = require('../database/models');

const updatePost = (value, {postInput}) => {
    return Post.findById(postInput.id).then((post) => {
        const options = {};
        if (postInput.title) {
            options.title = postInput.title;
        }
        if (postInput.body) {
            options.body = postInput.body;
        }
        return post.update(options);
    });
};

module.exports = updatePost;
