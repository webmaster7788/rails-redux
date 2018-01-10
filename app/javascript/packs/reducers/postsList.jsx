import * as types from '../constants/ActionTypes'
import { Map, fromJS, List } from 'immutable'

const initialState = Map({
    posts:List()
})

export default function (state = initialState, action) {
    switch(action.type) {
        case types.POSTS_LIST: return setIsFetching(state, true)
        case types.POSTS_LIST_SUCCESS: return AddPostsToList(state, action.posts)
        case types.POSTS_LIST_FAILURE: return setIsFetching(state, false)
        default: return state
    }
}

const setIsFetching = (state, value) => state.merge({isFetching: value})

const AddPostsToList = (state, posts) => {
    let newState = state.get('posts').concat(fromJS(posts))
    return state.merge({
        posts: newState,
        isFetching: false
    })
}
