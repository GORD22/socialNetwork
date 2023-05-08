import {createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {profileAPI} from "../api/profileAPI";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {AppStateType, TAction} from "./store";
import {EResultCode} from "../api/api";


const initialState = {
    profile: null as ProfileType | null,
    status: '',
    posts: [] as Array<PostType>
}

const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<string>) => {
            const newPost: PostType = {
                id: !state.posts[0] ? 1 : state.posts.length + 1,
                text: action.payload,
                likeCount: 0
            };
            state.posts = [...state.posts, newPost]
        },
        setProfile: (state, action: PayloadAction<ProfileType>) => {
            state.profile = {...action.payload}
        },
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload
        },
        setPhoto: (state, action: PayloadAction<PhotosType>) => {
            if (state.profile) state.profile.photos = action.payload
        }
    }
})


export const {
    addPost,
    setProfile,
    setStatus,
    setPhoto
} = profileSlice.actions;

type TThunk = ThunkAction<Promise<void>, AppStateType, unknown, TAction<typeof profileSlice.actions>>
export const getProfile = (userId: number): TThunk => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(setProfile(data));
}
export const saveProfile = (profileData: ProfileType): TThunk => async (dispatch,getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profileData);
    if (data.resultCode === EResultCode.Success) {
        if (userId !== null) {
            await dispatch(getProfile(userId))
        }
    }
}
export const getStatus = (userId: number): TThunk => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
}
export const updateStatus = (status: string): TThunk => async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === EResultCode.Success) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (imgFile: File): TThunk => async (dispatch) => {
    const data = await profileAPI.savePhoto(imgFile)
    if (data.resultCode === EResultCode.Success) {
        dispatch(setPhoto(data.data.photos))
    }
}

export default profileSlice.reducer;