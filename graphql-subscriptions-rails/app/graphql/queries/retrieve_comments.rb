# frozen_string_literal: true

module Queries
  class RetrieveComments < Queries::QuerySupport

    def resolve(_, args, context)
      Comment.where(post_id: args[:postId]).order(created_at: :desc)
    end
  end
end
