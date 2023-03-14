import React from "react";
import {NavLink} from "react-router-dom";

const NavbarControl = ({style, icon, element}) => {
    return (
        <div className={style.item}>
            <NavLink to={`/${element.toLowerCase()}`} className={style.link}>
                <img src={icon} alt=""/>
                {element}
            </NavLink>
        </div>
    )
}

export default NavbarControl;