# frozen_string_literal: true

Types::SubscriptionType = GraphQL::ObjectType.define do
  name 'SubscriptionType'

  field :postWasPublished, !Types::PostType, 'A post was published to the blog.'
  field :commentWasPublished, !Types::CommentType, 'A comment was published to blog post.'
end
