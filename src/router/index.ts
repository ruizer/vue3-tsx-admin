import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import Routes from './routes'

const routes: Array<RouteRecordRaw> = [...Routes]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
