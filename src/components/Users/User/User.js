import React from "react";
import emptyIcon from "../../../assets/img/users/user_img_empty.svg";
import style from "./User.module.css";
import {NavLink} from "react-router-dom";

const User = ({user, follow, unfollow, followingInProgress}) => {
    return (
        <div key={user.id} className={style.user}>
            <NavLink to={`/profile/${user.id}`}>
                <img src={!user.photos.small ? emptyIcon : user.photos.small} alt=""
                     className={style.img}/>
            </NavLink>
            <div>{user.name}</div>
            <div>{user.status}</div>
            {
                !user.followed ?
                    <button onClick={() => follow(user.id)}
                            disabled={followingInProgress.some(id => id === user.id)}>Follow</button> :
                    <button onClick={() => unfollow(user.id)}
                            disabled={followingInProgress.some(id => id === user.id)}>Unfollow</button>
            }

        </div>
    )
}

export default User;