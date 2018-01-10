import * as types from '../constants/ActionTypes'
import { Map, fromJS, List } from 'immutable'

const initialState = Map({
    users:List()
})

export default function (state = initialState, action) {
    switch(action.type) {
        case types.USERS_LIST: return setIsFetching(state, true)
        case types.USERS_LIST_SUCCESS: return AddUsersToList(state, action.users)
        case types.USERS_LIST_FAILURE: return setIsFetching(state, false)
        case types.SET_USERS_FILTER: return setFilter(state, action.filter)
    }
    return state
}

const setIsFetching = (state, value) => state.merge({isFetching: value})

const AddUsersToList = (state, users) => {
    let newState = state.get('users').concat(fromJS(users))
    return state.merge({
        users: newState,
        isFetching: false
    })
}

const setFilter = (state, filter) => state.merge({filter: filter})
