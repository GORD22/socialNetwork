import React from "react";
import emptyUser from "../../../../assets/img/users/user_img_empty.svg";
import style from "./Post.module.css";
const Post = ({postText, likeCount, profile}) => {
    return (
        <div className={style.item}>
            <img src={profile.photos.small || emptyUser} alt=""/>
            {postText}
            <div>like {likeCount}</div>
        </div>
    )
}
export default Post;