import React from "react";
import style from "./Header.module.css";
import emblem from "../../assets/img/emblem.svg"
import {NavLink} from "react-router-dom";

const Header = ({isAuth, login, logout}) => {
    return (
        <header className={style.header}>
            <div className={style.content}>
                <img className={style.emblem} src={emblem} alt=""/>
                <div className={style.authBlock}>
                    {
                        isAuth ?
                            <input onClick={logout} className={style.auth} type={"button"} value={login}/> :
                            <NavLink to={"/login"} className={style.auth}>Login</NavLink>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;