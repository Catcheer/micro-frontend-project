import { post, put, del } from '@/utils/request.ts'

export const getPermissionList = (data: any) => {
    return post('/permission/list', data).then(res => {
        return (res as any).data
    })
}

export const addPermission = (data: any) => {
    return post('/permission/add', data).then(res => {
        return (res as any).data
    })
}

export const editPermission = (id: number, data: any) => {
    return put(`/permission/update/${id}`, data).then(res => {
        return (res as any).data
    })
}

export const deletePermission = (id: number) => {
    return del(`/permission/delete/${id}`).then(res => {
        return (res as any).data
    })
}
