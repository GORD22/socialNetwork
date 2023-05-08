import React, {FC} from "react";
import style from "./Message.module.css";
import cn from "classnames";

type TProps = {
    message: string
    styleMessage?: string
}

const Message: FC<TProps> = ({message, styleMessage}) => {
    return (
        <div className={cn(`${styleMessage}`, style.messages)}>{message}</div>
    )
}

export default Message;
