import axios from 'axios'
import { router } from '@/routes/router'

const service = axios.create({
    baseURL: '/api',
    timeout: 15000,
})

//axios 设置接口返回的status
service.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300 || status === 400
}


// 请求拦截
service.interceptors.request.use(
    config => {

        // 示例：自动带 token
        const token = localStorage.getItem('token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    error => Promise.reject(error)
)


// 响应拦截
service.interceptors.response.use(
    res => {
        // 统一取 data
        return res.data

    },
    error => {
        let msg = '网络异常'

        if (error.response) {
            console.log(error.response)
            if (error.response.data.code === 401) {
                // 跳转到登录
                console.log('跳转到登录')

                router.navigate('/login')


            }
            msg = error.response.data?.message || msg
        }

        console.error('API Error:', msg)

        return Promise.reject(msg)
    }
)


// 二次封装
export const get = (url: string, params = {}) => {
    return service.get(url, { params })
}

export const post = (url: string, data = {}, params = {}) => {
    return service.post(url, data, { params })
}

export const del = (url: string, params = {}) => {
    return service.delete(url, { params })
}

export default service
