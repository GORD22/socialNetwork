import React, {ChangeEvent, FC, useState} from 'react'
import style from './ProfileInfo.module.css'
import ProfileStatus from '../ProfileStatus/ProfileStatus'
import ProfileInfoForm from './ProfileInfoForm'
import {ContactsType, ProfileType} from '../../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {getProfileStatus} from '../../../store/profileSelector'
import {AppDispatch} from '../../../store/store'
import { savePhoto } from '../../../store/profileSlice'

const emptyUserImg: string = require('../../../assets/img/users/user_img_empty.svg')

type ContactType = {
    contactTitle: string
    contactValue: string
}

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
}

const Contact: FC<ContactType> = ({contactTitle, contactValue}) => {
    return (
        <div>
            <b>{contactTitle}: </b> {contactValue}
        </div>
    )
}

const ProfileInfo: FC<PropsType> = ({profile, isOwner}) => {
    const dispatch: AppDispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)

    const saveNewPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }
    return (
        <div className={style.profileInfo}>
            {
                profile &&
                <img src={profile.photos.large || emptyUserImg} alt=""/>
            }
            {
                isOwner && <div><input type={'file'} onChange={saveNewPhoto}/></div>
            }
            <ProfileStatus isOwner={isOwner}/>
            {
                !editMode &&
                <div>
                    {
                        isOwner &&
                        <button onClick={() => setEditMode(true)}>Edit information</button>
                    }
                    {
                        profile &&
                        <>
                            <div>
                                <b>Name: </b> {profile.fullName}
                            </div>
                            <div>
                                <b>Search job status: </b> {profile.lookingForAJobDescription}
                            </div>
                            <div>
                                <b>About me: </b> {profile.aboutMe}
                            </div>
                            {
                                Object.keys(profile.contacts).map(key =>
                                    <Contact key={key} contactTitle={key}
                                             contactValue={profile.contacts[key as keyof ContactsType]}/>
                                )
                            }
                        </>
                    }


                </div>
            }

            {
                editMode && <ProfileInfoForm profile={profile} setEditMode={setEditMode}/>
            }
        </div>
    )
}

export default ProfileInfo