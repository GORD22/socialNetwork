import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../api/authAPI";


const initialState = {
    userId: null,
    email: null,
    login: null,
    rememberMe: false,
    isAuth: false,
    captchaUrl: null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUserData: (state, action) => {
          state.userId = action.payload.id;
          state.email = action.payload.email;
          state.login = action.payload.login;
          state.isAuth = action.payload.isAuth
        },
        setCaptchaUrl: (state, action) => {
          state.captchaUrl = action.payload
        }
    }
})

const {actions, reducer} = authSlice;

const {
    setUserData,
    setCaptchaUrl
} = actions;

export const getUserData = () => async (dispatch) => {
    const data = await authAPI.getAuth();
    if (data.resultCode === 0) {
        dispatch(setUserData({...data.data, isAuth: true}))
    }
}
const getCaptchaUrl = () => async (dispatch) => {
    const data = await authAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(data.url))
}
export const login = (loginData) => async (dispatch) => {
    const data = await authAPI.login(loginData);
    if (data.resultCode === 0) {
        dispatch(getUserData())
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
    }
}
export const logout = () => async (dispatch) => {
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setUserData({id: null, email: null, login: null, isAuth: false}))
    }
}

export default reducer;