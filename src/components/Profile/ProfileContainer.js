import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from "../../store/profileSlice";
import {useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const ProfileContainer = (props) => {
    const params = useParams();
    const refreshProfile = () => {
        let userId = params.userId;
        if (!userId) {
            userId = props.userId;
        }
        props.getProfile(userId);
        props.getStatus(userId);
    }

    useEffect(() => {
        refreshProfile();
    }, [params, props.userId])

    return (
        <Profile status={props.status} profile={props.profile} isOwner={!params.userId}
                 savePhoto={props.savePhoto} updateStatus={props.updateStatus} saveProfile={props.saveProfile}/>
    )
}

const mapStateToProps = (state) => ({
    status: state.profile.status,
    userId: state.auth.userId,
    profile: state.profile.profile
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        getProfile, getStatus, updateStatus,
        savePhoto, saveProfile
    }))(ProfileContainer);