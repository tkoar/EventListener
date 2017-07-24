class ApplicationController < ActionController::API

  def create
    user = User.find_by(userID: params[:userID])
    if user.present?
      created_jwt = issue_token({id: user.id})
      render json: {name: user.name, email: user.email, jwt: created_jwt}
    else
      render json: {
        error: 'username or password is incorrect'
      }, status: 404
    end
  end

  private

  def issue_token payload
    JWT.encode(payload, secret, algorithm)
  end

  def authorize_user!
    render json: {error: 'No user id present'} unless current_user.present?
  end

  def current_user
    @current_user ||= User.find_by(userID: token_user_id)
  end

  def token_user_id
    decoded_token.first["userID"]
  end

  def decoded_token
    if token
      begin
        JWT.decode(token, secret, true, {algorithm: algorithm})
      rescue JWT::DecodeError
        return [{}]
      end
    else
      [{}]
    end
  end

  def token
    request.headers['Authorization']
  end

  def secret
    'mess-your-friends-up'
  end

  def algorithm
    'HS256'
  end


end
