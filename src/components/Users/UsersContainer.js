import React, {useEffect} from "react";
import Users from "./Users";
import {follow, requestUsers, unfollow} from "../../store/usersSlice";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../store/userSelector";

const UsersContainer = ({users, currentPage, pageSize, totalUsersCount,
                            isFetching, requestUsers, follow, unfollow, followingInProgress}) => {

    useEffect(() => {
        requestUsers(currentPage, pageSize)
    }, [currentPage, pageSize])
    const onPageChange = (pageNumber) => {
        requestUsers(pageNumber, pageSize)
    }

    return (
        <Users users={users} currentPage={currentPage} pageSize={pageSize}
               totalUsersCount={totalUsersCount} isFetching={isFetching} onPageChange={onPageChange}
               follow={follow} unfollow={unfollow} followingInProgress={followingInProgress}
        />
    )
}
const mapStateToProps = (state) => ({
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {requestUsers, follow, unfollow}))(UsersContainer);