// @ts-nocheck
import axios from 'axios'
import {
  apiHost,
  env
} from './config'
import { message } from 'antd'

const adapteUser = () => {
  if (env === 'dev') {
    return 'jiawen.peng'
  }
  if (window.$vanSSO) {
    return window.$vanSSO.user.account
  }
  return ''
}


const apiClient = axios.create({
  baseURL: `${apiHost}/`,
  headers: {
    'Content-type': 'application/json',
    'user': adapteUser()
  }
})

apiClient.interceptors.request.use(function (config) {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  if (username && password) {
    config.auth = {
      username,
      password
    }
  }

  return config
})

// 响应拦截器
apiClient.interceptors.response.use(
  function (response: any) {
    const success = response.data?.ret === 0 || response instanceof Blob
    if (!success) {
      const errorMessage = response.data?.msg || '请求失败'
      // 抛出业务报错
      console.error(errorMessage)
      message.error(errorMessage)
    }

    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    // 可以在这里统一处理错误
    console.error('请求失败:', error);
    return Promise.reject(error);
  }
);

export default apiClient
