import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance, AxiosStatic } from 'axios'
import { CommonResponse } from '@/api/types/response'
import { getToken, removeToken } from '@/utils/token'
import CODE from '@/api/code'
import router from '@/router'
export const axiosCommon: AxiosStatic = axios

const limitUrl: string[] = ['gather/getList']
const pending: { u: string; f: (key: string) => void; cancel: boolean }[] = []
const cancelToken = axios.CancelToken
function removePending(ever: AxiosRequestConfig) {
  pending.forEach((item, i) => {
    if (item.u === ever.url + '&' + ever.method) {
      item.cancel && item.f('axiosCancelToken') // 执行取消操作
      pending.splice(i, 1) // 移除记录
    }
  })
}

class HttpRequest {
  private baseUrl: string
  // 需要做限制的请求url 避免重复请求
  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }
  public getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {},
    }
    return config
  }
  public interceptors(instance: AxiosInstance) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = getToken()
        if (token) config.headers['Authorization'] = `${token}`
        removePending(config) // 取消操作
        const cancel = config.headers['isAxiosCancel'] === false ? false : true
        if (limitUrl.includes(config.url as string)) {
          config.cancelToken = new cancelToken((c) => {
            // 用请求地址&请求方式拼接的字符串进行ajax标识
            pending.push({ u: config.url + '&' + config.method, f: c, cancel })
          })
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        removePending(response.config)
        const { code } = response.data
        // if (codeValues.indexOf(code) === -1) {
        //   return Promise.reject({ response })
        // }
        const TOKENERROR: number[] = [CODE.code100012, CODE.code100013, CODE.code100015]
        if (TOKENERROR.includes(code)) {
          removeToken()
          router.replace({ name: 'login', query: { message: '登录失效，请重新登录' } })
          return Promise.reject({ response })
        }
        return response
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }
  public request<T = CommonResponse>(options: AxiosRequestConfig): Promise<AxiosResponseOwn<T>> {
    const instance: AxiosInstance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)

    return instance(options).then((res: AxiosResponse) => res as AxiosResponseOwn<T>)
  }
}

export default HttpRequest

interface AxiosResponseOwn<T = CommonResponse> extends AxiosResponse {
  data: T
}
