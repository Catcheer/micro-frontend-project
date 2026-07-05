import { get, post, del } from '@/utils/request.ts'





export const getClassList = (data: PageParam) => {
    return post('/classes', data).then(res => {
        return res.data
    })
}


export const addClass = (data: any) => {
    return post('/addClass', data).then(res => {
        return res.data
    })
}


export const editClass = (data: any) => {
    return post('/updateClass', data).then(res => {
        return res.data
    })
}


export const deleteClass = (id: number) => {
    return del(`/delClass/${id}`).then(res => {
        return res.data
    })
}









