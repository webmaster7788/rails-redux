import axios from 'axios'
import { hashHistory } from 'react-router'
import { setToken, getToken, removeToken } from '../helpers/token_helper'
import * as types from '../constants/ActionTypes'

axios.defaults.headers.common['X-Api-Key'] = getToken()

export const login = () => ({
    type: types.LOGIN
})

export const loginSuccess = user => ({
    type: types.LOGIN_SUCCESS,
    user
})

export const loginFailure = errors => ({
    type: types.LOGIN_FAILURE,
    errors
})

export const logout = () => ({
    type: types.LOGOUT
})

export const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS,
})

export const logoutFailure = errors => ({
    type: types.LOGOUT_FAILURE,
    errors
})

export function logIn(user) {
    return dispatch => {
        dispatch(login())
        return axios.post('/log_in', user)
            .then(response => {
                setToken(response.data.user.token)
                axios.defaults.headers.common['X-Api-Key'] = response.data.user.token
                dispatch(loginSuccess(response.data.user))
                hashHistory.push('/')
            })
            .catch(error => {
                dispatch(loginFailure(error.response.data.errors))
            })
    }
}

export function logOut() {
    return dispatch => {
        const config = {
            headers: {'X-Api-Key': getToken()}
        }
        removeToken('token')
        hashHistory.push('/login')
        axios.defaults.headers.common['X-Api-Key'] = ""
        dispatch(logout())
        return axios.delete('/log_out', config)
            .then( response => {
                dispatch(logoutSuccess())
            })
            .catch(error => {
                dispatch(logoutFailure({ 'login-form': 'Something gone wrong'}))
            })
    }
}


