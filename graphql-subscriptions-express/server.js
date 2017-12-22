const express = require('express');
const helmet = require('helmet');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const helloResolver = require('./resolvers/hello');
const schema = require('./graphql/schema');
const sequelize = require('./database/database');

const app = express();

app.use(helmet());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
