class Post < ApplicationRecord
  belongs_to :user
  has_many :images

  validates :content, length: { maximum: 1000 }

  def payload
    author = User.find(self.user_id)
    image = self.images.first.image_url if self.images.first
    {
        id: self.id,
        content: self.content,
        image: image,
        createdAt: self.created_at.strftime("%B %d, %Y"),
        author:{
            name: author.name,
            id: author.id,
            avatar: author.avatar_url
        }}
  end
end
