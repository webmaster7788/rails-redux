import React, { Component } from 'react'
import {
    List,
    ListItem
} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import InfiniteScroll from 'react-infinite-scroller'
import CircularProgress from 'material-ui/CircularProgress'

export default class UsersList extends Component {
    render() {
        const { users, isFetching, getUsersList, listEnd, goToPage } = this.props
        return(
            <List>
                <InfiniteScroll
                    pageStart={Math.round(users.count()/20)}
                    loadMore={page => getUsersList(Math.round(users.count()/20)+1)}
                    hasMore={!listEnd && !isFetching}
                    threshold={100}
                >
                    {
                        users.map((user,n) => (
                            <div key={n}>
                                <ListItem
                                    onClick={(e) => goToPage('users/' + user.get('id'))}
                                    primaryText={user.get('name')}
                                    leftAvatar={<Avatar src={user.get('avatar')} />}
                                />
                                <Divider />
                            </div>
                        ))
                    }
                </InfiniteScroll>
                {
                    isFetching?
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
        )
    }
}
