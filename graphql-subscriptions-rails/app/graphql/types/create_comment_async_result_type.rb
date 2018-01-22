# frozen_string_literal: true

Types::CreateCommentAsyncResultType = GraphQL::ObjectType.define do
  name 'CreateCommentAsyncResult'
  description 'A result object representing the create comment async processing.'

  field :process_id, !types.String
end
