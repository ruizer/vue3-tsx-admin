export const LOGIN_ROUTE_NAME = 'login'
export const LOGIN_ROUTE_PATH = '/login'

export default [
  {
    path: LOGIN_ROUTE_PATH,
    name: LOGIN_ROUTE_NAME,
    component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
    meta: {
      require: false,
      title: '登录',
    },
  },
]
