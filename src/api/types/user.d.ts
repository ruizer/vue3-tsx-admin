import { CommonResponse } from './response'

export interface UserLoginIner {
  username: string
  password: string
}

export interface UserInfoIner {
  username: string
  nickname: string
  email: string
}

export interface UserLoginResponse extends CommonResponse {
  data: {
    user: UserInfoIner
    token: string
  }
}

export interface GetUserInfoResponse extends CommonResponse {
  data: UserInfoIner
}
