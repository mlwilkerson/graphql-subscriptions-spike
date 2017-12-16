GraphqlSubscriptionsRailsSchema = GraphQL::Schema.define do
  mutation(Types::MutationType)
  query(Types::QueryType)
  subscription(Types::SubscriptionType)
end
