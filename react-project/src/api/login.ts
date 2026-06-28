import { get, post } from '@/utils/request.ts'

export const userLogin = (data: { username: string, password: string }) => {
    return post('/user/login', data)
}

export const userRefreshToken = (refreshToken: string) => {
    return post('/user/refresh', { refreshToken })
}

export const userLogout = () => {
    return get('/user/logout')
}