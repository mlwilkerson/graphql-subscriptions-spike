require "resque_web"

Rails.application.routes.draw do

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  mount ActionCable.server => '/subscriptions'

  mount ResqueWeb::Engine => "/resque_web"

  post "/graphql", to: "graphql#execute"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get 'page/index'

  root 'page#index'


end
