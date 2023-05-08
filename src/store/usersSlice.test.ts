import {UserType} from '../types/types'
import usersReducer, {setFollow, setUnfollow} from './usersSlice'

let state = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    currentPage: 1,
    pageSize: 10,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users id
    filter: {
        term: '',
        friend: null
    }
}

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'user 0', followed: false, photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 1, name: 'user 1', followed: false, photos: {small: null, large: null}, status: 'status 1'
            },
            {
                id: 2, name: 'user 2', followed: true, photos: {small: null, large: null}, status: 'status 2'
            },
            {
                id: 3, name: 'user 3', followed: true, photos: {small: null, large: null}, status: 'status 3'
            }
        ],
        totalUsersCount: 0,
        currentPage: 1,
        pageSize: 10,
        isFetching: false,
        followingInProgress: [] as Array<number>,
        filter: {
            term: '',
            friend: null
        }
    }
})

test('follow success', () => {

    const newState = usersReducer(state, setFollow(1))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();

})

test('unfollow success', () => {

    const newState = usersReducer(state, setUnfollow(3))

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();

})
