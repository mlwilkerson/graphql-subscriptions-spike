# frozen_string_literal: true

Types::SubscriptionType = GraphQL::ObjectType.define do
  name 'Subscription'

  field :queryCompleted, !types.String, 'A test subscription'
  field :postWasPublished, !Types::PostType, 'A post was published to the blog.'
end
