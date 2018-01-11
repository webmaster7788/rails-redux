class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat_room

  after_commit { MessageRelayJob.perform_later(self) }

  def payload
    author = User.find(self.user_id)
    {
        id: self.id,
        body: self.body,
        createdAt: self.created_at.strftime("%B %d, %Y"),
        author: {
            id: author.id,
            name: author.name,
            avatar: author.avatar_url
        }
    }
  end
end
