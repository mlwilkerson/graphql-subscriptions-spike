class CreateCommentJob < ApplicationJob
  queue_as :default

  def perform(post_id, body)
    post = Post.find(post_id)
    comment = Comment.create! do |comment|
      comment.post = post
      comment.body = body
    end
    MySchema.subscriptions.trigger('commentAdded', { postId: comment.post.id }, comment)
  end
end
