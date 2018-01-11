import axios from 'axios'
import * as types from '../constants/ActionTypes'
import { logOutIfUnauthorized } from '../helpers/application_helper'

export const messagesList = () => ({
    type: types.MESSAGES_LIST
})

export const messagesListSuccess = messages => ({
    type: types.MESSAGES_LIST_SUCCESS,
    messages
})

export const messagesListFailure = errors => ({
    type: types.MESSAGES_LIST_FAILURE,
    errors
})

export const messagesListEnd = () => ({
    type: types.MESSAGES_LIST_END
})

export function getMessages(id, page) {
    return dispatch => {
        dispatch(messagesList())
        return axios.get('/messages', { params: {page: page, id: id}})
            .then(response => {
                if(response.data.messages.length < 20)
                    dispatch(messagesListEnd())
                dispatch(messagesListSuccess(response.data.messages))
                var objDiv = document.getElementById('chat')
                objDiv.scrollTop = 400
            })
            .catch(error => {
                dispatch(messagesListFailure(errors.response.data.errors))
                dispatch(logOutIfUnauthorized(error.response.status))
            })

    }
}

export const receiveMessage = message => ({
    type: types.RECEIVE_MESSAGE,
    message
})

export const appendMessage = message => (
    dispatch => {
        dispatch(receiveMessage(message))
        var objDiv = document.getElementById('chat')
        objDiv.scrollTop = objDiv.scrollHeight
    }
)
