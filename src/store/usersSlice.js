import {createSlice} from "@reduxjs/toolkit";
import {usersAPI} from "../api/usersAPI";
import {objectHelper} from "../utils/objectHelper";

const initialState = {
    users: [],
    totalUsersCount: 0,
    currentPage: 1,
    pageSize: 10,
    isFetching: false,
    followingInProgress: [],
}

const usersSlice = createSlice({
    name: "usersSlice",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = [...action.payload]
        },
        setFetching: (state, action) => {
            state.isFetching = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setTotalUsersCount: (state, action) => {
            state.totalUsersCount = action.payload
        },
        setFollow: (state, action) => {
            objectHelper(state.users, "id", action.payload, "followed", true)
        },
        setUnfollow: (state, action) => {
            objectHelper(state.users, "id", action.payload, "followed", false)
        },
        setFollowingInProgress: (state, action) => {
            state.followingInProgress = action.payload.isFetching ?
                [...state.followingInProgress, action.payload.userId] :
                [...state.followingInProgress.filter(id => id !== action.payload.userId)]
        }
    }
})

const {actions, reducer} = usersSlice;

const {
    setUsers,
    setFetching,
    setCurrentPage,
    setTotalUsersCount,
    setFollow,
    setUnfollow,
    setFollowingInProgress
} = actions;

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setFetching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setFetching(false));
}
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(setFollowingInProgress({userId: userId, isFetching: true}))
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(setFollowingInProgress({userId: userId, isFetching: false}))
}
export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow, setFollow);
    }
}
export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow, setUnfollow)
    }
}


export default reducer;