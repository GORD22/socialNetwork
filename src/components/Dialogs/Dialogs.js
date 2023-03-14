import React from "react";
import style from "./Dialogs.module.css";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import DialogsForm from "./DialogsForm";

const Dialogs = ({userMessages, otherUserMessage, addMessage, dialogs}) => {
    const userMessageElement = userMessages.map(m =>
        <Message key={m.id} message={m.message} styleMessage={style.userMessage}/>
    )
    const otherUserMessageElement = otherUserMessage.map(m =>
        <Message key={m.id} message={m.message}/>
    )
    const dialogElement = dialogs.map(d =>
        <Dialog key={d.id} name={d.name}/>
    )

    return (
        <div className={style.dialogsPage}>
            <div className={style.messageContent}>
                {otherUserMessageElement}
                {userMessageElement}
                <DialogsForm addMessage={addMessage}/>
            </div>
            <div className={style.dialogsContent}>
                {dialogElement}
            </div>
        </div>
    )
}

export default Dialogs;