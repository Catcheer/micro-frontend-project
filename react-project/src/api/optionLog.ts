import { get, post, del } from '@/utils/request.ts'



export const getOptionLogList = (data: PageParam) => {
    return post('/operationLog/list', data).then(res => {
        return res.data
    })
}