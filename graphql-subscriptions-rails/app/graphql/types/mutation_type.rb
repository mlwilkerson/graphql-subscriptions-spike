# frozen_string_literal: true

Types::MutationType = GraphQL::ObjectType.define do
    name 'Mutation'

    field :createPost do
        type Types::PostType
        argument :title, !types.String, 'The blog post title.'
        argument :body, !types.String, 'The blog post body.'
        description 'Create a new blog post.'

        resolve Mutations::CreatePost.new
    end
end
