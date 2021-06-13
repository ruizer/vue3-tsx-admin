import { createStore } from 'vuex'
import moduleObj from './modules'

const modules = { ...moduleObj }

const store = createStore({
  modules,
})

export default store
