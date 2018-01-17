# Use the barebones version of Ruby 2.4.2.
FROM phusion/passenger-ruby24:latest

# Optionally set a maintainer name to let people know who made this image.
MAINTAINER Christopher Bartling <chris.bartling@sentera.com>

# Set correct environment variables.
ENV HOME /root

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# Expose Nginx HTTP service
EXPOSE 8080

# Start Nginx / Passenger
RUN rm -f /etc/service/nginx/down

# Remove the default site
RUN rm /etc/nginx/sites-enabled/default

# Add the nginx site and config
ADD webapp.conf /etc/nginx/sites-enabled/webapp.conf
ADD rails-env.conf /etc/nginx/main.d/rails-env.conf

## Install dependencies:
## - build-essential: To ensure certain gems can be compiled
## - nodejs: Compile assets
RUN apt-get update && \
    apt-get install -qq -y build-essential nodejs libsqlite3-dev --fix-missing --no-install-recommends

## Set an environment variable to store where the app is installed to inside
## of the Docker image.
ENV HOME /home/app
ENV DB_DATA /home/db
ENV BUNDLE_PATH /bundle
ENV RAILS_ENV=development

RUN mkdir -p $HOME
RUN mkdir -p $DB_DATA

## This sets the context of where commands will be ran in and is documented
## on Docker's website extensively.
WORKDIR $HOME

## Ensure gems are cached and only get updated when they change. This will
## drastically increase build times when your gems do not change.
ADD Gemfile* $HOME/
RUN bundle install

## Copy in the application code from your work station at the current directory
## over to the working directory.
ADD . $HOME

## Provide dummy data to Rails so it can pre-compile assets.
RUN bundle exec rake db:create db:setup

## Expose a volume so that nginx will be able to read in assets in production.
#VOLUME ["$HOME/db"]


# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

## The default command that gets ran will be to start the Rails server.
#CMD bin/rails server --port 3000 --binding 0.0.0.0