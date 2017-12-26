const Sequelize = require('sequelize') ;
const database = require('./database') ;

const Post = database.define('posts', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true,},
        title: {type: Sequelize.TEXT},
        body: {type: Sequelize.TEXT}
    },
    {underscored: true});
const Comment = database.define('comments', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true,},
        body: {type: Sequelize.TEXT}
    },
    {underscored: true});
Comment.belongsTo(Post, {underscored: true});
Post.hasMany(Comment, {as: 'comments', underscored: true});

// force: true will drop the table if it already exists
Post.sync({force: false}).then(() => {
    console.log('Created posts table.');
    // // Table created
    // return Post.create({
    //     firstName: 'John',
    //     lastName: 'Hancock'
    // });
});
Comment.sync({force: false}).then(() => {
    console.log('Created comments table.');
    // // Table created
    // return Post.create({
    //     firstName: 'John',
    //     lastName: 'Hancock'
    // });
});

module.exports = {
    Post: Post,
    Comment: Comment
};
