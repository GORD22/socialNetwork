import React, {FC} from "react";
import {NavLink} from "react-router-dom";

type TStyle = {
    item: string
    link: string
}

type TProps = {
    style: TStyle
    icon: string
    element: string
}

const NavbarControl: FC<TProps> = ({style, icon, element}) => {
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