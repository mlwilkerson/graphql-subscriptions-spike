# GraphQL Subscriptions Spike Rails Server

This Rails 5.1.4 server running on Ruby 2.4.2 demonstrates the use of ActionCable 
and `graphql-ruby` gem for implementing a GraphQL subscriptions system.

## Set up and configuration

### Redis server

Start a Redis 3.x server on port 6379: 
`docker run -p 127.0.0.1:6379:6379 --name graphql-subscriptions-redis -d redis:3`. Note that as of 
Rails 5.1.4, only Redis 3.x will work; Redis 4.x will not work.

You should see something like the following using `docker ps -a`:

```bash
CONTAINER ID  IMAGE    COMMAND                 CREATED        STATUS        PORTS                     NAMES
4a324640b15b  redis:3  "docker-entrypoint..."  3 seconds ago  Up 2 seconds  127.0.0.1:6379->6379/tcp  graphql-subscriptions-redis
```

If you want to tail the Redis logs in the Docker container, use: `docker logs -f graphql-subscriptions-redis`

To stop the detached Redis server Docker container, use: `docker stop graphql-subscriptions-redis` 


### JavaScript dependencies

The web client for ActionCable is dependent on jQuery. Install it using `yarn install` from the Rails project root
directory. This will insert a `node_modules` directory in the Rails project root directory, which Sprockets will use
for building up the web assets.

### Verifying ActionCable

1. Start the Rails server: `bundle exec rails server`
1. Start a Rails console: `bundle exec rails console`
1. In the Rails console, execute the following Ruby statement: 

```ruby
ActionCable.server.broadcast 'web_notifications_channel', message: '<p>Hello Alyssa</p>'
```


## Running the server

```
Started GET "/subscriptions" for 127.0.0.1 at 2017-12-28 21:10:02 -0600
Started GET "/subscriptions/" [WebSocket] for 127.0.0.1 at 2017-12-28 21:10:02 -0600
Successfully upgraded to WebSocket (REQUEST_METHOD: GET, HTTP_CONNECTION: Upgrade, HTTP_UPGRADE: websocket)
GraphqlChannel is transmitting the subscription confirmation
GraphqlChannel#execute({"query"=>"subscription onPostAddedSubscription {\n  postAdded {\n    id\n    title\n    body\n  }\n}\n", "variables"=>{}, "operationName"=>"onPostAddedSubscription"})
GraphqlChannel#execute: {"query"=>"subscription onPostAddedSubscription {\n  postAdded {\n    id\n    title\n    body\n  }\n}\n", "variables"=>{}, "operationName"=>"onPostAddedSubscription", "action"=>"execute"}
GraphqlChannel transmitting {:result=>{:data=>nil}, :more=>true}
GraphqlChannel is streaming from graphql-subscription:206f69ab-0a13-45cc-a7e1-dd399bb06681
GraphqlChannel is streaming from graphql-event::postAdded:
```

