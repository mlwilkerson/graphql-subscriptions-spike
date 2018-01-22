# frozen_string_literal: true

Types::CreatePostAsyncResultType = GraphQL::ObjectType.define do
  name 'CreatePostAsyncResult'
  description 'A result object representing the create post async processing.'

  field :process_id, !types.String
end
