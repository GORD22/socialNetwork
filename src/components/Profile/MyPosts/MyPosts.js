import React from "react";
import Post from "./Post/Post";
import MyPostsForm from "./MyPostsForm";

const MyPosts = ({posts, profile, addPosts}) => {
    const postElement = posts.map(p =>
        <Post key={p.id} postText={p.text} profile={profile} likeCount={p.likeCount}/>
    )
    return (
        <>
            <div>
                My post
            </div>
            <MyPostsForm addPosts={addPosts}/>
            {postElement}
        </>
    )
}

export default MyPosts;
