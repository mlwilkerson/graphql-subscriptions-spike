# frozen_string_literal: true

module Mutations
  class CreateCommentAsync < Mutations::MutationSupport

    def resolve(_object, args, _context)
      job = CreateCommentJob.new(args[:postId], args[:body]).enqueue
      OpenStruct.new(process_id: job.job_id)
    end
  end
end
