export type PhotosType = {
    small: string | null,
    large: string | null
}

export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}

export type PostType = {
    id: number,
    text: string,
    likeCount: number
}

export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    aboutMe: string,
    contacts: ContactsType,
    photos: PhotosType
}

export type UserType = {
    name: string,
    id: number,
    photos: PhotosType,
    status: string,
    followed: boolean
}

export type LoginDataType = {
    email: string | null,
    password: string | null
    rememberMe: boolean,
    captcha: string
}

export type MessagesType = {
    id: number,
    message: string
}

export type DialogsType = {
    id: number,
    name: string
}

export type TFilter = {
    term: string,
    friend: boolean | null
}