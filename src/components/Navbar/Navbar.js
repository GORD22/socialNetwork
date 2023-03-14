import React from "react";
import style from "./Navbar.module.css"
import profile_icon from "../../assets/img/navbar/profile_icon.svg";
import news_icon from "../../assets/img/navbar/news_icon.svg";
import dialogs_icon from "../../assets/img/navbar/dialogs_icon.svg";
import users_icon from "../../assets/img/navbar/users_icon.svg";
import music_icon from "../../assets/img/navbar/music_icon.svg";
import settings_icon from "../../assets/img/navbar/settings_icon.svg";
import NavbarControl from "../common/NavbarControl/NavbarControl";

const Navbar = () => {
    return (
        <div className={style.navbar}>
            <NavbarControl style={style} icon={profile_icon} element={"Profile"}/>
            <NavbarControl style={style} icon={news_icon} element={"News"}/>
            <NavbarControl style={style} icon={dialogs_icon} element={"Messages"}/>
            <NavbarControl style={style} icon={users_icon} element={"Users"}/>
            <NavbarControl style={style} icon={music_icon} element={"Music"}/>
            <NavbarControl style={style} icon={settings_icon} element={"Settings"}/>
        </div>
    )
}

export default Navbar;