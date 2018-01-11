import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getChatRoomsList, createChat } from '../../actions/chatRooms'
import { goToPage } from '../../helpers/application_helper'
import { List, ListItem } from 'material-ui/List'
import InfiniteScroll from 'react-infinite-scroller'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Col, Row } from 'react-flexbox-grid'

export class ChatRooms extends Component {
    render() {
        const { getChatRoomsList, chat, chatRoomsList, pages, goToPage, createChat } = this.props
        return(
            <Row>
                <Col xs={12}>
                    <form id="chat-form" onSubmit={e => createChat(e)}>
                        <TextField
                            name="chat_room[title]"
                            floatingLabelText="Create new chatroom"
                        />
                        <RaisedButton type="submit">Add</RaisedButton>
                    </form>
                </Col>
                <Col xs={12}>
                    <List>
                        <InfiniteScroll
                            pageStart={chatRoomsList.get('chatRooms').count()/20}
                            loadMore={page => getChatRoomsList(page)}
                            hasMore={!pages.get('chatRoomsListEnd') && !chatRoomsList.get('isFetching')}
                            threshold={100}
                        >
                            {
                                chatRoomsList.get('chatRooms').map((chat,n) => {
                                    return (
                                        <div key={n}>
                                            <ListItem
                                                onClick={(e) => goToPage('chatrooms/' + chat.get('id'))}
                                                primaryText={chat.get('title')}
                                            />
                                            <Divider />
                                        </div>
                                    )
                                })
                            }
                        </InfiniteScroll>
                        {
                            chatRoomsList.get('isFetching')?
                                <div className="loader">
                                    <CircularProgress
                                        className="loader"
                                        size={60}
                                        thickness={5}
                                    />
                                </div>
                                :
                                null
                        }
                    </List>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    chatRoomsList: state.chatRoomsList,
    chat: state.chatRoom,
    pages: state.pages
})

const mapDispatchToProps = dispatch => ({
    getChatRoomsList: page => dispatch(getChatRoomsList(page)),
    createChat: e => {
        e.preventDefault()
        const chat = new FormData(document.getElementById('chat-form'))
        dispatch(createChat(chat))
    },
    goToPage: url => dispatch(goToPage(url))
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatRooms)
