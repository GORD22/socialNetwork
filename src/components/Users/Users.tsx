import React, {FC, useEffect} from 'react'
import User from './User/User'
import Paginator from '../common/Paginator/Paginator'
import Preloader from '../common/Preloader/Preloader'
import UsersSearchForm from './UsersSearchForm'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getFriendOfFilter,
    getIsFetching,
    getPageSize,
    getTermOfFilter,
    getTotalUsersCount,
    getUsers
} from '../../store/userSelector'
import {requestUsers} from '../../store/usersSlice'
import {AppDispatch} from '../../store/store'
import {useLocation, useNavigate} from 'react-router-dom'
import queryString from 'qs'

const Users: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const users = useSelector(getUsers)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const isFetching = useSelector(getIsFetching)
    const term = useSelector(getTermOfFilter)
    const friend = useSelector(getFriendOfFilter)

    useEffect(() => {
        const parsed = queryString.parse(location.search.substring(1))

        const actuallyRequestParams = {
            page: parsed.page ? Number(parsed.page) : currentPage,
            term: parsed.term ? String(parsed.term) : term,
            friend: parsed.friend ? (parsed.friend === 'null' ? null : parsed.friend === 'true') : friend
        }

        dispatch(requestUsers(actuallyRequestParams.page, pageSize,
            actuallyRequestParams.term, actuallyRequestParams.friend))
    }, [])

    useEffect(() => {
        const query: {page?: string, term?: string, friend?: string} = {}

        if (currentPage !== 1) query.page = `${currentPage}`
        if (term) query.term = term
        if (friend !== null) query.friend = `${friend}`

        navigate({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [currentPage, term, friend])
    const onPageChange = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, term, friend))
    }

    return (
        <div>
            <UsersSearchForm pageSize={pageSize} term={term} friend={friend}/>
            <Paginator totalElementsCount={totalUsersCount} currentPage={currentPage}
                       pageSize={pageSize} onPageChange={onPageChange}
            />
            {
                isFetching ? <Preloader/> : users.map(u =>
                    <User key={u.id} user={u}/>
                )
            }
        </div>
    )
}

export default Users;