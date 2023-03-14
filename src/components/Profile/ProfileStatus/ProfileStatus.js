import React, {useEffect, useState} from "react";
import style from "./ProfileStatus.module.css";
const ProfileStatus = ({status, updateStatus}) => {
    const [editMode, setEditMode] = useState(false);
    const [newStatus, setNewStatus] = useState(status);

    useEffect(() => {
        setNewStatus(status)
    }, [status])

    const editModeActivate = () => {
        setEditMode(true)
    }
    const changeStatus = (e) => {
        setNewStatus(e.currentTarget.value)
    }
    const editModeDisable = () => {
        setEditMode(false);
        updateStatus(newStatus);
    }
    return (
        <div className={style.status}>
            {
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