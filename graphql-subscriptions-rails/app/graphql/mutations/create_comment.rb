# frozen_string_literal: true

module Mutations
  class CreateComment < Mutations::MutationSupport
    def resolve(_object, args, _context)
      post = Post.find(args[:postId])
      comment = Comment.create! do |comment|
        comment.post = post
        comment.body = args[:body]
      end
      MySchema.subscriptions.trigger('commentAdded', {}, comment)
      comment
    end
  end
end
