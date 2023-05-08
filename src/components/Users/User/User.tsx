import React, {FC} from "react";
import style from "./User.module.css";
import {NavLink} from "react-router-dom";
import {UserType} from "../../../types/types";
import {useDispatch, useSelector} from 'react-redux'
import { follow, unfollow } from "../../../store/usersSlice";
import {AppDispatch} from '../../../store/store'
import {getFollowingInProgress} from '../../../store/userSelector'
const emptyIcon: string = require("../../../assets/img/users/user_img_empty.svg").default;

type PropsType = {
    user: UserType
}

const User: FC<PropsType> = ({user}) => {
    const dispatch: AppDispatch = useDispatch()

    const followingInProgress = useSelector(getFollowingInProgress)
    const onFollow = () => {
       dispatch(follow(user.id))
    }
    const onUnfollow = () => {
        dispatch(unfollow(user.id))
    }

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
                    <button onClick={onFollow}
                            disabled={followingInProgress.some(id => id === user.id)}>Follow</button> :
                    <button onClick={onUnfollow}
                            disabled={followingInProgress.some(id => id === user.id)}>Unfollow</button>
            }

        </div>
    )
}

export default User;