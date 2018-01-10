import { combineReducers } from 'redux'
import { Map } from 'immutable'
import user from './reducers/user'
import errors from './reducers/errors'
import currentUser from './reducers/currentUser'
import pages from './reducers/pages'
import usersList from './reducers/usersList'

const appReducer = combineReducers({
    user,
    currentUser,
    errors,
    pages,
    usersList
})

const reducer = (state = {}, action) => {
    if (action.type === 'LOGOUT') {
        return {
            currentUser: Map(),
            errors: Map()
        }
    }
    return appReducer(state, action)
}

export default reducer
