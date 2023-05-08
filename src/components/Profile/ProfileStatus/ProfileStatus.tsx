import React, {FC, useEffect, useState} from "react";
import style from "./ProfileStatus.module.css";
import {useDispatch, useSelector} from 'react-redux'
import {getProfileStatus} from '../../../store/profileSelector'
import {AppDispatch} from '../../../store/store'
import { updateStatus } from "../../../store/profileSlice";

type TProps = {
    isOwner: boolean
}

const ProfileStatus: FC<TProps> = ({isOwner}) => {
    const dispatch: AppDispatch = useDispatch()

    const status = useSelector(getProfileStatus)
    const [editMode, setEditMode] = useState(false);
    const [newStatus, setNewStatus] = useState(status);

    useEffect(() => {
        setNewStatus(status)
    }, [status])

    const editModeActivate = () => {
        setEditMode(true)
    }
    const changeStatus = (e: React.FormEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }
    const editModeDisable = () => {
        setEditMode(false);
        dispatch(updateStatus(newStatus));
    }
    return (
        <div className={style.status}>
            {
                !isOwner ? <div><b>Status: </b>{status}</div> :
                !editMode ?
                    <div onDoubleClick={editModeActivate}>
                        <b>Status: </b>{status}
                    </div> :
                    <div><input placeholder={'Change your status'} autoFocus={true} onChange={changeStatus}
                                onBlur={editModeDisable} value={newStatus}/></div>
            }
        </div>
    )
}

export default ProfileStatus;