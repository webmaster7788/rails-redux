import * as types from '../constants/ActionTypes'
import { Map } from 'immutable'

export default function (state = Map(), action) {
    switch(action.type) {
        case types.USER: return setIsFetching(state, true)
        case types.USER_SUCCESS: return setUser(state, action.user)
        case types.USER_FAILURE: return setIsFetching(state, false)
        case types.USER_UPDATE:return setIsFetching(state, true)
        case types.USER_UPDATE_SUCCESS: return setUser(state, action.user)
        case types.USER_UPDATE_FAILURE: return setIsFetching(state, false)
        default: return state
    }
}

const setIsFetching = (state, value) => state.merge({isFetching: value})

const setUser = (state, user) => state.merge(Map(user).merge({ isFetching: false }))
