const express = require('express');
const helmet = require('helmet');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const helloResolver = require('./resolvers/hello');
const schema = require('./graphql/schema');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    storage: './database.sqlite'
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Post = sequelize.define('posts', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true,},
        title: {type: Sequelize.TEXT},
        body: {type: Sequelize.TEXT}
    },
    {underscored: true});
const Comment = sequelize.define('comments', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true,},
        body: {type: Sequelize.TEXT}
    },
    {underscored: true});
Comment.belongsTo(Post, {underscored: true});
Post.hasMany(Comment, {as: 'comments', underscored: true});

// force: true will drop the table if it already exists
Post.sync({force: true}).then(() => {
    console.log('Created posts table.');
    // // Table created
    // return Post.create({
    //     firstName: 'John',
    //     lastName: 'Hancock'
    // });
});
Comment.sync({force: true}).then(() => {
    console.log('Created comments table.');
    // // Table created
    // return Post.create({
    //     firstName: 'John',
    //     lastName: 'Hancock'
    // });
});


// Construct a graphql, using GraphQL graphql language
// const graphql = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// The root provides a resolver function for each API endpoint
// const root = {
//     hello: helloResolver
// };


// db.serialize(function () {
//     db.run('CREATE TABLE lorem (info TEXT)')
//     var stmt = db.prepare('INSERT INTO lorem VALUES (?)')
//
//     for (var i = 0; i < 10; i++) {
//         stmt.run('Ipsum ' + i)
//     }
//
//     stmt.finalize()
//
//     db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
//         console.log(row.id + ': ' + row.info)
//     })
// })
//
// db.close()

const app = express();

app.use(helmet());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
