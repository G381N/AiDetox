<template>
  <!-- ============================================
       USER DETAILS PAGE TEMPLATE
       Protected page showing single user details
       Uses dynamic route parameter (:id)
       ============================================ -->
  <div class="user-details-page">
    <!-- PAGE HEADER -->
    <header class="page-header">
      <!-- BACK LINK -->
      <router-link to="/users" class="back-link">
        ← Back to Users
      </router-link>
      <h1>User Details</h1>
    </header>

    <!-- LOADING STATE -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading user details...</p>
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="errorMessage" class="error-state">
      <p>❌ {{ errorMessage }}</p>
      <button @click="fetchUserDetails" class="retry-button">
        Try Again
      </button>
    </div>

    <!-- USER DETAILS CARD -->
    <!-- v-else shows when not loading and no error -->
    <div v-else-if="userDetails" class="details-card">
      <!-- USER HEADER -->
      <div class="user-header">
        <div class="user-avatar">
          {{ userDetails.name.charAt(0) }}
        </div>
        <div>
          <h2>{{ userDetails.name }}</h2>
          <p class="username">@{{ userDetails.username }}</p>
        </div>
      </div>

      <!-- USER INFO SECTIONS -->
      <div class="info-sections">
        <!-- CONTACT INFO -->
        <div class="info-section">
          <h3>📧 Contact Information</h3>
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value">{{ userDetails.email }}</span>
          </div>
          <div class="info-row">
            <span class="label">Phone:</span>
            <span class="value">{{ userDetails.phone }}</span>
          </div>
          <div class="info-row">
            <span class="label">Website:</span>
            <span class="value">{{ userDetails.website }}</span>
          </div>
        </div>

        <!-- ADDRESS INFO -->
        <div class="info-section">
          <h3>📍 Address</h3>
          <div class="info-row">
            <span class="label">Street:</span>
            <span class="value">{{ userDetails.address.street }}</span>
          </div>
          <div class="info-row">
            <span class="label">Suite:</span>
            <span class="value">{{ userDetails.address.suite }}</span>
          </div>
          <div class="info-row">
            <span class="label">City:</span>
            <span class="value">{{ userDetails.address.city }}</span>
          </div>
          <div class="info-row">
            <span class="label">Zipcode:</span>
            <span class="value">{{ userDetails.address.zipcode }}</span>
          </div>
        </div>

        <!-- COMPANY INFO -->
        <div class="info-section">
          <h3>🏢 Company</h3>
          <div class="info-row">
            <span class="label">Name:</span>
            <span class="value">{{ userDetails.company.name }}</span>
          </div>
          <div class="info-row">
            <span class="label">Catch Phrase:</span>
            <span class="value">{{ userDetails.company.catchPhrase }}</span>
          </div>
          <div class="info-row">
            <span class="label">BS:</span>
            <span class="value">{{ userDetails.company.bs }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ============================================
// USER DETAILS PAGE COMPONENT
// Fetches and displays single user from API
// Receives user ID from route parameter
// ============================================

// Import the API function we created
import { fetchUserById } from '../services/api'

export default {
  // Component name for debugging
  name: 'UserDetailsPage',

  // ============================================
  // PROPS - Data passed from parent (router)
  // The 'id' prop comes from the route parameter
  // Defined in router: props: true
  // ============================================
  props: {
    // User ID from route (/users/:id)
    // Type: String because route params are always strings
    id: {
      type: String,
      required: true
    }
  },

  // ============================================
  // DATA - Component's reactive state
  // ============================================
  data() {
    return {
      // Object to store fetched user data
      userDetails: null,
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
  created() {
    // Fetch user details when component loads
    this.fetchUserDetails()
  },

  // ============================================
  // WATCH - React to prop/data changes
  // ============================================
  watch: {
    // Watch for changes in the 'id' prop
    // This handles navigation between different users
    // without component being destroyed/recreated
    id(newId, oldId) {
      // If ID changed, fetch new user details
      if (newId !== oldId) {
        this.fetchUserDetails()
      }
    }
  },

  // ============================================
  // METHODS - Component functions
  // ============================================
  methods: {
    // Fetch user details from API
    async fetchUserDetails() {
      // Reset state before fetching
      this.isLoading = true
      this.errorMessage = ''
      this.userDetails = null

      try {
        // Call API function with the user ID from props
        // this.id comes from the route parameter via props
        const response = await fetchUserById(this.id)
        
        // Store user data from response
        this.userDetails = response.data

      } catch (error) {
        // Handle error - show message to user
        this.errorMessage = 'Failed to load user details. User may not exist.'
        console.error('Error fetching user:', error)

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
   USER DETAILS PAGE STYLES
   ============================================ */

.user-details-page {
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

.details-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-avatar {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
}

.user-header h2 {
  margin: 0 0 5px 0;
  font-size: 24px;
}

.username {
  margin: 0;
  opacity: 0.9;
}

.info-sections {
  padding: 30px;
  display: grid;
  gap: 30px;
}

.info-section h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.info-row {
  display: flex;
  padding: 8px 0;
}

.label {
  width: 120px;
  color: #666;
  font-weight: 500;
  flex-shrink: 0;
}

.value {
  color: #333;
}

/* Responsive layout for larger screens */
@media (min-width: 768px) {
  .info-sections {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .info-section:last-child {
    grid-column: span 2;
  }
}
</style>
