import {createSlice, ThunkAction} from "@reduxjs/toolkit";
import {getUserData} from "./authSlice";
import {AppStateType, TAction} from "./store";

type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        initializeAppSuccess: (state) => {
            state.initialized = true
        }
    }
})

const {
    initializeAppSuccess
} = appSlice.actions;

type TThunk = ThunkAction<Promise<void>, AppStateType, unknown, TAction<typeof appSlice.actions>>
export const initializeApp = (): TThunk => async (dispatch) => {
    const promise = await dispatch(getUserData());

    Promise.all([promise]).then(() => {
            dispatch(initializeAppSuccess())
        }
    )
}

export default appSlice.reducer;