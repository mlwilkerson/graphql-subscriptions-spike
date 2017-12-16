module Queries
  class QuerySupport

    abstract_method :resolve

    def call(object, args, context)
      begin
        result = resolve(object, args, context)
      rescue GraphQL::ExecutionError => e
        result = e
      end
      result
    end

  end
end
