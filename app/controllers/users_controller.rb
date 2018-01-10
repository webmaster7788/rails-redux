class UsersController < ApplicationController

  before_action :authorizate_request!
  skip_before_action :authorizate_request!, only: [:create]

  def current_user
    render json: { user: @current_user.payload }
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { user: user.authorization_payload }, status: 201
    else
      render_errors(user.errors, 422)
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
