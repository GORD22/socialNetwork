import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../store/authSlice";

const HeaderContainer = ({isAuth, login, logout}) => {
    return (
        <Header isAuth={isAuth} login={login} logout={logout}/>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    logout: state.auth.logout
})

export default connect(mapStateToProps, {logout})(HeaderContainer);