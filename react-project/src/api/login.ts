import { get, post, put } from '@/utils/request.ts'

export const userLogin = (data: { username: string, password: string }) => {
    return post('/user/login', data)
}

export const userRefreshToken = (refreshToken: string) => {
    return post('/user/refresh', { refreshToken })
}

export const userLogout = () => {
    return get('/user/logout')
}

export const uploadAvatar = (data: FormData) => {
    return post('/user/upload/avatar', data)
}

export const updateUserInfo = (data: { nickname?: string; phone?: string; email?: string }) => {
    return put('/user/update', data)
}