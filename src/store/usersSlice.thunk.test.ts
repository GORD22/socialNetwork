import {follow, setFollow, setFollowingInProgress, setUnfollow, unfollow} from './usersSlice'
import {usersAPI} from '../api/usersAPI'
import {EResultCode, TResponse} from '../api/api'

jest.mock('../api/usersAPI')
const usersApiMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: TResponse = {
    resultCode: EResultCode.Success,
    message: [],
    data: {}
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

test('success follow thunk', async () => {

    usersApiMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setFollowingInProgress({userId: 1, isFetching: true}))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setFollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setFollowingInProgress({userId: 1, isFetching: false}))
})

test('success unfollow thunk', async () => {

    usersApiMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setFollowingInProgress({userId: 1, isFetching: true}))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setUnfollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setFollowingInProgress({userId: 1, isFetching: false}))
})