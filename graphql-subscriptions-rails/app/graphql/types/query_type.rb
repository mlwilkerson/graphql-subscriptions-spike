Types::QueryType = GraphQL::ObjectType.define do
    name "Query"
    description "The query root of this schema"

    field :post do
        type Types::PostType
        argument :id, !types.ID
        description "Find a Post by ID"
        resolve Queries::RetrievePost.new
    end

    field :posts do
        type [Types::PostType]

        resolve Queries::RetrievePosts.new
    end
end
