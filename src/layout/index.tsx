import { defineComponent } from 'vue'
import styles from './index.module.less'
import store from '@/store'

const Layout = defineComponent({
  name: 'layout',
  setup() {
    store.dispatch('user/FETCH_USERINFO')
    return () => (
      <div class={styles['layout-page']}>
        <router-view />
      </div>
    )
  },
})

export default Layout
