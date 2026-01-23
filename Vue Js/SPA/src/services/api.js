// ============================================
// AXIOS API SERVICE - services/api.js
// Reusable Axios instance for all API calls
// ============================================

import axios from 'axios'
import store from '../store'

// ============================================
// CREATE AXIOS INSTANCE
// Base configuration for all API requests
// ============================================
const apiClient = axios.create({
  // Base URL for the public API (JSONPlaceholder)
  // All requests will be prefixed with this URL
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
// Used to attach auth token to requests
// ============================================
apiClient.interceptors.request.use(
  // Success handler - modify config before request
  (config) => {
    // Get token from Vuex store
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
  // Error handler - handle API errors
  (error) => {
    // Check if error is 401 (Unauthorized)
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

// Fetch all users from API
// Returns: Array of user objects
export function fetchAllUsers() {
  return apiClient.get('/users')
}

// Fetch single user by ID
// Param: userId - The ID of the user to fetch
// Returns: Single user object
export function fetchUserById(userId) {
  return apiClient.get(`/users/${userId}`)
}

// Export the axios instance for custom requests
export default apiClient
