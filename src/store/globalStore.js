export const globalStore = {
  state: {
    Login: 'hhhhh',
  },
  getters: {
    Login: state => state.Login
  },
  mutations: {
    'SETLOGIN' (state, value) {
      state.Login = value
    }
  }
}
