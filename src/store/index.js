import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    username: '',
    isSystem: false,
    token: '',
    shopId:''
  },

  getters:{
    getUserName: state => state.username,
    getToken : state => state.token,
    getIsSystem : state => state.isSystem
  },
  actions: {
    setUsername({commit}, username) {
      commit('SET_USERNAME', username)
    },
    setToken({commit}, token) {
      commit('SET_TOKEN', token)
    },
    setSystem({commit},isSystem){
      commit('SET_SYSTEM',isSystem)
    },
    setShopId({commit},shopId){
      commit('SET_SHOPID',shopId)
    }
  },

  mutations: {
    SET_USERNAME(state, username) {
      sessionStorage.setItem('username', username)
      state.username = username
    },
    SET_TOKEN(state, token) {
      sessionStorage.setItem('token', token)
      state.token = token
    },
    SET_SYSTEM(state, isSystem){
      sessionStorage.setItem('isSystem', isSystem)
      state.isSystem = isSystem
    },
    SET_SHOPID(state,shopId){
      sessionStorage.setItem('shopId', shopId)
      state.shopId = shopId
    }
  }
})