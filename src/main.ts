import { createApp } from 'vue'
import App from '@/views/app'
import router from './router'
import store from './store'
import { custom } from '@/libs'
import hooks from '@/router/hooks'
hooks(router, store) // 注册全局钩子

import './theme/index.less'

const app = createApp(App)

app.use(custom)

app.use(store).use(router).mount('#app')
