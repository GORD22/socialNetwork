import React, {FC, useEffect, useState} from "react";
import cn from "classnames";
import style from "./Paginator.module.css";
const arrow_right: string = require("../../../assets/img/users/arrow_righ.svg").default;
const arrow_left: string = require("../../../assets/img/users/arrow_left.svg").default;

type PropsType = {
    totalElementsCount: number
    currentPage: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
    portionSize?: number
}

const Paginator: FC<PropsType> = ({totalElementsCount, currentPage,
                                      pageSize, onPageChange, portionSize = 10}) => {

    const pagesCount = Math.ceil(totalElementsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const currentPortion = Math.ceil(currentPage / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    useEffect(() => {
        setPortionNumber(currentPortion)
    }, [currentPortion]);
    const leftPortionNumber = portionNumber * portionSize - portionSize + 1;
    const rightPortionNumber = portionNumber * portionSize;

    return <div className = {style.paginator}>
            {
                portionNumber > 1 &&
                <button className={style.button}
                        onClick={() => setPortionNumber(portionNumber - 1)}>
                    <img className={style.arrow} src={arrow_left} alt="prev"/>
                </button>
            }
            {
                pages
                    .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                    .map(p =>
                        <span className={currentPage === p ? cn(style.page, style.pageActive) : style.page} key={p}
                              onClick={() => onPageChange(p)}>{p}</span>)
            }
            {
                portionCount > portionNumber &&
                <button className={style.button}
                        onClick={() => setPortionNumber(portionNumber + 1)}>
                    <img className={style.arrow} src={arrow_right} alt="next"/>
                </button>
            }
        </div>
}

export default Paginator;