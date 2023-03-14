import {createSlice} from "@reduxjs/toolkit";
import {getUserData} from "./authSlice";

const initialState = {
    initialized: false
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        initializeAppSuccess: (state, action) => {
            state.initialized = true
        }
    }
})

const {actions, reducer} = appSlice;

const {
    initializeAppSuccess
} = actions;

export const initializeApp = () => async (dispatch) => {
    const promise = await dispatch(getUserData());

    Promise.all([promise]).then(() => {
            dispatch(initializeAppSuccess())
        }
    )
}

export default reducer;