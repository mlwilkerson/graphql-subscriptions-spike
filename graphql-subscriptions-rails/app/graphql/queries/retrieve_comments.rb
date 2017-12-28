# frozen_string_literal: true

module Queries
  class RetrieveComments < Queries::QuerySupport

    def resolve(object, args, context)
      Comment.find_by_post_id(args[:postId])
    end
  end
end
