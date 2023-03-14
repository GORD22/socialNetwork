import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessage} from "../../store/dialogsSlice";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const DialogsContainer = ({userMessages, otherUserMessage, addMessage, dialogs}) => {
    return (
        <Dialogs userMessages={userMessages}
                 otherUserMessage={otherUserMessage}
                 addMessage={addMessage}
                 dialogs={dialogs}/>
    )
}
const mapStateToProps = (state) => ({
    userMessages: state.dialogs.userMessages,
    otherUserMessage: state.dialogs.otherUserMessage,
    dialogs: state.dialogs.dialogs
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {addMessage}))(DialogsContainer);