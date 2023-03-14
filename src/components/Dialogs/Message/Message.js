import React from "react";
import style from "./Message.module.css";
import cn from "classnames";

const Message = ({message, styleMessage}) => {
    return (
        <div className={cn(`${styleMessage}`, style.messages)}>{message}</div>
    )
}

export default Message;
