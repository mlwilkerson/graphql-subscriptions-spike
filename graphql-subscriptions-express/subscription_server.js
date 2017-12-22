const {PubSub} = require('graphql-subscriptions');
const {createServer} = require('http');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {execute, subscribe} = require('graphql');
const schema = require('./graphql/schema');

const pubsub = new PubSub();

const WS_PORT = 5000;

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
    response.writeHead(404);
    response.end();
});

// Bind it to port and start listening
websocketServer.listen(WS_PORT, () => console.log(
    `Websocket Server is now running on http://localhost:${WS_PORT}`
));

const subscriptionServer = SubscriptionServer.create({schema, execute, subscribe}, {
    server: websocketServer,
    path: '/graphql',
});

module.exports = subscriptionServer;