export const globalStore = {
  state: {
    isLogin: false,
    userInfo: {},
    avatar: ''
  },
  getters: {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
    avatar: state => state.avatar
  },
  mutations: {
    'SETLOGIN' (state, value) {
      state.isLogin = value
    },
    'SETUSERINFO' (state, params) {
      state.userInfo = params
    },
    'SETAVATAR' (state, params) {
      state.avatar = params
    }
  }
}
