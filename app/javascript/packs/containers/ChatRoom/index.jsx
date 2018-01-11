import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getChatRoom } from '../../actions/chatRooms'
import MessagesList from '../../components/messages/MessagesList'
import MessageForm from '../../components/messages/MessageForm'
import { getMessages, appendMessage } from '../../actions/messages'
import { Col } from 'react-flexbox-grid'
import ActionCable from 'actioncable'
import { getToken } from '../../helpers/token_helper'
import { goToPage } from '../../helpers/application_helper'

export class ChatRoom extends Component {

    setupSubscription(){
        const { appendMessage } = this.props
        window.App.messages = window.App.cable.subscriptions.create("ChatRoomsChannel", {
            chat_room_id: this.props.params.id,
            connected: function () {
                setTimeout(() => this.perform('follow',
                    {chat_room_id: this.chat_room_id}), 1000)
            },
            received: function (data) {
                appendMessage(data.message)
            },
            send_message: function(message, chat_room_id) {
                this.perform('send_message', {message: message, chat_room_id: chat_room_id})
            }})
    }

    componentDidMount() {
        window.App.cable = ActionCable.createConsumer(`wss://${window.location.host}/cable?token=${getToken()}`)
        this.setupSubscription()
        const { getChatRoom, params, chat } = this.props
        if(chat.get('id') !== params.id)
            getChatRoom(params.id)
    }

    componentWillReceiveProps(nextProps) {
        const { params, getChatRoom } = this.props
        const { id } = nextProps.params
        if (params.id != id) {
            getChatRoom(id)
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const text = document.getElementById('message')
        window.App.messages.send_message(text.value, this.props.params.id)
        text.value = ""
    }

    handleKeyUp(e) {
        if(e.keyCode == 13 && !e.shiftKey){
            this.handleSubmit(e)
        }
    }

    render() {
        const { chat, getMessages, pages, params, goToPage} = this.props
        const { handleSubmit, handleKeyUp } = this
        return(
            <Col
                xs={12}
                smOffset={1} sm={10}
                md={10}
                lg={8}
            >
                <h2>{chat.get('title')}</h2>
                <MessagesList
                    chatId={params.id}
                    listEnd={pages.get('messagesListEnd')}
                    messagesList={chat.get('messagesList')}
                    getMessages={getMessages}
                    goToPage={goToPage}
                />
                <MessageForm
                    handleSubmit={handleSubmit.bind(this)}
                    handleKeyUp={handleKeyUp.bind(this)}
                />
            </Col>
        )
    }
}

const mapStateToProps = state => ({
    chat: state.chatRoom,
    pages: state.pages
})

const mapDispatchToProps = dispatch => ({
    getChatRoom: id => dispatch(getChatRoom(id)),
    getMessages: (id, page) => dispatch(getMessages(id, page)),
    appendMessage: message => dispatch(appendMessage(message)),
    goToPage: nextUrl => dispatch(goToPage(nextUrl))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
