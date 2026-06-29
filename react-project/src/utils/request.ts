import axios, { type AxiosRequestConfig } from 'axios'
import { router } from '@/routes/router'
import { getLoginRedirectPath } from '@/utils/loginRedirect'
import store from '@/store'
import { clearAuth } from '@/store/authSlice'

const service = axios.create({
    baseURL: '/api',
    timeout: 15000,
})

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const LEGACY_TOKEN_KEY = 'token'

type RetryableConfig = AxiosRequestConfig & { _retry?: boolean }

const downloadFile = (data: Blob) => {
    const blob = new Blob([data])
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', '学生列表.xls')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY) || ''
}

const setAuthTokens = (tokens: { accessToken: string; refreshToken?: string }) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(LEGACY_TOKEN_KEY, tokens.accessToken)

    if (tokens.refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
    }
}

const clearAuthTokens = () => {
    store.dispatch(clearAuth())
}

const redirectToLogin = () => {
    router.navigate(getLoginRedirectPath('/login'))
}

let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

const refreshTokenApi = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

    if (!refreshToken) {
        throw new Error('缺少 refreshToken')
    }

    const response = await service.post('/user/refresh', { refreshToken })
    const payload = (response as { data?: { accessToken?: string; refreshToken?: string } }).data ?? response
    const nextAccessToken = payload?.accessToken
    const nextRefreshToken = payload?.refreshToken || refreshToken

    if (!nextAccessToken) {
        throw new Error('刷新 token 失败')
    }

    setAuthTokens({ accessToken: nextAccessToken, refreshToken: nextRefreshToken })
    return nextAccessToken
}

//axios 设置接口返回的status
service.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300 || status === 400
}

// 请求拦截
service.interceptors.request.use(
    config => {
        const isRefreshRequest = config.url?.includes('/user/refresh')

        if (!isRefreshRequest) {
            const token = getAccessToken()

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }

        return config
    },
    error => Promise.reject(error)
)

// 响应拦截
service.interceptors.response.use(
    res => {
        if (res.headers['content-disposition'] && res.headers['content-disposition'].indexOf('attachment') > -1) {
            const fileName = res.headers['content-disposition'].split('filename=')[1]
            console.log(res.headers['content-disposition'])
            console.log(fileName)
            downloadFile(res.data)
            return {
                data: {
                    code: 200,
                    message: '下载成功'
                }
            }
        }

        // 统一取 data
        return res.data
    },
    async error => {
        const originalConfig = error.config as RetryableConfig
        const status = error.response?.status
        const isRefreshRequest = originalConfig?.url?.includes('/user/refresh')

        if (status === 401 && !isRefreshRequest && !originalConfig?._retry) {
            originalConfig._retry = true

            if (!isRefreshing) {
                isRefreshing = true

                try {
                    const newToken = await refreshTokenApi()
                    refreshSubscribers.forEach(callback => callback(newToken))
                    refreshSubscribers = []
                    if (originalConfig.headers) {
                        originalConfig.headers.Authorization = `Bearer ${newToken}`
                    }

                    return service(originalConfig)
                } catch (refreshError) {
                    clearAuthTokens()
                    redirectToLogin()
                    return Promise.reject(refreshError)
                } finally {
                    isRefreshing = false
                }
            }

            return new Promise((resolve, reject) => {
                refreshSubscribers.push(token => {
                    if (originalConfig.headers) {
                        originalConfig.headers.Authorization = `Bearer ${token}`
                    }
                    resolve(service(originalConfig))
                })
            })
        }

        let msg = '网络异常'

        if (error.response) {
            console.log(error.response)
            msg = error.response.data?.message || msg
        }

        console.error('API Error:', msg)

        return Promise.reject(msg)
    }
)

// 二次封装
export const get = (url: string, params = {}) => {
    return service.get(url, params)
}

export const post = (url: string, data = {}, params = {}) => {
    return service.post(url, data, params)
}

export const del = (url: string, params = {}) => {
    return service.delete(url, params)
}

export default service
