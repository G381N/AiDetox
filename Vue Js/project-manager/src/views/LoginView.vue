<template>
  <b-container class="mt-5">
    <b-row align-h="center">
      <b-col cols="12" md="6">
        <b-card title="Login">
          <b-form @submit.prevent="handleLogin">

            <!-- Email -->
            <b-form-group label="Email">
              <b-form-input
                v-model.trim="$v.email.$model"
                type="email"
                placeholder="Enter email"
                :state="inputState($v.email)"
              />
              <b-form-invalid-feedback>
                Email is required and must be valid
              </b-form-invalid-feedback>
            </b-form-group>

            <!-- Password -->
            <b-form-group label="Password">
              <b-form-input
                v-model.trim="$v.password.$model"
                type="password"
                placeholder="Enter password"
                :state="inputState($v.password)"
              />
              <b-form-invalid-feedback>
                Password must be at least 6 characters
              </b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary" block>
              Login
            </b-button>

          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'LoginView',

  data() {
    return {
      email: '',
      password: ''
    }
  },

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },

  methods: {
    inputState(field) {
      if (!field.$dirty) return null
      return !field.$invalid
    },

    handleLogin() {
      this.$v.$touch()

      if (this.$v.$invalid) return

      // Fake login success
      const fakeToken = 'fake-jwt-token'

      this.$store.dispatch('auth/login', fakeToken)
      this.$router.push('/dashboard')
    }
  }
}
</script>
<style scoped>  </style>