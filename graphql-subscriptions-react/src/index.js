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

const EXPRESS_PORT = 3000;
const RAILS_PORT = 8080;

let webSocketLink = undefined;
let httpLink = undefined;

if (process.env.REACT_APP_BACKEND === 'rails') {
    const cable = ActionCable.createConsumer(`ws://localhost:${RAILS_PORT}/subscriptions`);
    webSocketLink = new ActionCableLink({cable});
    httpLink = new HttpLink({uri: `http://localhost:${RAILS_PORT}/graphql`});
} else  {
    webSocketLink = new WebSocketLink({
        uri: `ws://localhost:${EXPRESS_PORT}/subscriptions`,
        options: {
            reconnect: true
        }
    });
    httpLink = new HttpLink({uri: `http://localhost:${EXPRESS_PORT}/graphql`});
}


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
