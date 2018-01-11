class ChatRoomsController < ApplicationController
  before_action :authorizate_request!

  def index
    render json: { chatRooms: ChatRoom.page(params[:page]).per(20)}
  end

  def create
    chat_room = @current_user.chat_rooms.new(title: params[:chat_room][:title])
    if chat_room.save
      render json: {chatRoom: chat_room}
    else
      render_errors(422, chat_room.errors)
    end
  end

  def show
    render json: { chatRoom: ChatRoom.find(params[:id]) }
  end
end
