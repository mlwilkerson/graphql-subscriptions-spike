# Use the barebones version of Ruby 2.4.2.
FROM ruby:2.4.2-slim

# Optionally set a maintainer name to let people know who made this image.
MAINTAINER Christopher Bartling <chris.bartling@sentera.com>

# Install dependencies:
# - build-essential: To ensure certain gems can be compiled
# - nodejs: Compile assets
RUN apt-get update && \
    apt-get install -qq -y build-essential nodejs libsqlite3-dev --fix-missing --no-install-recommends

# Set an environment variable to store where the app is installed to inside
# of the Docker image.
ENV INSTALL_PATH /app
RUN mkdir -p $INSTALL_PATH

# This sets the context of where commands will be ran in and is documented
# on Docker's website extensively.
WORKDIR $INSTALL_PATH

# Ensure gems are cached and only get updated when they change. This will
# drastically increase build times when your gems do not change.
COPY Gemfile Gemfile
RUN bundle install

# Copy in the application code from your work station at the current directory
# over to the working directory.
COPY . .

# Provide dummy data to Rails so it can pre-compile assets.
RUN bundle exec rake db:create db:setup

# Expose a volume so that nginx will be able to read in assets in production.
VOLUME ["$INSTALL_PATH/public"]

# The default command that gets ran will be to start the Rails server.
#CMD bundle exec rails server