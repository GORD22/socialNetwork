import {createSlice} from "@reduxjs/toolkit";
import {profileAPI} from "../api/profileAPI";

const initialState = {
    profile: null,
    status: '',
    posts: []
}

const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        addPost: (state, action) => {
            const newPost = {
                id: !state.posts[0] ? 1 : state.posts.length + 1,
                text: action.payload,
                likeCount: 0
            };
            state.posts = [...state.posts, newPost]
        },
        setProfile: (state, action) => {
            state.profile = {...action.payload}
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setPhoto: (state, action) => {
            state.profile.photos = action.payload
        }
    }
})

const {actions, reducer} = profileSlice;

export const {
    addPost,
    setProfile,
    setStatus,
    setPhoto
} = actions;

export const getProfile = (userId) => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(setProfile(data));
}
export const saveProfile = (profileData) => async (dispatch) => {
    const data = await profileAPI.saveProfile(profileData);
    if (data.resultCode === 0) {
        dispatch(getProfile(profileData.userId))
    }
}
export const getStatus = (userId) => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
}
export const updateStatus = (status) => async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (imgFile) => async (dispatch) => {
    const data = await profileAPI.savePhoto(imgFile)
    if (data.resultCode === 0) {
        dispatch(setPhoto(data.data.photos))
    }
}

export default reducer;