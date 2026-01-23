<template>
  <!-- ============================================
       LOGIN PAGE TEMPLATE
       Public page for user authentication
       ============================================ -->
  <div class="login-page">
    <div class="login-card">
      <h1>Welcome Back</h1>
      <p class="subtitle">Please sign in to continue</p>

      <!-- LOGIN FORM -->
      <!-- @submit.prevent prevents page reload on form submit -->
      <form @submit.prevent="handleLogin">
        
        <!-- EMAIL INPUT -->
        <div class="form-group">
          <label for="email">Email Address</label>
          <!-- v-model creates two-way binding with email data -->
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- PASSWORD INPUT -->
        <div class="form-group">
          <label for="password">Password</label>
          <!-- v-model creates two-way binding with password data -->
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- ERROR MESSAGE -->
        <!-- v-if only shows this element if errorMessage has value -->
        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <!-- SUBMIT BUTTON -->
        <!-- :disabled prevents clicks while loading -->
        <button type="submit" :disabled="isLoading" class="login-button">
          <!-- Show different text based on loading state -->
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <!-- HINT FOR DEMO -->
      <p class="hint">
        <strong>Hint:</strong> Use any email with password: <code>password123</code>
      </p>
    </div>
  </div>
</template>

<script>
// ============================================
// LOGIN PAGE COMPONENT
// Handles user authentication via Vuex action
// ============================================

export default {
  // Component name for debugging
  name: 'LoginPage',

  // ============================================
  // DATA - Component's reactive state
  // ============================================
  data() {
    return {
      // Form input values
      email: '',
      password: '',
      // Error message to display
      errorMessage: '',
      // Loading state for button
      isLoading: false
    }
  },

  // ============================================
  // METHODS - Component functions
  // ============================================
  methods: {
    // Handle form submission
    async handleLogin() {
      // Clear any previous error
      this.errorMessage = ''
      // Set loading state
      this.isLoading = true

      try {
        // Call Vuex login action with credentials
        // this.$store.dispatch triggers a Vuex action
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })

        // Login successful - redirect to dashboard
        // this.$router.push navigates to a new route
        this.$router.push({ name: 'Dashboard' })

      } catch (error) {
        // Login failed - show error message
        this.errorMessage = error.message
      } finally {
        // Always reset loading state
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* ============================================
   LOGIN PAGE STYLES
   Scoped = only applies to this component
   ============================================ */

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.login-card h1 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 28px;
}

.subtitle {
  color: #666;
  margin: 0 0 30px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.error-message {
  color: #e74c3c;
  background: #fdf0f0;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
}

.login-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.hint {
  margin-top: 20px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
}

.hint code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 4px;
  color: #e74c3c;
}
</style>
