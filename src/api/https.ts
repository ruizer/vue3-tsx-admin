import axios from '../libs/axios.request'
import { CommonResponse } from '@/api/types/response'

/**
 * @description post请求方式
 * @param {String} url 请求地址
 * @param {Object} data 请求数据
 */
export const httpsPost = <T = CommonResponse>(url: string, data = {}, other = {}) => {
  const headers: any = {
    'Content-Type': 'application/json'
  }

  return axios.request<T>({
    url,
    data,
    method: 'post',
    headers,
    ...other
  })
}

export const httpsGet = <T = CommonResponse>(url: string, params = {}, other = {}) => {
  return axios.request<T>({
    url,
    method: 'get',
    params,
    ...other
  })
}
