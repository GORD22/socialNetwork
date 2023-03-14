import React, {useState} from "react";
import style from "./ProfileInfo.module.css";
import emptyUserImg from "../../../assets/img/users/user_img_empty.svg";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import ProfileInfoForm from "./ProfileInfoForm";

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div>
            <b>{contactTitle}: </b> {contactValue}
        </div>
    )
}

const ProfileInfo = ({profile, isOwner, savePhoto, status, updateStatus, saveProfile}) => {
    const [editMode, setEditMode] = useState(false);
    const saveNewPhoto = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={style.profileInfo}>
            <img src={profile.photos.large || emptyUserImg} alt=""/>
            {
                isOwner && <div><input type={"file"} onChange={saveNewPhoto}/></div>
            }
            <ProfileStatus status={status} updateStatus={updateStatus}/>

            {
                !editMode &&
                <div>
                    {
                        isOwner &&
                        <button onClick={() => setEditMode(true)}>Edit information</button>
                    }
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
                            <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                        )
                    }
                </div>
            }

            {
                editMode && <ProfileInfoForm profile={profile} saveProfile={saveProfile} setEditMode={setEditMode}/>
            }
        </div>
    )
}

export default ProfileInfo;