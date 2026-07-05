import { get } from '@/utils/request.ts'

export const getSubjectList = () => {
    return get('/subjects').then(res => {
        return res.data
    })
}

