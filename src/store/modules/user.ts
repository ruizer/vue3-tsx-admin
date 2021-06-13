import { UserInfoIner } from '@/api/types/user'
import { StoreOptions, ActionContext } from 'vuex'
import { getCurrentUserInfo } from '@/api/user'
import CODE from '@/api/code'

interface StateIner {
  userInfo: UserInfoIner | null
}

const state = {
  userInfo: null,
}

const mutations = {
  UPDATE_USERINFO(state: StateIner, user: UserInfoIner) {
    if (!user) state.userInfo = null
    state.userInfo = JSON.parse(JSON.stringify(user))
  },
}

const actions = {
  async FETCH_USERINFO(context: ActionContext<StateIner, any>) {
    const { commit } = context
    const res = await getCurrentUserInfo()
    if (res && res.data && res.data.code === CODE.code200) {
      commit('UPDATE_USERINFO', res.data.data)
      return true
    }
    return res
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
} as StoreOptions<StateIner>
