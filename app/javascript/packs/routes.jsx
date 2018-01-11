import React from 'react'
import { Route, IndexRoute } from 'react-router'
import ApplicationLayout from './components/ApplicationLayout'
import AuthorizationLayout from './components/AuthorizationLayout'
import Login from './containers/Login'
import User from './containers/User'
import Users from './containers/Users'
import NewsFeed from './containers/NewsFeed'
import Register from './containers/Register'
import ChatRooms from './containers/ChatRooms'
import ChatRoom from './containers/ChatRoom'
import { getToken } from './helpers/token_helper'

const routes = (
    <div>
        <Route path="/" component={ApplicationLayout} onEnter={checkLogin}>
            <IndexRoute component={NewsFeed}/>
            <Route path="users/:id" component={User} />
            <Route path="/users" component={Users} />
            <Route path="chatrooms" component={ChatRooms} />
            <Route path="chatrooms/:id" component={ChatRoom} />
        </Route>
        <Route path="/" component={AuthorizationLayout} onEnter={checkLogout}>
            <Route path="login" component={Login} />
            <Route path="register" component={Register}/>
        </Route>
    </div>
)

function checkLogin(nextState, replace) {
    const token = getToken()
    if (!token) {
        replace('/login')
    }
}

function checkLogout(nextState, replace) {
    const token = getToken()
    if (token) {
        replace('/')
    }
}

export default routes
