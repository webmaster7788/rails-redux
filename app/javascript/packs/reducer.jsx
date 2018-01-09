import { combineReducers } from 'redux'
import { Map } from 'immutable'
import user from './reducers/user'
import errors from './reducers/errors'


const appReducer = combineReducers({
    user,
    errors
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
