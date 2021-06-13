import { Router, RouteLocationNormalizedLoaded, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { Store } from 'vuex'
import isLogin from './beforeEach/isLogin'
import title from './afterEach/title'
import nprogressStart from './beforeEach/nprogress-start'
import nprogressDone from './afterEach/nprogress-done'

const beforeFn: Array<(params: BeforeEachParams) => any> = [nprogressStart, isLogin]
const afterFn: Array<(params: AfterEachParams) => any> = [nprogressDone, title]

/**
 * 导航守卫
 * @description 全局路由钩子函数,会给每个钩子函数传递对应的路由参数和vuex 的store实例。
 */
export default (router: Router, store: Store<any>): void => {
  beforeFn.forEach((v) => {
    router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
      v({ to, from, next, store })
    })
  })
  afterFn.forEach((v) => {
    router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
      v({ to, from, store })
    })
  })
}

export interface AfterEachParams {
  to: RouteLocationNormalized
  from: RouteLocationNormalizedLoaded
  store: Store<any>
}

export interface BeforeEachParams extends AfterEachParams {
  next: NavigationGuardNext
}
