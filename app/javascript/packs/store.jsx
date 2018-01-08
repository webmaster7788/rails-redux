import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
    return createStore(reducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(thunkMiddleware)
    ))
}
