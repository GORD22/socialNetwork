import {instance, TResponse} from "./api";
import {UserType} from "../types/types";

type TUsersResponse = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = '', friend: null | boolean = null) {
        return instance.get<TUsersResponse>(
            `users?page=${currentPage}&count=${pageSize}` + (term === '' ? '' : `&term=${term}`)  +
            (friend === null ? '' : `&friend=${friend}`)
        )
            .then(response => response.data)
    },
    follow(userId: number) {
      return instance.post<TResponse>(`follow/${userId}`)
          .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<TResponse>(`follow/${userId}`)
            .then(response => response.data)
    }
}