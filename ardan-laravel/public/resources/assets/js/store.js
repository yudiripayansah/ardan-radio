let store = new Vuex.Store({
  state: {
    users: localStorage.getItem('adminArdan') != null ? JSON.parse(localStorage.getItem('adminArdan')) : [],
  },
  getters: {
    users: state => state.users
  },
  mutations: {
    setUsers(state,payload){
      state.users = payload
      localStorage.setItem('adminArdan', JSON.stringify(state.users))
    },
    clearUsers(state){
      state.users = []
      localStorage.setItem('adminArdan', JSON.stringify(state.users))
    },
  },
  actions: {
    setUsers({commit},payload) {
      commit('setUsers',payload)
    },
    clearUsers({commit}) {
      commit('clearUsers')
    }
  },
  modules: {
  }
})
