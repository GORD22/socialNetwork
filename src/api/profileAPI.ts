import {instance, TResponse} from "./api";
import {PhotosType, ProfileType} from "../types/types";

type TPhotoResponse = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<TResponse>('profile/status', {status})
            .then(response => response.data)
    },
    savePhoto(imgFile: File) {
        const formData = new FormData();
        formData.append('imgFile', imgFile);
        return instance.put<TResponse<TPhotoResponse>>('profile/photo', formData)
            .then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<TResponse>('profile', profile)
            .then(response => response.data)
    }
}