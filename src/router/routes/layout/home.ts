import Layout from '@/layout/index'

export const HOME_ROUTE_NAME = 'home'
export const HOME_ROUTE_PATH = '/home'

const HOME_ROUTE = {
  path: HOME_ROUTE_PATH,
  name: HOME_ROUTE_NAME,
  component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
  meta: {
    require: true,
    title: '首页',
  },
}

export default [
  {
    path: '/',
    name: 'layout-home',
    component: Layout,
    redirect: HOME_ROUTE_PATH,
    children: [HOME_ROUTE],
  },
]
