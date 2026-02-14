import { get, post } from '@/utils/request.ts'





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

