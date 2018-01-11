import * as types from '../constants/ActionTypes'
import { Map, List, fromJS } from 'immutable'

const initialState = Map({
    messages: List()
})
export default function(state = initialState, action) {
    switch(action.type) {
        case types.MESSAGES_LIST: return setIsFetching(state, true)
        case types.MESSAGES_LIST_SUCCESS: return addMessages(state, action.messages)
        case types.MESSAGES_LIST_FAILURE: return setIsFetching(state, false)
        case types.RECEIVE_MESSAGE: return addMessage(state, action.message)
        default: return state
    }
}

const setIsFetching = (state, value) => state.merge({isFetching: value})

const addMessages = (state, messages) => {
    if(!messages) return state.merge({isFetching: false})
    const newState = state.get('messages').concat(fromJS(messages)).sort((a, b) => {
        if (a.get('id') < b.get('id')) { return -1; }
        if (a.get('id') > b.get('id')) { return 1; }
        if (a.get('id') === b.get('id')) { return 0; }
    })
    return state.merge({
        messages: newState,
        isFetching: false
    })
}

const addMessage = (state, message) => {
    const newState = state.get('messages').push(fromJS(message))
    return state.merge({
        messages: newState,
        isFetching: false
    })
}
