import { combineReducers } from 'redux'
import { Map } from 'immutable'
import user from './reducers/user'
import errors from './reducers/errors'
import currentUser from './reducers/currentUser'
import pages from './reducers/pages'
import usersList from './reducers/usersList'
import postsList from './reducers/postsList'
import chatRoomsList from './reducers/chatRoomsList'
import chatRoom from './reducers/chatRoom'
import messagesList from './reducers/messagesList'

const appReducer = combineReducers({
    user,
    currentUser,
    errors,
    pages,
    usersList,
    postsList,
    chatRoomsList,
    chatRoom
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
