# frozen_string_literal: true

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createPost, Types::PostType do
    argument :post, !InputTypes::PostInputType
    description 'Create a new blog post.'
    resolve ->(t, args, c) {
      Post.create!(args[:post])
    }
    # resolve Mutations::CreatePost.new
  end
end
