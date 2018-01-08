import { combineReducers } from 'redux'
import { Map } from 'immutable'
import user from './reducers/user'


const appReducer = combineReducers({
    user
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
