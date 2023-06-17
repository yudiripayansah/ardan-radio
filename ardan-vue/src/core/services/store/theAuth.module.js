export default {
  state: {
    user: localStorage.getItem('EasyCoAdmUser') != null && typeof localStorage.getItem('EasyCoAdmUser') !== undefined ? JSON.parse(localStorage.getItem('EasyCoAdmUser')) : null,
    isAuthenticated: localStorage.getItem('EasyCoAdmUser') != null && typeof localStorage.getItem('EasyCoAdmUser') !== undefined ? true : false,
  },
  getters: {
    user: state => state.user,
    isAuthenticated: state => state.isAuthenticated
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.isAuthenticated = true
    },
    removeUser(state) {
      state.user = null
      state.isAuthenticated = false
    },
  },
  actions: {
    setUser({
      commit
    }, payload) {
      localStorage.setItem('EasyCoAdmUser', JSON.stringify(payload))
      commit('setUser', payload)
    },
    removeUser({
      commit
    }) {
      localStorage.removeItem('EasyCoAdmUser')
      commit('removeUser')
    }
  }
}
