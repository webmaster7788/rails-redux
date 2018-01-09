import axios from 'axios'
import { hashHistory } from 'react-router'
import { getToken, removeToken, setToken } from '../helpers/token_helper'
import * as types from '../constants/ActionTypes'
import { logOutIfUnauthorized } from '../helpers/application_helper'

export const currentUser = () => ({
    type: types.CURRENT_USER
})

export const currentUserSuccess = (user) => ({
    type: types.CURRENT_USER_SUCCESS,
    user
})

export const currentUserFailure = (errors) => ({
    type: types.CURRENT_USER_FAILURE,
    errors
})

export function getCurrentUser() {
    return dispatch => {
        dispatch(currentUser())
        return axios.get('/current_user')
            .then(response => {
                dispatch(currentUserSuccess(response.data.user))
            })
            .catch(error => {
                dispatch(currentUserFailure(error.response.data.errors))
                dispatch(logOutIfUnauthorized(error.response.status))
            })
    }
}

export const user = () => ({
    type: types.USER
})

export const userSuccess = (user) => ({
    type: types.USER_SUCCESS,
    user
})

export const userFailure = (errors) => ({
    type: types.USER_FAILURE,
    errors
})

export function getUser(id) {
    return dispatch => {
        dispatch(user())
        return axios.get('/users/' + id)
            .then(response => {
                dispatch(userSuccess(response.data.user))
            })
            .catch(error => {
                dispatch(userFailure(error.response.data.errors))
                dispatch(logOutIfUnauthorized(error.response.status))
            })
    }
}

export const registration = () => ({
    type: types.REGISTRAION
})

export const registrationSuccess = (user) => ({
    type: types.REGISTRATION_SUCCESS,
    user
})

export const registrationFailure = (errors) => ({
    type: types.REGISTRAION_FAILURE,
    errors
})

export function register(user) {
    return dispatch => {
        dispatch(registration())
        return axios.post('/users', user)
            .then(response => {
                setToken(response.data.user.token)
                dispatch(registrationSuccess(response.data.user))
                hashHistory.push('/')
            })
            .catch(error => {
                dispatch(registrationFailure(error.response.data.errors))
            })
    }
}


export const usersList = () => ({
    type: types.USERS_LIST
})

export const usersListSuccess = users => ({
    type: types.USERS_LIST_SUCCESS,
    users
})

export const usersListFailure = () => ({
    type: types.USERS_LIST_FAILURE
})

export const usersListEnd = () => ({
    type: types.USERS_LIST_END
})

export function getUsersList(page, filter) {
    return dispatch => {
        dispatch(usersList())
        return axios.get('/users', { params: { page: page, filter: filter }})
            .then(response => {
                if(response.data.users < 20)
                    dispatch(usersListEnd())
                dispatch(usersListSuccess(response.data.users))
            })
            .catch(error => {
                dispatch(usersListFailure())
                dispatch(logOutIfUnauthorized(error.response.status))
            })
    }
}

export const userUpdate = () => ({
    type: types.USER_UPDATE
})

export const userUpdateSuccess = user => ({
    type: types.USER_UPDATE_SUCCESS,
    user
})

export const userUpdateFailure = errors => ({
    type: types.USER_UPDATE_FAILURE,
    errors
})

export function updateUser(user) {
    return dispatch => {
        dispatch(userUpdate())
        return axios.patch('/users', user)
            .then(response => {
                dispatch(userUpdateSuccess(response.data.user))
            })
            .catch(error => {
                dispatch(userUpdateFailure())
                dispatch(logOutIfUnauthorized(error.response.status))
            })
    }
}

export const setUsersFilter = filter => ({
    type: types.SET_USERS_FILTER,
    filter
})
