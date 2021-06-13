import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const Redirect = defineComponent({
  name: 'redirect',
  setup() {
    const { params, query } = useRoute()
    const { path } = params
    useRouter()
      .replace({ path: '/' + path, query })
      .catch((err) => {
        console.warn(err)
      })
    return () => []
  },
})

export default Redirect
