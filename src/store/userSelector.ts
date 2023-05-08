import {AppStateType} from './store'

export const getUsers = (state: AppStateType) => {
    return state.users.users
}
export const getCurrentPage = (state: AppStateType) => {
    return state.users.currentPage
}
export const getPageSize = (state: AppStateType) => {
    return state.users.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.users.totalUsersCount
}
export const getIsFetching = (state: AppStateType) => {
    return state.users.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.users.followingInProgress
}
export const getTermOfFilter = (state: AppStateType) => {
    return state.users.filter.term
}
export const getFriendOfFilter = (state: AppStateType) => {
    return state.users.filter.friend
}