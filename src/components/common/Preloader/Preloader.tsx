import React from "react";
import style from "./Preloader.module.css";
const preload: string = require("../../../assets/img/Preloader/loading.svg").default

const Preloader = () => {
    return (
        <div className={style.preloader}>
            <img src={preload} alt=""/>
        </div>
    )
}

export default Preloader;