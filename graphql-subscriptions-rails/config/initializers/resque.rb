# frozen_string_literal: true

rails_root = ENV['RAILS_ROOT'] || File.dirname(__FILE__) + '/../..'
rails_env = ENV['RAILS_ENV'] || 'development'

resque_config = YAML.load_file(rails_root + '/config/resque.yml')
Resque.redis = resque_config[rails_env]

Resque.logger = Logger.new(File.open("#{Rails.root}/resque-log/#{rails_env}_resque.log", 'w+'))
Resque.logger.formatter = Resque::VeryVerboseFormatter.new
