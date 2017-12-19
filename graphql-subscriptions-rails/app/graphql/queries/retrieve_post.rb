# frozen_string_literal: true

module Queries
  class RetrievePost < Queries::QuerySupport
    def resolve(object, args, context)
      Post.find_by(id: args[:id])
    end
  end
end
