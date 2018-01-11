import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import InfiniteScroll from 'react-infinite-scroller'
import CircularProgress from 'material-ui/CircularProgress'
import { Card, CardText, CardHeader } from 'material-ui/Card'

export default class MessagesList extends Component {

    getMessagesList(page) {
        this.props.getMessages(this.props.chatId, page)
    }

    render() {
        const { getMessages, chatId, messagesList, listEnd, goToPage } = this.props
        return(
            <div id="chat">
                <InfiniteScroll
                    pageStart={messagesList.get('messages').count() /20}
                    loadMore={page => this.getMessagesList(page)}
                    hasMore={!listEnd && !messagesList.get('isFetching')}
                    threshold={1}
                    isReverse={true}
                    useWindow={false}
                >
                    {
                        messagesList.get('messages').map((message,n) => (
                            <div key={n}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                onTouchTap={() => goToPage('users/' + message.getIn(['author', 'id']))}
                                                src={message.getIn(['author', 'avatar'])}
                                                className="author-avatar"
                                            />
                                        }
                                        title={message.getIn(['author', 'name'])}
                                        subtitle={message.get('createdAt')}
                                    />
                                    <CardText>
                                        {message.get('body')}
                                    </CardText>
                                </Card>
                            </div>))
                    }
                </InfiniteScroll>
            </div>
        )
    }
}
