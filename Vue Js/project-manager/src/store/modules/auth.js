const state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('token')
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    state.isAuthenticated = !!token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  },
  SET_USER(state, user) {
    state.user = user
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }
}

const actions = {
  async login({ commit }, credentials) {
    // Mock login - in production, call real API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          const token = 'mock-jwt-token-' + Date.now()
          const user = {
            id: 1,
            name: credentials.email.split('@')[0],
            email: credentials.email
          }
          commit('SET_TOKEN', token)
          commit('SET_USER', user)
          resolve({ token, user })
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 500)
    })
  },
  
  logout({ commit }) {
    commit('SET_TOKEN', null)
    commit('SET_USER', null)
  }
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  currentUser: state => state.user,
  token: state => state.token
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
