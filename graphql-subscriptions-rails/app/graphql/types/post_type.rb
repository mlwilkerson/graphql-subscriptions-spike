Types::PostType = GraphQL::ObjectType.define do
  name "Post"
  description "A blog post"
  # `!` marks a field as "non-null"
  field :id, !types.ID
  field :title, !types.String
  field :body, !types.String
  field :comments, types[!Types::CommentType]
end
