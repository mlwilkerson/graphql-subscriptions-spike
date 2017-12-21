const express = require('express');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return 'Hello world!';
    },
};


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
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
