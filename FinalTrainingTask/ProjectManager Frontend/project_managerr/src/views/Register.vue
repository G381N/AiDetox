<template>
  <div class="register-container mt-5">
    <b-card title="Register New Account" class="mx-auto" style="max-width: 400px;">
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Username:" label-for="input-username">
          <b-form-input
            id="input-username"
            v-model="form.username"
            required
            placeholder="Choose a username"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Email:" label-for="input-email">
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password:" label-for="input-password">
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Confirm Password:" label-for="input-confirm">
          <b-form-input
            id="input-confirm"
            v-model="form.password_confirm"
            type="password"
            required
            placeholder="Repeat password"
          ></b-form-input>
        </b-form-group>

        <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>

        <b-button type="submit" variant="success" block>Register</b-button>
        <div class="mt-3 text-center">
          Already have an account? <router-link to="/login">Login</router-link>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password_confirm: ''
      },
      error: null
    }
  },
  methods: {
    async onSubmit() {
      if (this.form.password !== this.form.password_confirm) {
        this.error = "Passwords do not match!";
        return;
      }
      try {
        await this.$store.dispatch('register', this.form);
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.response && err.response.data.detail ? err.response.data.detail : 'Registration failed';
      }
    }
  }
}
</script>
