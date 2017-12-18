# frozen_string_literal: true

InputTypes::PostInputType = GraphQL::InputObjectType.define do
  name 'PostInputType'
  description 'Properties for creating a Post'

  input_field :title, !types.String, 'Title of the post.'
  input_field :body, !types.String, 'Body of the post.'
end
