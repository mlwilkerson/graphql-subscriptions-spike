# GraphQL Subscriptions Spike Solution

## Introduction

 This project contains several servers and a React web client that demonstrate 
 GraphQL subscriptions over WebSocket connections. The domain in the example
 app is that of a online blog, where you have posts and posts are associated 
 with zero or more comments.

## Implementation

### Server

The spike solution consists of two different server implementations: 

- [graphql-subscriptions-apollo-express](graphql-subscriptions-apollo-express/README.md): Node.js which uses Apollo Server and Express modules.
- [graphql-subscriptions-rails](graphql-subscriptions-rails/README.md): Ruby on Rails 5.1 using the `graphql-ruby` gem.

Note that each server implements the same functionality, so you only need to run
one server for the spike solution.

### Web client

The GraphQL client is a React webapp which utilizes Apollo Client for the 
GraphQL connectivity to the backend servers.

[graphql-subscriptions-react](graphql-subscriptions-react/README.md)

