class User < ApplicationRecord
  before_create :set_email_to_lower_case!
  has_secure_password
  has_secure_token :auth_token
  has_many :posts
  has_many :images
  has_many :messages
  has_many :chat_rooms

  mount_uploader :avatar, AvatarUploader

  validates :name, presence: true, length: { in: 3..20 }, uniqueness: { case_sensitive: false }
  validates :email, presence: true, uniqueness: { case_sensitive: false },
            format: { with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i }
  validates :password, presence: true, length: { in: 8..20 }, allow_blank: true

  def payload
    {
        id: self.id,
        name: self.name,
        avatar: self.avatar_url
    }
  end

  def authorization_payload
    {
        id: self.id,
        name: self.name,
        avatar: self.avatar_url,
        token: self.auth_token
    }
  end

  def set_email_to_lower_case!
    self.email.downcase!
  end

end
