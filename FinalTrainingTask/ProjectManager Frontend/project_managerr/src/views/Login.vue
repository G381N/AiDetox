<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card border-black shadow-hard p-4">
          <div class="card-header bg-warning border-black text-center mb-4">
              <h2 class="font-weight-black m-0 p-2">LOGIN</h2>
          </div>
          
          <b-form @submit.prevent="onSubmit">
            <b-form-group label="Username or Email" class="font-weight-bold">
              <b-form-input v-model="form.first_credential" required placeholder="Enter username or email" class="border-black p-3"></b-form-input>
            </b-form-group>
            
            <b-form-group label="Password" class="font-weight-bold">
              <b-form-input type="password" v-model="form.password" required placeholder="Enter password" class="border-black p-3"></b-form-input>
            </b-form-group>

            <b-alert v-if="error" show variant="danger" class="border-black font-weight-bold">{{ error }}</b-alert>
            
            <b-button type="submit" variant="primary" block size="lg" class="mt-4">Login Now</b-button>
          </b-form>

           <div class="text-center mt-3">
              <router-link to="/register" class="font-weight-bold text-dark" style="text-decoration: underline;">Don't have an account? Register here.</router-link>
          </div>
        </div>
      </div>
    </div>
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

<style scoped>
.border-black {
    border: 4px solid #000 !important;
}
.shadow-hard {
    box-shadow: 12px 12px 0 #000 !important;
}
.font-weight-black {
    font-weight: 900;
}
.bg-warning {
    background-color: #ffbe0b !important;
}
</style>
