import {createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {authAPI} from "../api/authAPI";
import {LoginDataType} from "../types/types";
import {AppStateType, TAction} from "./store";
import {ECaptchaResultCode, EResultCode} from "../api/api";

type SetUserDataActionPayloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
};

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    rememberMe: false,
    isAuth: false,
    captchaUrl: null as string | null
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<SetUserDataActionPayloadType>) => {
            state.userId = action.payload.id;
            state.email = action.payload.email;
            state.login = action.payload.login;
            state.isAuth = action.payload.isAuth
        },
        setCaptchaUrl: (state, action: PayloadAction<string>) => {
            state.captchaUrl = action.payload
        }
    }
})

const {
    setUserData,
    setCaptchaUrl
} = authSlice.actions;

type TThunk = ThunkAction<Promise<void>, AppStateType, unknown, TAction<typeof authSlice.actions>>
export const getUserData = (): TThunk => async (dispatch) => {
    const data = await authAPI.getAuth();
    if (data.resultCode === EResultCode.Success) {
        dispatch(setUserData({...data.data, isAuth: true}))
    }
}
const getCaptchaUrl = (): TThunk => async (dispatch) => {
    const data = await authAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(data.url))
}
export const login = (loginData: LoginDataType): TThunk => async (dispatch) => {
    const data = await authAPI.login(loginData);
    if (data.resultCode === EResultCode.Success) {
        await dispatch(getUserData())
    } else {
        if (data.resultCode === ECaptchaResultCode.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }
    }
}
export const logout = (): TThunk => async (dispatch) => {
    const data = await authAPI.logout();
    if (data.resultCode === EResultCode.Success) {
        dispatch(setUserData({id: null, email: null, login: null, isAuth: false}))
    }
}

export default authSlice.reducer;