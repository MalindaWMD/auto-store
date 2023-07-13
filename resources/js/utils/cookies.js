import Cookies from "js-cookie"

export const setCookie = (key, value, expire=1) => {
    value = JSON.stringify(value)
    return Cookies.set(key, value, {expires: expire})
}

export const getCookie = (key) => {
    let value = Cookies.get(key)
    return value ? JSON.parse(value) : null
}

export const removeCookie = (key) => {
    Cookies.remove(key)
}