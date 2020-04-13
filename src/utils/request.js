/* 根据实际需求进行拦截器处理 */

import axios from 'axios'
import { Message } from 'element-ui'
axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error) {
    switch (error.response.status) {
      case 500:
        Message({
          type: 'error',
          message: '请求错误'
        })
        break
      case 404:
        Message({
          type: 'error',
          message: '找不到路由'
        })
        break
    }
  }
})
