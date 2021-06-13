import { BeforeEachParams } from '..'
import { localStorageApi } from '@/utils'
import { removeToken, getToken } from '@/utils/token'

export default ({ to, from, next }: BeforeEachParams) => {
  if (to.name === 'login') {
    removeToken()
    localStorageApi.remove('logoutUrl')
    return next()
  }
  const token = getToken()
  if (token || to.meta.require === false) {
    return next()
  }
  return next({ name: 'login' })
}
