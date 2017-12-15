# GraphQL Subscriptions Spike Rails Server

This Rails 5.1.4 server running on Ruby 2.4.2 demonstrates the use of ActionCable 
for implementing a GraphQL subscriptions system.

# Redis server

Start a Redis server on port 6379: `docker run --name graphql-subscriptions-redis -d redis`

You should see the following using `docker ps -a`:

```bash
CONTAINER ID  IMAGE  COMMAND                 CREATED        STATUS        PORTS     NAMES
6976eac8aed5  redis  "docker-entrypoint..."  2 seconds ago  Up 2 seconds  6379/tcp  graphql-subscriptions-redis
```

If you want to tail the Redis logs in the Docker container, use: `docker logs -f graphql-subscriptions-redis`



