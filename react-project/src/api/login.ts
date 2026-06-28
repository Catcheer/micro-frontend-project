import { get, post, del } from '@/utils/request.ts'



export const userLogin = (data: { username: string, password: string }) => {
    return post('/user/login', data)
}

export const userLogout = () => {
    return get('/user/logout')
}