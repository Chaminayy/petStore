export const globalStore = {
  state: {
    isLogin: false,
    userInfo: {}
  },
  getters: {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo
  },
  mutations: {
    'SETLOGIN' (state, value) {
      state.isLogin = value
    },
    'SETUSERINFO' (state, params) {
      state.userInfo = params
    }
  }
}
