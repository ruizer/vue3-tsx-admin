import { httpsPost } from './https'
import { UserLoginIner, UserLoginResponse, GetUserInfoResponse } from './types/user'

export const userLogin = (params: UserLoginIner) => {
  return httpsPost<UserLoginResponse>('/user/login', params)
}

export const getCurrentUserInfo = () => {
  return httpsPost<GetUserInfoResponse>('/user/currentUser')
}

