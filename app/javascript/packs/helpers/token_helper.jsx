export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function setToken(token) {
    if (typeof(Storage) != 'undefined') {
        localStorage.setItem('token', token)
    } else {
        setCookie('token', token, 365)
    }
}

export function getToken() {
    if (typeof(Storage) !== 'undefined') {
        return localStorage.getItem('token')
    } else {
        return getCookie('token')
    }
    return ''
}

export function removeToken() {
    if (typeof(Storage) !== 'undefined') {
        localStorage.removeItem('token')
    } else {
        setCookie('token', '', 365)
    }
}