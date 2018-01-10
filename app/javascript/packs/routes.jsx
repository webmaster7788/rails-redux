import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AuthorizationLayout from './components/AuthorizationLayout'
import ApplicationLayout from './components/ApplicationLayout'
import Login from './containers/Login/index'
import Register from './containers/Register/index'
import NewsFeed from './containers/NewsFeed'
import Users from './containers/Users'
import { getToken } from './helpers/token_helper'

const routes = (
    <div>
        <Route path="/" component={ApplicationLayout} onEnter={checkLogin}>
            <IndexRoute component={NewsFeed}/>
            <Route path="/users" component={Users} />
        </Route>
        <Route path="/" component={AuthorizationLayout} onEnter={checkLogout}>
            <Route path="login" component={Login} />
            <Register path="register" component={Register} />
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