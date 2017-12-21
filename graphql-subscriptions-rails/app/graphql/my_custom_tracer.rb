class MyCustomTracer

  def self.trace(key, data, &block)
    Rails.logger.info("Key: #{key}: #{data.inspect}")
    yield block
  end

end