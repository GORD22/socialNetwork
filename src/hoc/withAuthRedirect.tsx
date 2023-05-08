import React, {ComponentType, FC} from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../store/store";


const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type TMapStateToProps = {
    isAuth: boolean
}
type TMapDispatchToProps = {}

export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {

    const RedirectComponent: FC<TMapStateToProps & TMapDispatchToProps> = (props) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Navigate to={"/login"} />
        }
        // @ts-ignore
        return <WrappedComponent {...restProps as WCP}/>
    }

    const ConnectAuthRedirectComponent = connect<TMapStateToProps, TMapDispatchToProps, WCP, AppStateType>
        (mapStateToPropsForRedirect, {})
    (RedirectComponent);

    return ConnectAuthRedirectComponent;
}
