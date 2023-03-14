import {combineReducers, configureStore} from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import dialogsReducer from "./dialogsSlice";
import usersReducer from "./usersSlice";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authSlice";
import appReducer from "./appSlice";

const reducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer
})
export const store = configureStore({
    reducer: reducers,
    thunkMiddleware
})