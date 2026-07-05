import { get, post, del } from '@/utils/request.ts'



export const allTeacherList = () => {
    return get('/teacher/get').then(res => {
        return res.data
    })
}


export const getTeacherList = (data: PageParam) => {
    return post('/teachers', data).then(res => {
        return res.data
    })
}


export const addTeacher = (data: any) => {
    return post('/addTeacher', data).then(res => {
        return res.data
    })
}


export const editTeacher = (data: any) => {
    return post('/updateTeacher', data).then(res => {
        return res.data
    })
}


export const deleteTeacher = (id: number) => {
    return del(`/delTeacher/${id}`).then(res => {
        return res.data
    })
}









