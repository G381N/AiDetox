<template>
  <div class="login-container">
    <div class="login-card">
      <div class="card-header">
        <h2 class="login-title">Project Manager</h2>
        <p class="login-subtitle">Sign in to your account</p>
      </div>
      
      <b-form @submit.prevent="handleLogin" class="login-form">
        <b-form-group>
          <label class="form-label">Email Address</label>
          <div class="input-wrapper">
            <b-form-input
              v-model="$v.email.$model"
              type="email"
              placeholder="Enter your email"
              :state="validateState('email')"
              class="skeu-input"
            />
          </div>
          <b-form-invalid-feedback v-if="!$v.email.required">
            Email is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.email.email">
            Please enter a valid email
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group>
          <label class="form-label">Password</label>
          <div class="input-wrapper">
            <b-form-input
              v-model="$v.password.$model"
              type="password"
              placeholder="Enter your password"
              :state="validateState('password')"
              class="skeu-input"
            />
          </div>
          <b-form-invalid-feedback v-if="!$v.password.required">
            Password is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.password.minLength">
            Password must be at least {{ $v.password.$params.minLength.min }} characters
          </b-form-invalid-feedback>
        </b-form-group>

        <b-alert v-if="error" show variant="danger" class="error-alert">
          {{ error }}
        </b-alert>

        <b-button
          type="submit"
          variant="primary"
          block
          class="skeu-button login-button"
          :disabled="loading"
        >
          <b-spinner small v-if="loading" class="mr-2"></b-spinner>
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </b-button>
      </b-form>

      <div class="login-footer">
        <p class="demo-hint">💡 Use any email and password (min 6 chars) to login</p>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    
    validateState(name) {
      const { $dirty, $error } = this.$v[name]
      return $dirty ? !$error : null
    },
    
    async handleLogin() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.loading = true
      this.error = null

      try {
        await this.login({
          email: this.email,
          password: this.password
        })
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = 'Invalid email or password'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FF006E;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 20px),
    repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 20px);
  opacity: 0.1;
}

@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.login-card {
  background: #FFFFFF;
  border-radius: 0;
  padding: 50px;
  width: 100%;
  max-width: 500px;
  box-shadow: 12px 12px 0 #000000;
  border: 5px solid #000000;
  position: relative;
  z-index: 1;
}

.card-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-title {
  font-size: 42px;
  font-weight: 900;
  color: #000000;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: -2px;
}

.login-subtitle {
  color: #000000;
  font-size: 16px;
  margin: 0;
  font-weight: 600;
}

.login-form {
  margin-top: 30px;
}

.form-label {
  font-weight: 900;
  color: #000000;
  margin-bottom: 8px;
  display: block;
  font-size: 14px;
  text-transform: uppercase;
}

.input-wrapper {
  position: relative;
}

.skeu-input {
  background: #FFE951;
  border: 3px solid #000000;
  border-radius: 0;
  padding: 14px 16px;
  font-size: 15px;
  box-shadow: none;
  transition: all 0.2s ease;
  font-weight: 600;
}

.skeu-input:focus {
  outline: none;
  box-shadow: 4px 4px 0 #000000;
  border-color: #000000;
  background: #00F5FF;
  transform: translate(-2px, -2px);
}

.skeu-input.is-invalid {
  border-color: #FF006E;
  background: #FFB3D9;
  box-shadow: 4px 4px 0 #FF006E;
}

.skeu-button {
  background: #8338EC;
  border: 4px solid #000000;
  border-radius: 0;
  padding: 16px 24px;
  font-size: 18px;
  font-weight: 900;
  color: white;
  box-shadow: 6px 6px 0 #000000;
  transition: all 0.2s ease;
  margin-top: 10px;
  text-transform: uppercase;
}

.skeu-button:hover:not(:disabled) {
  background: #00F5FF;
  color: #000000;
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #000000;
}

.skeu-button:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #000000;
}

.skeu-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-alert {
  border-radius: 0;
  border: 3px solid #000000;
  background: #FF006E;
  color: #FFFFFF;
  box-shadow: 4px 4px 0 #000000;
  margin-top: 15px;
  font-weight: 700;
}

.login-footer {
  margin-top: 25px;
  text-align: center;
}

.demo-hint {
  font-size: 13px;
  color: #000000;
  background: #00F5FF;
  padding: 12px;
  border-radius: 0;
  margin: 0;
  border: 3px solid #000000;
  font-weight: 700;
}

.form-group {
  margin-bottom: 20px;
}
</style>
