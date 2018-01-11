import * as types from '../constants/ActionTypes'
import axios from 'axios'
import { hashHistory } from 'react-router'
import { getToken } from '../helpers/token_helper'
import { logOutIfUnauthorized } from '../helpers/application_helper'

export const chatRoomsList = () => ({
    type:types.CHAT_ROOMS_LIST
})

export const chatRoomsListSuccess = chatRooms => ({
    type: types.CHAT_ROOMS_LIST_SUCCESS,
    chatRooms
})

export const chatRoomsListFailure = errors => ({
    type: types.CHAT_ROOMS_LIST_FAILURE,
    errors
})

export const chatRoomsListEnd = () => ({
    type: types.CHAT_ROOMS_LIST_END
})

export function getChatRoomsList(page) {
    return dispatch => {
        dispatch(chatRoomsList())
        return axios.get('/chat_rooms', { params: { page: page }})
            .then(response => {
                if(response.data.chatRooms < 20)
                    dispatch(chatRoomsListEnd())
                dispatch(chatRoomsListSuccess(response.data.chatRooms))
            })
            .catch(error => {
                dispatch(chatRoomsListFailure(error.response.data.errors))
                dispatch(logOutIfUnauthorized(error.response.status))
            })
    }
}

export const chatRoom = () => ({
    type: types.CHAT_ROOM
})

export const chatRoomSuccess = chatRoom => ({
    type: types.CHAT_ROOM_SUCCESS,
    chatRoom
})

export const chatRoomFailure = errors => ({
    type: types.CHAT_ROOM_FAILURE,
    errors
})

export function getChatRoom(id) {
    return dispatch => {
        dispatch(chatRoom())
        return axios.get('/chat_rooms/'+ id)
            .then(response => {
                dispatch(chatRoomSuccess(response.data.chatRoom))
            })
            .catch(error => {
                dispatch(chatRoomFailure(error.response.data.errors))
                dispatch(logOutIfUnauthorized(error.response.status))
            })
    }
}

export const createChatRoom = () => ({
    type: types.CREATE_CHAT_ROOM
})

export const createChatRoomSuccess = chatRoom => ({
    type: types.CREATE_CHAT_ROOM_SUCCESS,
    chatRoom
})

export const createChatRoomFailure = errors => ({
    type: types.CREATE_CHAT_ROOM_FAILURE,
    errors
})

export function createChat(chat) {
    return dispatch => {
        dispatch(createChatRoom())
        return axios.post('/chat_rooms', chat)
            .then(response => {
                dispatch(createChatRoomSuccess(response.data.chatRoom))
                hashHistory.push('/chatrooms/'+ response.data.chatRoom.id)
            })

    }
}
