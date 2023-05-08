import {AppStateType} from './store'

export const getUserMessages = (state: AppStateType) => {
    return state.dialogs.userMessages
}

export const getOtherUserMessages = (state: AppStateType) => {
    return state.dialogs.otherUserMessage
}

export const getDialogs = (state: AppStateType) => {
    return state.dialogs.dialogs
}