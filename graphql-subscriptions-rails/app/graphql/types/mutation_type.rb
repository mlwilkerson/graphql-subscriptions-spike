# frozen_string_literal: true

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createPostAsync, Types::CreatePostAsyncResultType do
    argument :title, !types.String
    argument :body, !types.String

    description 'Create a new blog post.'

    resolve Mutations::CreatePostAsync.new
  end

  field :createCommentAsync, Types::CreateCommentAsyncResultType do
    argument :postId, !types.ID
    argument :body, !types.String

    description 'Create a new blog comment.'

    resolve Mutations::CreateCommentAsync.new
  end

end
