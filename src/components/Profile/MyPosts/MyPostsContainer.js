import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPost} from "../../../store/profileSlice";

const MyPostsContainer = ({posts, profile, addPost}) => {
    return (
        <MyPosts posts={posts} profile={profile} addPosts={addPost}/>
    )
}
const mapStateToProps = (state) => ({
    posts: state.profile.posts,
    profile: state.profile.profile
})

export default connect(mapStateToProps,{addPost})(MyPostsContainer);
