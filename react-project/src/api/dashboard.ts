
import { get } from '@/utils/request.ts'

export const dashboardOverview = async () => {
    return get('/dashboard/overview').then(res => {
        return res.data
    })
}


export const studentStatistics = async () => {
    return get('/dashboard/studentStatistics').then(res => {
        return res.data
    })
}