import { Dispatch, PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { TChatMessageAPI, TStatus, chatAPI } from "../api/chatAPI";
import { AppStateType, TAction } from "./store";
import {v1} from 'uuid'

type TChatMessage = TChatMessageAPI & {id: string}

const initialState = {
    messages: [] as TChatMessage[],
    status: 'pending' as TStatus
}

const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {
        messagesReceived: (state, action: PayloadAction<TChatMessageAPI[]>) => {
            state.messages = [...state.messages, ...action.payload.
                map( m => ({...m, id: v1()}))].filter((m, index, array) => index >= array.length - 100)
        },
        statusChanged: (state, action: PayloadAction<TStatus>) => {
            state.status = action.payload
        }
    }
})

const { actions, reducer } = chatSlice

export const {
    messagesReceived,
    statusChanged
} = actions

type TThunk = ThunkAction<Promise<void>, AppStateType, unknown, TAction<typeof actions>>

let _newMessageHandler: ((messages: TChatMessageAPI[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {

    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: TStatus) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListener = (): TThunk => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

}
export const stopMessagesListener = (): TThunk => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): TThunk => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default reducer