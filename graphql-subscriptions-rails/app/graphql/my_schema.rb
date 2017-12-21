MySchema = GraphQL::Schema.define do

  use GraphQL::Backtrace
  use GraphQL::Subscriptions::ActionCableSubscriptions
  # tracer(MyCustomTracer)

  # mutation(Types::MutationType)
  query(Types::QueryType)
  subscription(Types::SubscriptionType)
end
