import { AfterEachParams } from '..'
import changeDocumnetTitle from '@/utils/title'

export default ({ to, store }: AfterEachParams) => {
  changeDocumnetTitle(store, to) // 改变页面标题
}
