import { SET_DRAWER, SET_POST_DIALOG, UPLOAD_PHOTOS, DELETE_PREVIEW } from '../constants/ActionTypes'

export const setDrawerValue = value => ({
    type: SET_DRAWER,
    value
})
export function setDrawer(value) {
    return dispatch => dispatch(setDrawerValue(value))
}

export function setPostDialog(value) {
    return dispatch => dispatch(setPostDialogValue(value))
}

export const uploadPhotosPreviews = photos => ({
    type: UPLOAD_PHOTOS,
    photos
})

export function uploadPhotos(photos) {
    return dispatch => dispatch(uploadPhotosPreviews(photos))
}

export const deletePhotoPreview = n => ({
    type: DELETE_PREVIEW,
    n
})
export function deletePreview(n){
    return dispatch => dispatch(deletePhotoPreview(n))
}
