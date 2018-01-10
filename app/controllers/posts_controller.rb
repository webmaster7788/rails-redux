class PostsController < ApplicationController

  before_action :authorizate_request!

  def index
    render json: {
        posts:  posts_payload(Post.order(created_at: :desc)
                                  .page(params[:page]).per(20))}
  end

  def create
    post = @current_user.posts.new(post_params)
    if post.save
      save_images(params[:images], post) if params[:images]
      render json: { post: post.payload }, status: 201
    else
      render_errors(post.errors, 422)
    end
  end

  private

  def posts_payload posts
    posts.map do |post|
      post.payload
    end
  end

  def save_images images, post
    images.each do |image|
      post.images.create(user_id: @current_user.id, image: image)
    end
  end

  def post_params
    params.require(:post).permit(:content, :images)
  end

end
