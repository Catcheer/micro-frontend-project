import { get } from '@/utils/request.ts'





export const getStudentList = (params: PageParam) => {
    return get('/students', params).then(res => {
        return res.data
    })
}


