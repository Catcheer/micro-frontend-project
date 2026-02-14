import { get, post, del } from '@/utils/request.ts'





export const getStudentList = (params: PageParam) => {
    return get('/students', params).then(res => {
        return res.data
    })
}


export const addStudent = (data: any) => {
    return post('/addStudent', data).then(res => {
        return res.data
    })
}


export const editStudent = (data: any) => {
    return post('/updateStudent', data).then(res => {
        return res.data
    })
}


export const deleteStudent = (id: number) => {
    return del(`/delStudent/${id}`).then(res => {
        return res.data
    })
}