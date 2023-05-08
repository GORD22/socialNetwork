import {AppStateType} from './store'

export const getProfileStatus = (state: AppStateType) => {
    return state.profile.status
}
export const getProfileInfo = (state: AppStateType) => {
    return state.profile.profile
}
