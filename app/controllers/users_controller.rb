class UsersController < ApplicationController

  before_action :authorizate_request!
  skip_before_action  :authorizate_request!, only: [:create]

  def current_user
    render json: { user: @current_user.payload }
  end

  def user
    begin
      user = User.find(params[:id])
    rescue
      render_errors({"errors-list" => "Wrong id provided"},
                    404) and return
    end
    render json: { user: user.payload }
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { user: user.authorization_payload }, status: 201
    else
      render_errors(user.errors, 422)
    end
  end

  def index
    render json: {
        users: users_payload(filtered_users(params[:filter], params[:page])) }
  end

  def update
    avatar = params.require(:user).permit(:avatar)
    if @current_user.update_attributes(avatar)
      render json: { user: @current_user.payload }
    else
      render_errors(@current_user.errors, 422)
    end
  end

  private

  def users_payload users
    users.map do |user|
      user.payload
    end
  end

  def filtered_users filter, page
    # User.order(:name).where("name ~* ?", "^#{filter}").page(page).per(20)
    User.order(:name).where("name LIKE ?", "%#{filter}%").page(page).per(20)
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
