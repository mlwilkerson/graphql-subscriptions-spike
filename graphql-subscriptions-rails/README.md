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

