# frozen_string_literal: true

module Mutations
  class CreatePost < Mutations::MutationSupport
    def resolve(object, args, context)
        Post.create!(title: args[:title], body: args[:body])
    end
  end
end
