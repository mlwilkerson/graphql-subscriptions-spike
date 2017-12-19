# frozen_string_literal: true

Types::SubscriptionType = GraphQL::ObjectType.define do
  name 'SubscriptionType'

  field :postWasPublished, !Types::PostType, 'A post was published to the blog.'
end
