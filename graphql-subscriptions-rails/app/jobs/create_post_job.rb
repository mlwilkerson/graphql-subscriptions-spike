class CreatePostJob < ApplicationJob
  queue_as :default

  def perform(title, body)
    post = Post.create! do |post|
      post.title = title
      post.body = body
    end
    MySchema.subscriptions.trigger('postAdded', {}, post)
  end
end
