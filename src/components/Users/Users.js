import React from "react";
import User from "./User/User";
import Paginator from "../common/Paginator/Paginator";
import Preloader from "../common/Preloader/Preloader";

const Users = ({users, currentPage, pageSize, totalUsersCount,
                   isFetching, onPageChange, follow, unfollow, followingInProgress}) => {

    return (
        <div>
            <Paginator totalElementsCount={totalUsersCount} currentPage={currentPage}
                       pageSize={pageSize} onPageChange={onPageChange}
            />
            {
                isFetching ? <Preloader/> : users.map(u =>
                    <User key={u.id} user={u}
                          follow={follow} unfollow={unfollow} followingInProgress={followingInProgress}/>
                )
            }
        </div>
    )
}

export default Users;