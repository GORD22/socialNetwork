import React, {FC} from "react";
import style from "./Dialogs.module.css";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import DialogsForm from "./DialogsForm";
import {DialogsType, MessagesType} from "../../types/types";
import {useSelector} from 'react-redux'
import {getDialogs, getOtherUserMessages, getUserMessages} from '../../store/dialogsSelector'

const Dialogs: FC = () => {

    const userMessages = useSelector(getUserMessages)
    const otherUserMessages = useSelector(getOtherUserMessages)
    const dialogs = useSelector(getDialogs)

    const userMessageElement = userMessages.map(m =>
        <Message key={m.id} message={m.message} styleMessage={style.userMessage}/>
    )
    const otherUserMessageElement = otherUserMessages.map(m =>
        <Message key={m.id} message={m.message}/>
    )
    const dialogElement = dialogs.map(d =>
        <Dialog key={d.id} name={d.name}/>
    )

    return (
        <div className={style.dialogsPage}>
            <div>
                {otherUserMessageElement}
                {userMessageElement}
                <DialogsForm/>
            </div>
            <div className={style.dialogsContent}>
                {dialogElement}
            </div>
        </div>
    )
}

export default Dialogs;