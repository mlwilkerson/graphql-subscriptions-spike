# frozen_string_literal: true

module Mutations
  class CreatePost < Mutations::MutationSupport

    def resolve(object, args, context)
      Post.create! do |post|
        post.title = args[:title]
        post.body = args[:body]
      end
    end
  end
end
