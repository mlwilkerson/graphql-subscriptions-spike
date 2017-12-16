Types::SubscriptionType = GraphQL::ObjectType.define do
  name "Root subscription type"
  # field :postWasPublished, !Types::PostType, "A post was published to the blog"
  # ...
end

