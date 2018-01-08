import React from 'react'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { render } from 'react-dom'
import { blueGrey800 } from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import routes from './routes'
import configureStore from './store'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

window.App = {}
const store = configureStore()
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey800
    }
})

render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <Router history={hashHistory} routes={routes} />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)