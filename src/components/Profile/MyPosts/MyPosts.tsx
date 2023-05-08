import React, {FC, memo} from "react";
import Post from "./Post/Post";
import MyPostsForm from "./MyPostsForm";
import {PostType, ProfileType} from "../../../types/types";

type PropsType = {
    posts: Array<PostType>
    profile: ProfileType | null
    addPosts: (postText: string) => void
}

const MyPosts: FC<PropsType> = ({posts, profile, addPosts}) => {
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

export default memo(MyPosts);
