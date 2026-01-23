<template>
  <!-- ============================================
       DASHBOARD PAGE TEMPLATE
       Protected page showing user info & navigation
       ============================================ -->
  <div class="dashboard-page">
    <!-- HEADER SECTION -->
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <!-- LOGOUT BUTTON -->
      <!-- @click triggers handleLogout method when clicked -->
      <button @click="handleLogout" class="logout-button">
        Logout
      </button>
    </header>

    <!-- WELCOME CARD -->
    <div class="welcome-card">
      <div class="user-avatar">
        <!-- Show first letter of user's name -->
        {{ userInitial }}
      </div>
      <div class="user-info">
        <h2>Welcome, {{ userName }}!</h2>
        <p>{{ userEmail }}</p>
      </div>
    </div>

    <!-- NAVIGATION CARDS -->
    <div class="nav-cards">
      <!-- USERS LIST CARD -->
      <!-- router-link creates a navigation link (like <a> but for SPA) -->
      <router-link to="/users" class="nav-card">
        <div class="nav-card-icon">👥</div>
        <h3>Users List</h3>
        <p>View all users from the API</p>
      </router-link>

      <!-- PROFILE CARD (placeholder) -->
      <div class="nav-card disabled">
        <div class="nav-card-icon">👤</div>
        <h3>My Profile</h3>
        <p>Coming soon...</p>
      </div>

      <!-- SETTINGS CARD (placeholder) -->
      <div class="nav-card disabled">
        <div class="nav-card-icon">⚙️</div>
        <h3>Settings</h3>
        <p>Coming soon...</p>
      </div>
    </div>

    <!-- AUTH INFO BOX -->
    <div class="auth-info">
      <h4>Authentication Status</h4>
      <p><strong>Status:</strong> ✅ Authenticated</p>
      <p><strong>Token:</strong> {{ truncatedToken }}</p>
    </div>
  </div>
</template>

<script>
// ============================================
// DASHBOARD PAGE COMPONENT
// Shows user info and provides navigation
// ============================================

export default {
  // Component name for debugging
  name: 'DashboardPage',

  // ============================================
  // COMPUTED - Reactive calculated properties
  // These update automatically when dependencies change
  // ============================================
  computed: {
    // Get current user from Vuex store
    currentUser() {
      // this.$store.getters accesses Vuex getters
      return this.$store.getters.currentUser
    },

    // Get user's display name (with fallback)
    userName() {
      return this.currentUser?.name || 'User'
    },

    // Get user's email (with fallback)
    userEmail() {
      return this.currentUser?.email || 'No email'
    },

    // Get first letter of name for avatar
    userInitial() {
      return this.userName.charAt(0).toUpperCase()
    },

    // Get truncated token for display
    truncatedToken() {
      const token = this.$store.getters.authToken
      if (!token) return 'No token'
      // Show first 20 characters + "..."
      return token.substring(0, 20) + '...'
    }
  },

  // ============================================
  // METHODS - Component functions
  // ============================================
  methods: {
    // Handle logout button click
    handleLogout() {
      // Call Vuex logout action
      this.$store.dispatch('logout')
      
      // Redirect to login page
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
/* ============================================
   DASHBOARD PAGE STYLES
   ============================================ */

.dashboard-page {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.dashboard-header h1 {
  margin: 0;
  color: #333;
}

.logout-button {
  padding: 10px 20px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-button:hover {
  background: #c0392b;
}

.welcome-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  margin-bottom: 30px;
}

.user-avatar {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
}

.user-info h2 {
  margin: 0 0 5px 0;
  font-size: 24px;
}

.user-info p {
  margin: 0;
  opacity: 0.9;
}

.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.nav-card {
  padding: 25px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.nav-card:hover:not(.disabled) {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.nav-card.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.nav-card-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.nav-card h3 {
  margin: 0 0 8px 0;
  color: #333;
}

.nav-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.auth-info {
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.auth-info h4 {
  margin: 0 0 15px 0;
  color: #333;
}

.auth-info p {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
}
</style>
