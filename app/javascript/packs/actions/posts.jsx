import axios from 'axios'
import { hashHistory } from 'react-router'
import * as types from '../constants/ActionTypes'
import { getToken, removeToken } from '../helpers/token_helper'
import { logOutIfUnauthorized } from '../helpers/application_helper'

export const postsList = () => ({
    type: types.POSTS_LIST
})

export const postsListSuccess = posts => ({
    type: types.POSTS_LIST_SUCCESS,
    posts
})

export const postsListFailure = () => ({
    type: types.POSTS_LIST_FAILURE
})

export const postsListEnd = () => ({
    type: types.POSTS_LIST_END
})

export function getPostsList(page) {
    return dispatch => {
        dispatch(postsList())
        return axios.get('/posts', { params: { page: page }})
            .then(response => {
                if (response.data.posts.length < 20)
                    dispatch(postsListEnd())
                dispatch(postsListSuccess(response.data.posts))
            })
            .catch(error => {
                dispatch(postsListFailure())
                dispatch(logOutIfUnauthorized(error.response.status))
            })
    }
}

export const postCreate = () => ({
    type: types.POST_CREATE
})

export const postCreateSuccess = post => ({
    type: types.POST_CREATE_SUCCESS,
    post
})

export const postCreateFailure = errors => ({
    type: types.POST_CREATE_FAILURE,
    errors
})

export function createPost(post) {
    return dispatch => {
        dispatch(postCreate())
        return axios.post('/posts', post)
            .then(response => {
                dispatch(postCreateSuccess(response.data.post))
            })
            .catch(error => {
                dispatch(postCreateFailure(error.response.data.errors))
                dispatch(logOutIfUnauthorized(error.response.status))
            })
    }
}
