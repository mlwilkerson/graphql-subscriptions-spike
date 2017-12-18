# frozen_string_literal: true

module Mutations
  class CreatePost < Mutations::MutationSupport
    def resolve(object, args, context)
      post = Post.create!(args[:post])
      post
    end
  end
end
