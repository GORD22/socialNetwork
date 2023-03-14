import React from "react";
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../store/authSlice";

const LoginContainer = ({isAuth, captcha,login}) => {
    return (
        <LoginForm isAuth={isAuth} captcha={captcha} login={login}/>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(LoginContainer);