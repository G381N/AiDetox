import Vue from 'vue'
import Vuex from 'vuex'

// Tell Vue to use Vuex
Vue.use(Vuex)


// HELPER: Load saved auth state from localStorage

function loadSavedAuthState() {
  const savedToken = localStorage.getItem('authToken')
  const savedUser = localStorage.getItem('authUser')
  
  return {
    token: savedToken || null,
    user: savedUser ? JSON.parse(savedUser) : null,
    // User is authenticated if token exists
    isAuthenticated: !!savedToken
  }
}

const savedState = loadSavedAuthState()

// Create and export the Vuex store
export default new Vuex.Store({
  state: {
    // Currently logged in user object
    user: savedState.user,
    // Authentication token
    token: savedState.token,
    // Boolean flag for quick auth checks
    isAuthenticated: savedState.isAuthenticated
  },

  // GETTERS - Computed properties for state
  getters: {
    // Returns true if user is logged in
    isAuthenticated(state) {
      return state.isAuthenticated
    },
    // Returns the current user object
    currentUser(state) {
      return state.user
    },
    // Returns the auth token
    authToken(state) {
      return state.token
    }
  },

  // MUTATIONS - Synchronous state changes
  // These are the ONLY way to change state
  mutations: {
    // SET_USER - Updates the user object in state
    SET_USER(state, userObject) {
      state.user = userObject
    },

    // SET_TOKEN - Updates token and auth status
    SET_TOKEN(state, tokenString) {
      state.token = tokenString
      // If token exists, user is authenticated
      state.isAuthenticated = !!tokenString
    },

    // LOGOUT - Clears all auth data from state
    LOGOUT(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    }
  },

  // ACTIONS - Async operations that commit mutations
  actions: {
    // LOGIN ACTION
    // Called when user submits login form
    // Params: credentials = { email, password }
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {       
        // Simulate API delay
        setTimeout(() => {
          // Simple validation (any email with password "password123")
          if (credentials.email && credentials.password === 'password123') {
            // Create dummy user data
            const userData = {
              id: 1,
              name: 'Demo User',
              email: credentials.email
            }
            
            // Create dummy token
            const dummyToken = 'demo-jwt-token-' + Date.now()

            // STEP 1: Save to localStorage (persists across refreshes)
            localStorage.setItem('authToken', dummyToken)
            localStorage.setItem('authUser', JSON.stringify(userData))

            // STEP 2: Update Vuex state via mutations
            commit('SET_TOKEN', dummyToken)
            commit('SET_USER', userData)

            // STEP 3: Resolve promise with success
            resolve({ success: true, user: userData })
          } else {
            // Invalid credentials
            reject(new Error('Invalid email or password. Use password: password123'))
          }
        }, 500) // 500ms delay to simulate network
      })
    },

    // LOGOUT ACTION
    // Called when user clicks logout button
    logout({ commit }) {
      // STEP 1: Clear localStorage
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')

      // STEP 2: Clear Vuex state via mutation
      commit('LOGOUT')
    }
  }
})
