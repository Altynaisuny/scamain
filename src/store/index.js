import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    userInfo: {},
    isSystem: false,
    token: '',
    shopId:''
  },

  getters:{
    getUserInfo: state => state.userInfo,
    getToken : state => state.token,
    getIsSystem : state => state.isSystem
  },
  actions: {
    setUserInfo({commit}, userInfo) {
      commit('SET_USERINFO', userInfo)
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
    SET_USERINFO(state, userInfo) {
      state.userinfo = userInfo
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