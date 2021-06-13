import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import styles from './index.module.less'
import { Button } from 'ant-design-vue'

const Home = defineComponent({
  name: 'home',
  setup() {
    const { fullPath } = useRoute()
    const router = useRouter()
    const onClick = () => {
      router.replace({ path: '/redirect' + fullPath }).catch((err) => {
        console.warn(err)
      })
    }
    return () => (
      <div class={styles['home-page']}>
        <Button onClick={onClick}>刷新</Button>
      </div>
    )
  },
})

export default Home
