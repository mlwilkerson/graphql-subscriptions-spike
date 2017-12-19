import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {ApolloLink} from 'apollo-link';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import ActionCable from 'actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';
import {gql} from "apollo-client-preset";

const cable = ActionCable.createConsumer()
const cableLink = new ActionCableLink({cable});

const httpLink = new HttpLink({uri: 'http://localhost:3000/graphql'});

const hasSubscriptionOperation = ({query: {definitions}}) => {
    return definitions.some(
        ({kind, operation}) => kind === 'OperationDefinition' && operation === 'subscription'
    )
};

const link = ApolloLink.split(hasSubscriptionOperation, cableLink, httpLink);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({addTypename: false})
});

client.query({query: gql`{ posts {title, body} }`}).then(console.log);


ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);
registerServiceWorker();
