import { defineComponent, reactive, UnwrapRef, ref, toRaw } from 'vue'
import styles from './index.module.less'
import { Form, Input, Button, Checkbox, message } from 'ant-design-vue'
import { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'
import { localStorageApi } from '@/utils'
import Message from './message'
import { userLogin } from '@/api/user'
import CODE from '@/api/code'
import { setToken } from '@/utils/token'
import { useRouter } from 'vue-router'
import store from '@/store'

const IS_REMEMBER_KEY = 'utilize-admin-isRemember'
const REMEMBER_INFO_KEY = 'utilize-admin-rememberInfo'

interface LoginFormIner {
  username: string
  password: string
}

const Login = defineComponent({
  name: 'login',
  setup() {
    const router = useRouter()
    const formRef = ref()
    const loginForm: UnwrapRef<LoginFormIner> = reactive({
      username: '',
      password: '',
    })
    const rules = {
      username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
      password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    }
    const rememberPsw = ref(false)

    const isRem = localStorageApi.get(IS_REMEMBER_KEY)
    const remInfo = localStorageApi.get(REMEMBER_INFO_KEY)
    if (isRem === '&&' && remInfo && remInfo.username && remInfo.password) {
      rememberPsw.value = true
      loginForm.username = remInfo.username
      loginForm.password = remInfo.password
    }

    // 登录按钮
    const submit = () => {
      formRef.value
        .validate()
        .then(() => {
          const params = toRaw(loginForm)
          loginHttp(params)
        })
        .catch((error: ValidateErrorEntity<LoginFormIner>) => {
          message.warning('用户名和密码不能为空', 1)
          console.log('error', error)
        })
    }

    const loading = ref(false)
    const loginHttp = async (params: LoginFormIner) => {
      loading.value = true
      const res = await userLogin(params)
      // const { username } = params
      // const user = { username: username, nickName: username, email: '1244388148@qq.com' }
      // localStorageApi.set('userinfo', user)
      // const res = { data: { code: 200, data: { token: 'duji3-334ds-32ds3-ds343', user }, message: 'success' } }
      loading.value = false
      if (res && res.data && res.data.code === CODE.code200) {
        // 调取登录接口，成功后跳转
        const data = res.data.data
        setToken(data.token)
        rememberAction(params)
        store.commit('user/UPDATE_USERINFO', data.user)
        router.push('/')
        return
      }
      message.error(res.data.message || '登录失败')
    }

    // 记住密码的逻辑
    const rememberAction = (data: any) => {
      if (rememberPsw.value) {
        localStorageApi.set(IS_REMEMBER_KEY, '&&')
        localStorageApi.set(REMEMBER_INFO_KEY, data)
        return
      }
      localStorageApi.remove(IS_REMEMBER_KEY)
      localStorageApi.remove(REMEMBER_INFO_KEY)
    }

    /** 登录页提示逻辑 */

    return () => (
      <div class={styles['login-page']}>
        <Message />
        <div class={styles['login-page-form']}>
          <section>
            <img src={require('@/assets/login/login-bg.png')} />
          </section>
          <section>
            <Form model={loginForm} ref={formRef} rules={rules} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
              <Form.Item name="username">
                <Input v-model={[loginForm.username, 'value']} placeholder="请输入账号" />
              </Form.Item>
              <Form.Item name="password">
                <Input.Password v-model={[loginForm.password, 'value']} placeholder="请输入账号密码" />
              </Form.Item>
            </Form>
            <div>
              <Checkbox v-model={[rememberPsw.value, 'checked']}>记住账号和密码</Checkbox>
            </div>
            <Button class={styles.btn} loading={loading.value} type="primary" onClick={submit}>
              登录
            </Button>
          </section>
        </div>
      </div>
    )
  },
})

export default Login
