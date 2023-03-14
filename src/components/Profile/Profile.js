import React from "react";
import style from "./Profile.module.css"
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({status, profile, updateStatus, savePhoto, isOwner, saveProfile}) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={style.profile}>
            <ProfileInfo savePhoto={savePhoto} profile={profile} isOwner={isOwner}
                         status={status} updateStatus={updateStatus} saveProfile={saveProfile}
            />

            <MyPostsContainer/>
        </div>
    )
}

export default Profile;