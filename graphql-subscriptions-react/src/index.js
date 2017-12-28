import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {split} from 'apollo-link';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import ActionCable from 'actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';

const PORT = 3000;

let webSocketLink = undefined;

if (process.env.REACT_APP_BACKEND === 'rails') {
    const cable = ActionCable.createConsumer(`ws://localhost:${PORT}/subscriptions`);
    cable.subscriptions.create('WebNotificationsChannel', {
        connected: () => {
            console.log('Websocket connected!');
        },
        disconnected: () => {
            console.log('Websocket disconnected!');
        },
        received: (data) => {
            console.log(`Websocket received data:`, data);
        }
    });
    webSocketLink = new ActionCableLink({cable});
} else  {
    webSocketLink = new WebSocketLink({
        uri: `ws://localhost:${PORT}/subscriptions`,
        options: {
            reconnect: true
        }
    });
}

const httpLink = new HttpLink({uri: `http://localhost:${PORT}/graphql`});

// using the ability to split links, you can send data to each link depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    webSocketLink,
    httpLink,
);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({addTypename: false})
});



ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);

registerServiceWorker();
