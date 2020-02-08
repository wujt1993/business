import axios from 'axios'
import { getToken, removeToken, getWorkno } from '@/utils/auth'
import { Message } from 'element-ui'
// import router from '@/router/index'
// import store from '@/store'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] = getToken()

        }
        // config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"
        // console.log(config.headers)
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        const statusCodeValue = response.data.statusCodeValue
        if (statusCodeValue < 200 || statusCodeValue > 300) {
            if(statusCodeValue == 401){
                alert("会话失效，请重新登录")
                removeToken()
                window.location.href = config.loginUrl + encodeURIComponent(config.locationHref)
            }else if(statusCodeValue == 403){
                Message({
                    message: "您暂无权限",
                    type: "error",
                    showClose: true,
                    duration: 0
                });
            }else if(statusCodeValue == 406) {
                alert("用户不存在或用户被禁用")
                removeToken()
                window.location.href = config.loginUrl + encodeURIComponent(config.locationHref)
            }else{
                Message({
                    message: response.data.body,
                    type: "error"
                });
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        Message({
            message: "请求异常，请联系管理员",
            type: "error"
        });
        return Promise.reject('error')
    }
)
export default service
