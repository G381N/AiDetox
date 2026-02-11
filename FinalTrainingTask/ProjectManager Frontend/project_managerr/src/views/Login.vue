<template>
  <div class="login-container mt-5">
    <b-card title="Login to Project Manager" class="mx-auto" style="max-width: 400px;">
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label="Email or Username:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.first_credential"
            required
            placeholder="Enter email or username"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>

        <b-button type="submit" variant="primary" block>Login</b-button>
        <div class="mt-3 text-center">
          Doesn't have an account? <router-link to="/register">Register</router-link>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
// Will implement auth store integration later
export default {
  data() {
    return {
      form: {
        first_credential: '',
        password: ''
      },
      error: null
    }
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('login', this.form);
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.response && err.response.data.detail ? err.response.data.detail : 'Login failed';
      }
    }
  }
}
</script>
