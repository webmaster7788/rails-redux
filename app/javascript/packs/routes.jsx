import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AuthorizationLayout from './components/AuthorizationLayout'
import Login from './containers/Login/index'

const routes = (
    <div>
        <Route path="/" component={AuthorizationLayout}>
            <IndexRoute component={Login}/>
        </Route>
    </div>
)

export default routes