import { get, post, put, del } from '@/utils/request.ts'

export const getUserList = (data: any) => {
    return post('/user/list', data).then(res => {
        return (res as any).data
    })
}

export const addUser = (data: any) => {
    return post('/user/add', data).then(res => {
        return (res as any).data
    })
}

export const editUser = (id: number, data: any) => {
    return put(`/user/update/${id}`, data).then(res => {
        return (res as any).data
    })
}

export const deleteUser = (id: number) => {
    return del(`/user/delete/${id}`).then(res => {
        return (res as any).data
    })
}
