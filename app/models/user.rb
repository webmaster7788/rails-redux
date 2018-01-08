class User < ApplicationRecord
  before_create :set_email_to_lower_case!
  has_secure_password
  has_secure_token :auth_token
  has_many :posts
  has_many :images
  has_many :messages
  has_many :chat_rooms

  validates :name, presence: true, length: { in: 3..20 }, uniqueness: { case_sensitive: false }
  validates :email, presence: true, uniqueness: { case_sensitive: false },
            format: { with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i }
  validates :password, presence: true, length: { in: 8..20 }, allow_blank: true

  def set_email_to_lower_case!
    self.email.downcase!
  end

end
