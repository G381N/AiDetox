import axios from 'axios'
import store from '../store'

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  
  // Request timeout (10 seconds)
  timeout: 10000,
  
  // Default headers for all requests
  headers: {
    'Content-Type': 'application/json'
  }
})

// ============================================
// REQUEST INTERCEPTOR
// Runs BEFORE every request is sent
// ============================================

apiClient.interceptors.request.use(
  // Success handler - modify config before request
  (config) => {
    const authToken = store.getters.authToken

    // If token exists, add it to Authorization header
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }

    return config
  },
  // Error handler - request failed to send

  (error) => {
    return Promise.reject(error)
  }
)

// ============================================
// RESPONSE INTERCEPTOR
// Runs AFTER every response is received
// Used for global error handling
// ============================================


apiClient.interceptors.response.use(
  // Success handler - return response data
  (response) => {
    return response
  },


  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid - log out user
      store.dispatch('logout')
    }
    return Promise.reject(error)
  }
)

// ============================================
// API METHODS
// Reusable functions for common API calls
// ============================================



//Obj
export function fetchAllUsers() {
  return apiClient.get('/users')
}


//ID
export function fetchUserById(userId) {
  return apiClient.get(`/users/${userId}`)
}

// Export the axios instance for custom requests
export default apiClient
