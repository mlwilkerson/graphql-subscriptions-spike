# GraphQL Subscriptions Spike Rails Server

This Rails 5.1.4 server running on Ruby 2.4.2 demonstrates the use of ActionCable 
and `graphql-ruby` gem for implementing a GraphQL subscriptions system. This spike solution is built as
a set of Docker containers, so you will need to have Docker and Docker Compose on your system to play 
with this implementation. 

## Set up and configuration
- Change directory to the root of the Rails application: `graphql-subscriptions-spike/graphql-subscriptions-rails`
- Using Docker Compose, build the Rails app: `docker-compose build`
- Create the SQLite database in the Docker container: `docker-compose run rails rake db:create db:setup RAILS_ENV=development` 



## Running the services

- Change directory to the root of the Rails application: `graphql-subscriptions-spike/graphql-subscriptions-rails`
- Launch all the Docker containers with Docker Compose: `docker-compose up`

```
Creating graphqlsubscriptionsrails_redis_1 ... done
Creating graphqlsubscriptionsrails_redis_1 ... 
Creating graphqlsubscriptionsrails_rails_1 ... done
Attaching to graphqlsubscriptionsrails_redis_1, graphqlsubscriptionsrails_rails_1
redis_1  | 1:C 17 Jan 21:13:53.973 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
redis_1  |                 _._                                                  
redis_1  |            _.-``__ ''-._                                             
redis_1  |       _.-``    `.  `_.  ''-._           Redis 3.2.11 (00000000/0) 64 bit
redis_1  |   .-`` .-```.  ```\/    _.,_ ''-._                                   
redis_1  |  (    '      ,       .-`  | `,    )     Running in standalone mode
redis_1  |  |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
rails_1  | *** Running /etc/my_init.d/00_regen_ssh_host_keys.sh...
redis_1  |  |    `-._   `._    /     _.-'    |     PID: 1
redis_1  |   `-._    `-._  `-./  _.-'    _.-'                                   
redis_1  |  |`-._`-._    `-.__.-'    _.-'_.-'|                                  
redis_1  |  |    `-._`-._        _.-'_.-'    |           http://redis.io        
redis_1  |   `-._    `-._`-.__.-'_.-'    _.-'                                   
rails_1  | *** Running /etc/my_init.d/30_presetup_nginx.sh...
redis_1  |  |`-._`-._    `-.__.-'    _.-'_.-'|                                  
redis_1  |  |    `-._`-._        _.-'_.-'    |                                  
redis_1  |   `-._    `-._`-.__.-'_.-'    _.-'                                   
redis_1  |       `-._    `-.__.-'    _.-'                                       
rails_1  | *** Running /etc/rc.local...
redis_1  |           `-._        _.-'                                           
redis_1  |               `-.__.-'                                               
redis_1  | 
redis_1  | 1:M 17 Jan 21:13:53.974 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
rails_1  | *** Booting runit daemon...
redis_1  | 1:M 17 Jan 21:13:53.974 # Server started, Redis version 3.2.11
rails_1  | *** Runit started as PID 10
redis_1  | 1:M 17 Jan 21:13:53.974 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
redis_1  | 1:M 17 Jan 21:13:53.974 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
redis_1  | 1:M 17 Jan 21:13:53.974 * The server is now ready to accept connections on port 6379
rails_1  | ok: run: /etc/service/nginx-log-forwarder: (pid 21) 0s
rails_1  | [ 2018-01-17 21:13:54.6491 27/7f345e278780 age/Wat/WatchdogMain.cpp:1283 ]: Starting Passenger watchdog...
rails_1  | [ 2018-01-17 21:13:54.6536 30/7f1a2bdf3780 age/Cor/CoreMain.cpp:1080 ]: Starting Passenger core...
rails_1  | [ 2018-01-17 21:13:54.6538 30/7f1a2bdf3780 age/Cor/CoreMain.cpp:248 ]: Passenger core running in multi-application mode.
rails_1  | [ 2018-01-17 21:13:54.6839 30/7f1a2bdf3780 age/Cor/CoreMain.cpp:830 ]: Passenger core online, PID 30
rails_1  | [ 2018-01-17 21:13:54.6905 40/7f07500fa780 age/Ust/UstRouterMain.cpp:537 ]: Starting Passenger UstRouter...
rails_1  | [ 2018-01-17 21:13:54.6912 40/7f07500fa780 age/Ust/UstRouterMain.cpp:350 ]: Passenger UstRouter online, PID 40
rails_1  | [ 2018-01-17 21:13:57.2973 30/7f1a25092700 age/Cor/SecurityUpdateChecker.h:358 ]: A security update is available for your version (5.1.5) of Passenger, we strongly recommend upgrading to version 5.1.12.
rails_1  | [ 2018-01-17 21:13:57.2974 30/7f1a25092700 age/Cor/SecurityUpdateChecker.h:363 ]:  Additional information: 
rails_1  | - [Fixed in 5.1.6] [CVE-2017-7529] Specially crafted requests potentially trigger sensitive information leak via Nginx range module.
rails_1  | - [Fixed in 5.1.11] [URGENT] Users with write access to an application can view arbitrary files on the system if Passenger is running as root.
```

- Start the React application to bring up the web UI. 
See [here](https://github.com/SenteraLLC/graphql-subscriptions-spike/tree/master/graphql-subscriptions-react) for more details.

## Shutting down the services

- Ctrl-C to exit the interactive console. 

```
^CGracefully stopping... (press Ctrl+C again to force)
Stopping graphqlsubscriptionsrails_rails_1 ... done
Stopping graphqlsubscriptionsrails_redis_1 ... done
```

- Tear down the Docker containers and network with Docker Compose: `docker-compose down`

```
Removing graphqlsubscriptionsrails_rails_1 ... done
Removing graphqlsubscriptionsrails_redis_1 ... done
Removing network graphqlsubscriptionsrails_default
```

