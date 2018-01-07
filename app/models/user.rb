class User < ApplicationRecord
  before_create :set_email_to_lower_case!
  has_secure_password
  has_secure_token :auth_token
  has_many :posts
  has_many :images
  has_many :messages
  has_many :chat_rooms

  def set_email_to_lower_case!
    self.email.downcase!
  end

end
