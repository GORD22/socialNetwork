import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "c851ec98-d9ce-4d44-9660-10ec87e6e961"
    }
})
export enum EResultCode {
    Success = 0,
    Error = 1
}
export enum ECaptchaResultCode {
    CaptchaIsRequired = 10
}
export type TResponse<D = {}, RC = EResultCode> = {
    data: D
    resultCode: RC
    message: Array<string>
}