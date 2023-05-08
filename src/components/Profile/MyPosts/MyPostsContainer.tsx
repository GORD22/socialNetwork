import React, {FC} from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPost} from "../../../store/profileSlice";
import {PostType, ProfileType} from "../../../types/types";
import {AppStateType} from "../../../store/store";

type MapStateToPropsType = {
    posts: Array<PostType>
    profile: ProfileType | null
}

type MapDispatchToPropsType = {
    addPost: (postText: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const MyPostsContainer: FC<PropsType> = ({posts, profile, addPost}) => {
    return (
        <MyPosts posts={posts} profile={profile} addPosts={addPost}/>
    )
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    posts: state.profile.posts,
    profile: state.profile.profile
})

export default connect(mapStateToProps,{addPost})(MyPostsContainer);