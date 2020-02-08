import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: false,
    isPC: true
  },
  modules: {
    login
  },
  getters,
  mutations: {
    SET_LOADING: (state, loading) => {
      state.loading = loading
    },
    SET_ISPC: (state, isPC) => {
      state.isPC = isPC
    }
  },
})

export default store
