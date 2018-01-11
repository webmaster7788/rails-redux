import { List, Map, fromJS }from 'immutable'
import * as types from '../constants/ActionTypes'

const initialState =Map({
    chatRooms: List()
})

export default function(state = initialState, action) {
    switch(action.type){
        case types.CHAT_ROOMS_LIST: return setIsFetching(state, true)
        case types.CHAT_ROOMS_LIST_SUCCESS: return AddChatRoomsToList(state, action.chatRooms)
        case types.CHAT_ROOMS_LIST_FAILURE: return setIsFetching(state, false)
        default: return state
    }
}

const setIsFetching = (state, value) => state.merge({isFetching: value})

const AddChatRoomsToList = (state, chatRooms) => (
    state.merge({
        chatRooms: state.get('chatRooms').concat(fromJS(chatRooms)),
        isFetching: false
    })
)
