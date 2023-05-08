import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profileSlice";
import dialogsReducer from "./dialogsSlice";
import usersReducer from "./usersSlice";
import authReducer from "./authSlice";
import appReducer from "./appSlice";
import chatReducer from "./chatSlice";

const reducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(
            thunkMiddleware
        )
})

type ReducerType = typeof reducers
export type AppStateType = ReturnType<ReducerType>

export type TAction<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type AppDispatch = typeof store.dispatch