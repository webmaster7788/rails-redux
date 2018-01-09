import { removeToken } from './token_helper'
import { hashHistory } from 'react-router'
import { logout } from '../actions/auth'
import { setDrawer } from '../actions/pages'

export function isMobile() {
    return (/Mobi/.test(navigator.userAgent))? true : false
}

export function logOutIfUnauthorized(status) {
    return dispatch => {
        if (status == 403) {
            removeToken()
            dispatch(logout())
            hashHistory.push(`/login`)
        }
    }
}

export function goToPage(nextUrl) {

    return dispatch => {
        if (isMobile())
            dispatch(setDrawer(false))
        const currentUrl = hashHistory.getCurrentLocation().pathname
        if (currentUrl == nextUrl || currentUrl == ("/" + nextUrl)) return null
        hashHistory.push(nextUrl)
    }
}
