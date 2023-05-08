import React, {FC} from "react";
import style from "./Post.module.css";
import {ProfileType} from "../../../../types/types";
const emptyUser: string = require("../../../../assets/img/users/user_img_empty.svg");

type PropsType = {
    postText: string
    likeCount: number
    profile: ProfileType | null
}
const Post: FC<PropsType> = ({postText, likeCount, profile}) => {
    return (
        <div className={style.item}>
            {
                profile && <img src={profile.photos.small || emptyUser} alt=""/>
            }
            {postText}
            <div>like {likeCount}</div>
        </div>
    )
}
export default Post;