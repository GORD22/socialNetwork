import style from "./Dialog.module.css";
import React from "react";
const Dialog = ({name}) => {
    return (
        <div className={style.dialogs}>{name}</div>
    )
}

export default Dialog;