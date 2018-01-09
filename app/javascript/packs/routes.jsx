import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AuthorizationLayout from './components/AuthorizationLayout'
import Login from './containers/Login/index'
import { getToken } from './helpers/token_helper'

const routes = (
    <div>
        <Route path="/" component={AuthorizationLayout} onEnter={checkLogout}>
            <Route path="login" component={Login} />
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