import {ECaptchaResultCode, EResultCode, instance, TResponse} from "./api";
import {LoginDataType} from "../types/types";

type TMeResponse = {
    id: number
    email: string
    login: string
}
type TCaptchaResponse = {
    url: string
}
type TLoginResponse = {
    userId: number
}
export const authAPI = {
    getAuth() {
        return instance.get<TResponse<TMeResponse>>('auth/me')
            .then(response => response.data)
    },
    getCaptchaUrl() {
        return instance.get<TCaptchaResponse>('security/get-captcha-url')
            .then(response => response.data)
    },
    login(loginData: LoginDataType) {
        return instance.post<TResponse<TLoginResponse, EResultCode | ECaptchaResultCode>>(`auth/login`, loginData)
            .then(response => response.data)
    },
    logout() {
        return instance.delete<TResponse>(`auth/login`)
            .then(response => response.data)
    }
}
