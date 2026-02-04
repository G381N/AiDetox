<template>
  <b-card class="custom-card shadow-sm p-4">
    <div class="text-center mb-4">
      <h3 class="font-weight-bold">{{ isLoginMode ? 'Login' : 'Create Account' }}</h3>
      <p class="text-muted small">
        {{ isLoginMode ? 'Enter your credentials to access your account' : 'Fill in the details to get started' }}
      </p>
    </div>

    <!-- Alerts -->
    <b-alert 
      v-if="errorMessage" 
      show 
      variant="danger" 
      dismissible
      @dismissed="errorMessage = ''"
      class="mb-3"
    >
      {{ errorMessage }}
    </b-alert>
    
    <b-alert 
      v-if="successMessage" 
      show 
      variant="success" 
      dismissible
      @dismissed="successMessage = ''"
      class="mb-3"
    >
      {{ successMessage }}
    </b-alert>

    <!-- Form -->
    <form @submit.prevent="handleSubmit">
      <div class="form-group mb-3">
        <label class="text-muted small font-weight-bold mb-1">Email Address</label>
        <b-form-input
          v-model="form.email"
          type="email"
          required
          placeholder="name@example.com"
          size="lg"
        ></b-form-input>
      </div>

      <div class="form-group mb-4">
        <label class="text-muted small font-weight-bold mb-1">Password</label>
        <b-form-input
          v-model="form.password"
          type="password"
          required
          placeholder="••••••••"
          size="lg"
        ></b-form-input>
      </div>

      <b-button 
        type="submit" 
        block 
        class="btn-primary-custom mb-3"
        :disabled="loading"
      >
        <b-spinner small v-if="loading" class="mr-2"></b-spinner>
        {{ isLoginMode ? 'Login' : 'Sign Up' }}
      </b-button>
    </form>

    <div class="text-center mt-3">
      <span class="text-muted small">
        {{ isLoginMode ? "Don't have an account?" : "Already have an account?" }}
      </span>
      <a href="#" @click.prevent="toggleMode" class="ml-1 small">
        {{ isLoginMode ? 'Sign up' : 'Login' }}
      </a>
    </div>

  </b-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserAuth',
  data() {
    return {
      isLoginMode: true,
      loading: false,
      errorMessage: '',
      successMessage: '',
      form: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
      this.errorMessage = '';
      this.successMessage = '';
      // Optional: clear form or keep it
      // this.form.email = '';
      this.form.password = '';
    },
    async handleSubmit() {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const url = this.isLoginMode 
        ? 'http://127.0.0.1:8000/api/login/' 
        : 'http://127.0.0.1:8000/api/signup/';

      try {
        const response = await axios.post(url, this.form);

        if (this.isLoginMode) {
          // Emit success to parent to handle state change
          this.$emit('auth-success', response.data);
        } else {
          // Signup Success - Stay here and show message, or auto login
          this.successMessage = 'Account created successfully! Please login.';
          this.isLoginMode = true; 
          this.form.password = '';
        }
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    handleError(error) {
      console.error('API Error:', error);
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.detail) {
            this.errorMessage = data.detail;
        } else {
            // Join all error messages
            // Some Django errors come as { field: ["error"] }
            // JSON.stringify can be too raw, let's try to flatten it
            try {
                const messages = [];
                for (const key in data) {
                    if (Array.isArray(data[key])) {
                        messages.push(`${key}: ${data[key].join(', ')}`);
                    } else {
                        messages.push(`${key}: ${data[key]}`);
                    }
                }
                this.errorMessage = messages.join(' | ');
            } catch (e) {
                this.errorMessage = 'An error occurred with the request.';
            }
        }
      } else {
        this.errorMessage = 'Network error: Could not reach the server.';
      }
    }
  }
};
</script>
