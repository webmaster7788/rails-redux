class MessageRelayJob < ApplicationJob
  def perform(message)
    ActionCable.server.broadcast "chat_rooms_#{message.chat_room_id}_channel",
                                 "message" => message.payload
  end
end
