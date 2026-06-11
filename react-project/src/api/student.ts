import { get, post, del } from '@/utils/request.ts'





export const getStudentList = (data: PageParam) => {
    return post('/students', data).then(res => {
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


export const uploadExcel = (data: FormData) => {
    return post('/uploadExcel', data).then(res => {
        return res.data
    })
}


export const getExcel = (data: PageParam) => {
    return post('/students/export', data,{
        responseType: 'blob'
    }).then(res => {
        return res.data
    })
}



export const getClassList = () => {
    return get('/class/get').then(res => {
        console.log('res---',res)
        return res.data
    })
}