import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
        addMessage: (state, action) => {
            const newMessage = {
                id: !state.userMessages[0] ? 1 : state.userMessages.length + 1,
                message: action.payload
            };
            state.userMessages = [...state.userMessages, newMessage]
        }
    }
})

const {actions, reducer} = dialogsSlice;

export const {
    addMessage
} = actions;

export default reducer;