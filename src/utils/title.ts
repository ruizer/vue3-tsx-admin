import { Store } from 'vuex'
import { RouteLocationNormalized } from 'vue-router'
/**
 * @description 根据store和目标路由更改当前document title
 * */
export default (store: Store<any>, to: RouteLocationNormalized): void => {
  // 目前没有使用store
  if (to.meta && to.meta.title) {
    window.document.title = process.env.VUE_APP_TITLE + '-' + to.meta.title
  } else {
    window.document.title = process.env.VUE_APP_TITLE
  }
}
