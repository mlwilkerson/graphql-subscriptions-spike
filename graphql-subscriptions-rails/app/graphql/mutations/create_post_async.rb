# frozen_string_literal: true

module Mutations
  class CreatePostAsync < Mutations::MutationSupport

    def resolve(_object, args, _context)
      job = CreatePostJob.new(args[:title], args[:body]).enqueue
      OpenStruct.new(process_id: job.job_id)
    end
  end
end
