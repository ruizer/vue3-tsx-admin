import { AfterEachParams } from '..'
import NProgress from 'nprogress'
export default ({ to, store }: AfterEachParams) => {
  NProgress.done()
}
