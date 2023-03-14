import {instance} from "./api";


export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status) {
        return instance.put('profile/status', {status})
            .then(response => response.data)
    },
    savePhoto(imgFile) {
        const formData = new FormData();
        formData.append('imgFile', imgFile);
        return instance.put('profile/photo', formData)
            .then(response => response.data)
    },
    saveProfile(profile) {
        return instance.put('profile', profile)
            .then(response => response.data)
    }
}