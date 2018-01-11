import { Map, List, fromJS } from 'immutable'
import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import messagesList from './messagesList'

const initialState = Map({
    chatRoom: Map(),
    isFetching: false,
    messagesList: Map({ messages: List()})
})

export default function chatRoom(state = initialState, action) {
    switch(action.type) {
        case types.CHAT_ROOM: return setIsFetchingAndResetMessagesList(state, true)
        case types.CHAT_ROOM_SUCCESS: return setChatRoom(state, action.chatRoom)
        case types.CHAT_ROOM_FAILURE: return  setIsFetching(state, false)
        case types.CREATE_CHAT_ROOM_SUCCESS: return setChatRoom(state, action.chatRoom)
        default: return state.merge({ messagesList: messagesList(state.get('messagesList'), action)})
    }
}

const setIsFetching = (state, value) => state.merge({isFetching: value})

const setIsFetchingAndResetMessagesList = (state, value) => (
    state.merge({
        isFetching: value,
        messagesList: Map({
            messages: List()
        })
    })
)

const setChatRoom = (state, chat) => (
    state.merge(Map(chat).merge({
        isFetching: false
    }))
)
