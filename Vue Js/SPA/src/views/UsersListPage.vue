<template>
  <!-- ============================================
       USERS LIST PAGE TEMPLATE
       Protected page showing all users from API
       ============================================ -->
  <div class="users-page">
    <!-- PAGE HEADER -->
    <header class="page-header">
      <!-- BACK LINK -->
      <!-- router-link navigates without page reload -->
      <router-link to="/dashboard" class="back-link">
        ← Back to Dashboard
      </router-link>
      <h1>Users List</h1>
    </header>

    <!-- LOADING STATE -->
    <!-- v-if shows this only when isLoading is true -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading users...</p>
    </div>

    <!-- ERROR STATE -->
    <!-- v-else-if shows this only when there's an error -->
    <div v-else-if="errorMessage" class="error-state">
      <p>❌ {{ errorMessage }}</p>
      <!-- @click triggers fetchUsers method to retry -->
      <button @click="fetchUsers" class="retry-button">
        Try Again
      </button>
    </div>

    <!-- USERS LIST -->
    <!-- v-else shows this when not loading and no error -->
    <div v-else class="users-grid">
      <!-- 
        v-for loops through usersList array
        :key is required for Vue to track each item
        Each user card links to user details page
      -->
      <router-link
        v-for="user in usersList"
        :key="user.id"
        :to="`/users/${user.id}`"
        class="user-card"
      >
        <!-- User Avatar (first letter of name) -->
        <div class="user-avatar">
          {{ user.name.charAt(0) }}
        </div>
        <!-- User Details -->
        <div class="user-details">
          <h3>{{ user.name }}</h3>
          <p class="user-email">{{ user.email }}</p>
          <p class="user-company">{{ user.company.name }}</p>
        </div>
        <!-- Arrow indicator -->
        <span class="arrow">→</span>
      </router-link>
    </div>

    <!-- USERS COUNT -->
    <p v-if="!isLoading && !errorMessage" class="users-count">
      Showing {{ usersList.length }} users
    </p>
  </div>
</template>

<script>
// ============================================
// USERS LIST PAGE COMPONENT
// Fetches and displays all users from API
// ============================================

// Import the API function we created
import { fetchAllUsers } from '../services/api'

export default {
  // Component name for debugging
  name: 'UsersListPage',

  // ============================================
  // DATA - Component's reactive state
  // ============================================
  data() {
    return {
      // Array to store fetched users
      usersList: [],
      // Loading state flag
      isLoading: false,
      // Error message (if any)
      errorMessage: ''
    }
  },

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================
  
  // created() runs when component is created
  // Good place to fetch initial data
  created() {
    // Fetch users when component loads
    this.fetchUsers()
  },

  // ============================================
  // METHODS - Component functions
  // ============================================
  methods: {
    // Fetch all users from API
    async fetchUsers() {
      // Reset state before fetching
      this.isLoading = true
      this.errorMessage = ''

      try {
        // Call API function (returns axios response)
        const response = await fetchAllUsers()
        
        // Store users data from response
        // response.data contains the actual data from API
        this.usersList = response.data

      } catch (error) {
        // Handle error - show message to user
        this.errorMessage = 'Failed to load users. Please try again.'
        console.error('Error fetching users:', error)

      } finally {
        // Always set loading to false when done
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* ============================================
   USERS LIST PAGE STYLES
   ============================================ */

.users-page {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.back-link {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  margin-bottom: 10px;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.page-header h1 {
  margin: 0;
  color: #333;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e1e1e1;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  color: #e74c3c;
}

.retry-button {
  margin-top: 15px;
  padding: 10px 25px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.retry-button:hover {
  background: #5a6fd6;
}

.users-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.user-card:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.user-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
}

.user-details {
  flex: 1;
}

.user-details h3 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 16px;
}

.user-email {
  margin: 0 0 3px 0;
  color: #666;
  font-size: 14px;
}

.user-company {
  margin: 0;
  color: #999;
  font-size: 13px;
}

.arrow {
  color: #667eea;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}

.user-card:hover .arrow {
  opacity: 1;
}

.users-count {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}
</style>
