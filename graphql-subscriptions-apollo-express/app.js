const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const schema = require('./graphql/schema');
const database = require('./database/database');
const helmet = require('helmet');
const {execute, subscribe} = require('graphql');
const {createServer} = require('http');
const {SubscriptionServer} = require('subscriptions-transport-ws');


const PORT = 3000;

const app = express();
const helperMiddleware = [
    bodyParser.json(),
    bodyParser.text({type: 'application/graphql'}),
    (req, res, next) => {
        if (req.is('application/graphql')) {
            req.body = {query: req.body};
        }
        next();
    }
];

app.use('*', cors({
        origin: 'http://localhost:3001',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
);
app.use(helmet());
app.use('/graphql', ...helperMiddleware, graphqlExpress({schema}));
app.get('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

// Wrap the Express server
const webSocketServer = createServer(app);
webSocketServer.listen(PORT, () => {
    console.log(`Apollo Server is now running on http://localhost:${PORT}`);
    console.log(`GraphQL API is available at http://localhost:${PORT}/graphql`);
    console.log(`GraphiQL IDE is available at http://localhost:${PORT}/graphiql`);
    console.log(`Subscriptions are available at ws://localhost:${PORT}/subscriptions`);

    const options = {
        server: webSocketServer,
        path: '/subscriptions',
    };
    new SubscriptionServer({execute, subscribe, schema}, options);
});
