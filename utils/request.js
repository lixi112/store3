import axios from 'axios'
import { Toast } from 'vant'
// 创建axios实例，将来对创建出来的实例，进行自定义配置
// 好处：不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'H5' }
})
// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading，禁止背景点击(节流处理，防止多次无效触发)
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 配置loading图标
    duration: 0// 不会自动消失
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const res = response.data
  if (res.status !== 200) {
    // 给错误提示，Toast 默认是单例模式，后面的Toast调用了，会将前一个Toast效果覆盖
    // 同时只能存在一个Toast
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    Toast.clear()
  }
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认axios会多包装一层data，需要响应拦截器中处理一下)
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default instance
