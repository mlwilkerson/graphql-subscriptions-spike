# frozen_string_literal: true

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createPost, Types::PostType do
    argument :title, !types.String
    argument :body, !types.String

    description 'Create a new blog post.'

    resolve Mutations::CreatePost.new
  end
end
