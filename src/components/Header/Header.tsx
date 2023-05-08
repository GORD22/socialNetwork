import React, {FC} from "react";
import style from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {AppDispatch} from '../../store/store'
import {useDispatch, useSelector} from 'react-redux'
import {getIsAuth, getLogin} from '../../store/authSelector'
import { logout } from "../../store/authSlice";
const emblem: string = require("../../assets/img/emblem.svg").default

const Header: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <header className={style.header}>
            <div className={style.content}>
                <img className={style.emblem} src={emblem} alt=""/>
                <div className={style.authBlock}>
                    {
                        isAuth ?
                            <input onClick={onLogout} className={style.auth}
                                   type={"button"} value={login ? login: undefined}/> :
                            <NavLink to={"/login"} className={style.auth}>Login</NavLink>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;