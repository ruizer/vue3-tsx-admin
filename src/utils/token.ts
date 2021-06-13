import { AUTHTOKEN } from '@/config'
import { localStorageApi } from './index'

export const getToken = () => {
  return localStorageApi.get(AUTHTOKEN)
}

export const setToken = (data: any) => {
  localStorageApi.set(AUTHTOKEN, data)
}

export const removeToken = () => {
  localStorageApi.remove(AUTHTOKEN)
}
