import { BeforeEachParams } from '..'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })

export default ({ to, store, from, next }: BeforeEachParams) => {
  NProgress.start()
  next()
}
