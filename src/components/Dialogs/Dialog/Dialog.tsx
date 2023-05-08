import style from "./Dialog.module.css";
import React, {FC} from "react";

type TProps = {
    name: string
}

const Dialog: FC<TProps> = ({name}) => {
    return (
        <div className={style.dialogs}>{name}</div>
    )
}

export default Dialog;