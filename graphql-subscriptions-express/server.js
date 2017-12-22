const express = require('express');
const helmet = require('helmet');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const helloResolver = require('./resolvers/hello');
const schema = require('./graphql/schema');
const sequelize = require('./database/database');
const subscriptionServer = require('./subscription_server');
const PubSub = require('./subscriptions_pubsub');

const app = express();

app.use(helmet());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API HTTP server at http://localhost:4000/graphql');
