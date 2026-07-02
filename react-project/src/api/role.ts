import { get, post, put, del } from '@/utils/request.ts'

export const getRoleList = (data: any) => {
    return post('/role/list', data).then(res => {
        return (res as any).data
    })
}

export const addRole = (data: any) => {
    return post('/role/add', data).then(res => {
        return (res as any).data
    })
}

export const editRole = (id: number, data: any) => {
    return put(`/role/update/${id}`, data).then(res => {
        return (res as any).data
    })
}

export const deleteRole = (id: number) => {
    return del(`/role/delete/${id}`).then(res => {
        return (res as any).data
    })
}
