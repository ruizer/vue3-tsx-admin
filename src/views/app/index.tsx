import { defineComponent } from 'vue'
import './index.less'

const App = defineComponent({
  setup() {
    return () => (
      <>
        <router-view />
      </>
    )
  },
})

export default App
