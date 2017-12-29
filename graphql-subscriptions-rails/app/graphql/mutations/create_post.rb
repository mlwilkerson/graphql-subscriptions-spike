# frozen_string_literal: true

module Mutations
  class CreatePost < Mutations::MutationSupport
    def resolve(_object, args, _context)
      post = Post.create! do |post|
        post.title = args[:title]
        post.body = args[:body]
      end
      MySchema.subscriptions.trigger('postAdded', {}, post)
      post
    end
  end
end
