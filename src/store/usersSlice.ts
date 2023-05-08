import {createSlice, Dispatch, PayloadAction, ThunkAction} from '@reduxjs/toolkit'
import {usersAPI} from '../api/usersAPI'
import {TFilter, UserType} from '../types/types'
import {objectHelper} from '../utils/objectHelper'
import {AppStateType, TAction} from './store'
import {EResultCode, TResponse} from '../api/api'


type SetFollowingInProgressActionPayloadType = {
    userId: number,
    isFetching: boolean
}


const initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    currentPage: 1,
    pageSize: 10,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users id
    filter: {
        term: '',
        friend: null as boolean | null
    }
}

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<Array<UserType>>) => {
            state.users = [...action.payload]
        },
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setTotalUsersCount: (state, action: PayloadAction<number>) => {
            state.totalUsersCount = action.payload
        },
        setFollow: (state, action: PayloadAction<number>) => {
            objectHelper(state.users, 'id', action.payload, 'followed', true)
        },
        setUnfollow: (state, action: PayloadAction<number>) => {
            objectHelper(state.users, 'id', action.payload, 'followed', false)
        },
        setFollowingInProgress: (state,
                                 action: PayloadAction<SetFollowingInProgressActionPayloadType>) => {
            state.followingInProgress = action.payload.isFetching ?
                [...state.followingInProgress, action.payload.userId] :
                [...state.followingInProgress.filter(id => id !== action.payload.userId)]
        },
        setFilter: (state, action: PayloadAction<TFilter>) => {
            state.filter.term = action.payload.term
            state.filter.friend = action.payload.friend
        }
    }
})

export const {
    setUsers,
    setFetching,
    setCurrentPage,
    setTotalUsersCount,
    setFollow,
    setUnfollow,
    setFollowingInProgress,
    setFilter
} = usersSlice.actions

type TThunk = ThunkAction<Promise<void>, AppStateType, unknown, TAction<typeof usersSlice.actions>>


export const requestUsers = (currentPage: number, pageSize: number,
                             term: string, friend: null | boolean): TThunk =>
    async (dispatch) => {
        dispatch(setFetching(true))
        dispatch(setCurrentPage(currentPage))
        dispatch(setFilter({term, friend}))
        let data = await usersAPI.getUsers(currentPage, pageSize, term, friend)
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(setFetching(false))
    }
const followUnfollowFlow = async (dispatch: Dispatch, userId: number,
                                  apiMethod: (userId: number) => Promise<TResponse>,
                                  actionCreator: (userId: number) =>
        TAction<typeof usersSlice.actions>) => {
    dispatch(setFollowingInProgress({userId: userId, isFetching: true}))
    let data = await apiMethod(userId)
    if (data.resultCode === EResultCode.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(setFollowingInProgress({userId: userId, isFetching: false}))
}
export const follow = (userId: number): TThunk => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.follow, setFollow)
    }
}
export const unfollow = (userId: number): TThunk => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollow, setUnfollow)
    }
}

export default usersSlice.reducer