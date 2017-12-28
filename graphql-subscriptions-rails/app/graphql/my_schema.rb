MySchema = GraphQL::Schema.define do

  use GraphQL::Backtrace
  use GraphQL::Subscriptions::ActionCableSubscriptions
  # tracer(MyCustomTracer)

  query(Types::QueryType)
  mutation(Types::MutationType)
  subscription(Types::SubscriptionType)
end
