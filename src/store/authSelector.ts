import {AppStateType} from './store'

export const getUserId = (state: AppStateType) => {
    return state.auth.userId
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getEmail = (state: AppStateType) => {
    return state.auth.email
}

export const getLogin = (state: AppStateType) => {
    return state.auth.login
}

export const getCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl
}

export const getRememberMe = (state: AppStateType) => {
    return state.auth.rememberMe
}