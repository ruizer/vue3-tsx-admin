import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const Message = defineComponent({
  name: 'message',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { query } = route
    const { message: msg } = query
    const content = msg
    if (content) {
      message.info(content, 3)
      router.replace({ name: 'login' })
      return
    }
    return () => []
  },
})

export default Message
