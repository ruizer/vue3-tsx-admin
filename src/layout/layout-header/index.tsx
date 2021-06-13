import { defineComponent } from 'vue'
import styles from './index.module.less'

const LayoutHeader = defineComponent({
  name: 'layout-header',
  setup() {
    return () => <div class={styles['layout-header-page']}></div>
  },
})

export default LayoutHeader
