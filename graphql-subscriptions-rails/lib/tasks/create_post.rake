namespace :db do

  desc "Create a new post"
  task :create_post, [:title, :body] => [:environment] do |task, args|
    Post.create! do |post|
      post.title = args.title
      post.body = args.body
    end
  end

end
