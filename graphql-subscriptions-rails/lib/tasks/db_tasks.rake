# frozen_string_literal: true

namespace :db do
  desc 'Create a new blog post'
  task :create_post, %i[title body] => [:environment] do |_task, args|
    Post.create! do |post|
      post.title = args.title
      post.body = args.body
    end
  end

  desc 'List posts'
  task :list_posts => [:environment] do |_task, args|
    Post.all.each do |post|
      puts "Post: #{post.id}, title: #{post.title}"
    end
  end

  desc 'Create a new blog post comment'
  task :create_comment, %i[post_id body] => [:environment] do |_task, args|
    post = Post.find_by(id: args.post_id)
    if post
      Comment.create! do |comment|
        comment.post = post
        comment.body = args.body
      end
    end
  end
end
