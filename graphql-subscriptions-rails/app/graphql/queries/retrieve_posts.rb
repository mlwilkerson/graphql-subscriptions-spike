# frozen_string_literal: true

module Queries
  class RetrievePosts < Queries::QuerySupport
    def resolve(object, args, context)
      Post.order(created_at: :desc).all
    end
  end
end
