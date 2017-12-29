# frozen_string_literal: true

Types::SubscriptionType = GraphQL::ObjectType.define do
  name 'Subscription'

  field :postAdded, !Types::PostType, 'A post was added to the blog.'
end
