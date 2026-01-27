<template>
  <b-container class="mt-4">
    <b-row>
      <b-col>
        <h2>Dashboard</h2>
        <p>Welcome to your project manager.</p>

        <b-button variant="primary" @click="$router.push('/projects')">
          Go to Projects
        </b-button>

        <b-button
          variant="danger"
          class="ml-2"
          @click="logout"
        >
          Logout
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'DashboardView',

  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>
