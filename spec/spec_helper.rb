# spec/spec_helper.rb

ENV['RACK_ENV'] = 'test'

require 'capybara'
require 'capybara/dsl'

RSpec.configure do |config|
  config.include Capybara::DSL
end

require File.expand_path '../../server.rb', __FILE__

Capybara.app = Sinatra::Application
