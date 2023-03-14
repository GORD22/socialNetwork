import React from "react";
import preload from "../../../assets/img/Preloader/loading.svg";
import style from "./Preloader.module.css";
const Preloader = () => {
    return (
        <div className={style.preloader}>
            <img src={preload} alt=""/>
        </div>
    )
}

export default Preloader;