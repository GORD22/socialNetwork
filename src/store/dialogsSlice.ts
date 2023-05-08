import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DialogsType, MessagesType } from "../types/types";

type InitialStateType = {
    userMessages: Array<MessagesType>,
    otherUserMessage: Array<MessagesType>,
    dialogs: Array<DialogsType>
}

const initialState: InitialStateType = {
    userMessages: [],
    otherUserMessage: [
        {id: 1, message: "Hello!"},
        {id: 2, message: "How are you?"}
    ],
    dialogs: [
        {id: 1, name: "Danya"},
        {id: 2, name: "Nikita"},
        {id: 3, name: "Diana"},
        {id: 4, name: "Irina"},
        {id: 5, name: "Sasha"}
    ]
}

const dialogsSlice = createSlice({
    name: "dialogsSlice",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<string>) => {
            const newMessage: MessagesType = {
                id: !state.userMessages[0] ? 1 : state.userMessages.length + 1,
                message: action.payload
            };
            state.userMessages = [...state.userMessages, newMessage]
        }
    }
})

export const {
    addMessage
} = dialogsSlice.actions;

export default dialogsSlice.reducer;