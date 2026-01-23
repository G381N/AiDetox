<template>
  <b-container class="mt-5">
    <b-row align-h="center">
      <b-col cols="12" md="4">

        <b class="d-block text-center mb-3">
          Login Page
        </b>

        <b-form @submit.prevent="handleLogin">
        <!-- handleLogin method is called when the form is submitted and the default form submission is prevented -->

          <b-form-group label="Email">
            <b-form-input
              type="email"
              v-model="email"
              placeholder="Enter email"
              required
            />
          </b-form-group>

          <b-form-group label="Password">
            <b-form-input
              type="password"
              v-model="password"
              placeholder="Enter password"
              required
            />
          </b-form-group>

          <b-button
            type="submit"
            variant="primary"
            block
          >
            Login
          </b-button>

        </b-form>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // TEMP: routing test
      this.$router.push('/dashboard')
    }
  }
}
</script>
