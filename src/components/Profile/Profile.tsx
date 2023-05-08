import React, {FC, useEffect} from 'react'
import style from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../common/Preloader/Preloader'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {useDispatch, useSelector} from 'react-redux'
import {getProfileInfo} from '../../store/profileSelector'
import {getUserId} from '../../store/authSelector'
import {useParams} from 'react-router-dom'
import {AppDispatch} from '../../store/store'
import {getProfile, getStatus} from '../../store/profileSlice'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

const Profile: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const userId = useSelector(getUserId)
    const profile = useSelector(getProfileInfo)
    const params = useParams()

    const refreshProfile = () => {
        let profileId = Number(params.userId) || null
        if (!profileId) {
            profileId = userId
        }
        if (profileId) {
            dispatch(getProfile(profileId))
            dispatch(getStatus(profileId))
        }
    }

    useEffect(() => {
        refreshProfile()
    }, [params, userId])

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={style.profile}>
            <ProfileInfo profile={profile} isOwner={Number(params.userId) === userId || !params.userId}/>
            <MyPostsContainer/>
        </div>
    )
}

export default withAuthRedirect(Profile);