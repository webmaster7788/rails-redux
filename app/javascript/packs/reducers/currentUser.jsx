import { Map } from 'immutable'
import * as types from '../constants/ActionTypes'

export default function (state = Map(), action) {
    switch(action.type) {
        case types.CURRENT_USER: return setIsFetching(state, true)
        case types.CURRENT_USER_SUCCESS: return setCurrentUser(state, action.user)
        case types.CURRENT_USER_FAILURE: return setIsFetching(state, false)
        case types.LOGIN: return setIsFetching(state, true)
        case types.LOGIN_SUCCESS: return setCurrentUser(state, action.user)
        case types.LOGIN_FAILURE: return setIsFetching(state, false)
        case types.REGISTRAION: return setIsFetching(state, true)
        case types.REGISTRAION_FAILURE: return setIsFetching(state, false)
        case types.REGISTRATION_SUCCESS: return setCurrentUser(state, action.user)
        case types.USER_UPDATE: return setIsFetching(state, true)
        case types.USER_UPDATE_SUCCESS: return setCurrentUser(state, action.user)
        case types.USER_UPDATE_FAILURE: return setIsFetching(state, false)
        default: return state
    }
}

const setIsFetching = (state, value) => state.merge({isFetching: value})

const setCurrentUser = (state, user) => state.merge(Map(user).merge({ isFetching: false }))
