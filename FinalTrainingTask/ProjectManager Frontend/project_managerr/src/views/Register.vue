<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card border-black shadow-hard p-4">
          <div class="card-header bg-secondary border-black text-center mb-4">
              <h2 class="font-weight-black m-0 p-2 text-white">REGISTER</h2>
          </div>
          
          <b-form @submit.prevent="onSubmit">
            <b-form-group label="Username" class="font-weight-bold">
              <b-form-input v-model="form.username" required placeholder="Choose a username" class="border-black p-3"></b-form-input>
            </b-form-group>
            
            <b-form-group label="Email" class="font-weight-bold">
              <b-form-input type="email" v-model="form.email" required placeholder="Enter your email" class="border-black p-3"></b-form-input>
            </b-form-group>
            
            <b-form-group label="Password" class="font-weight-bold">
              <b-form-input type="password" v-model="form.password" required placeholder="Choose a password" class="border-black p-3"></b-form-input>
            </b-form-group>

            <b-form-group label="Confirm Password" class="font-weight-bold">
               <b-form-input type="password" v-model="form.password_confirm" required placeholder="Confirm password" class="border-black p-3"></b-form-input>
            </b-form-group>

            <b-alert v-if="error" show variant="danger" class="mt-3 border-black font-weight-bold">{{ error }}</b-alert>
            
            <b-button type="submit" variant="success" block size="lg" class="mt-4">Create Account</b-button>
          </b-form>

           <div class="text-center mt-3">
              <router-link to="/login" class="font-weight-bold text-dark" style="text-decoration: underline;">Already have an account? Login here.</router-link>
          </div>
        </div>
      </div>
    </div>
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
.bg-secondary {
    background-color: #ff006e !important; /* Pink for variety */
}
</style>
