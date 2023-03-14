import {instance} from "./api";


export const authAPI = {
    getAuth() {
        return instance.get('auth/me')
            .then(response => response.data)
    },
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
            .then(response => response.data)
    },
    login(loginData) {
        return instance.post(`auth/login`, loginData)
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    }
}