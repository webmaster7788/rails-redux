class SessionsController < ApplicationController
  before_action :authorizate_request!, only: [:destroy]

  def create
    user = User.find_by(email: params[:user][:email])
    if user && user.authenticate(params[:user][:password])
      render json: { user: user.authorization_payload }
    else
      render_login_errors
    end
  end

  def destroy
    if @current_user
      @current_user.regenerate_auth_token
    end
    head 204 and return
  end

  private

  def render_login_errors
    login_errors = { "login-form" => ["Invalid email or password"]}
    render_errors(login_errors, 403)
  end

end
