# GraphQL Subscriptions Spike Solution: React/Apollo Client web application

## Introduction

 This project contains a React 16 web application that utilizes Apollo Client 2.x to connect to a GraphQL API.

## Running the webpack dev server

This Node.js project expects that you are using Node Version Manager (nvm)
to manage the Node.js runtime.  Go [here](https://github.com/creationix/nvm) 
to install it. Currently this project is using Node.js version 9.3.0. Use `nvm install 9.3.0`
to install this version of Node.js runtime and manage it through `nvm`.

1. Set the Node.js runtime environment via nvm: `nvm use`
1. Pull down dependencies via npm: `npm install`
1. Run the dev server for the backend server of your choice: 
    - `npm run-script start-for-express`: Express/Apollo Server
    - `npm run-script start-for-rails`: Rails 5.x/graphql-ruby Server
1. A browser window should automatically load with the single page React app.
