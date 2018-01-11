class MessagesController < ApplicationController
  before_action :authorizate_request!

  def index
    chat = ChatRoom.find(params[:id])
    render json: {
        messages: messages_payload(chat.messages.order(created_at: :desc)
                                       .page(params[:page]).per(20))}
  end

  private

  def messages_payload messages
    messages.map do |message|
      message.payload
    end
  end
end
