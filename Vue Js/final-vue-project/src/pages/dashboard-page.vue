<template>
  <b-container class="mt-4">

    <b class="d-block mb-3">
      Dashboard Page
    </b>

    <b-card class="mb-3">
      <p>
        <b>Status:</b> Logged in
      </p>

      <p>
        <b>Message:</b> Welcome to the dashboard
      </p>
    </b-card>

    <b-button
      variant="primary"
      class="me-2"
      :to="{ name: 'UsersList' }"
    >
      Go to Users
    </b-button>

    <b-button
      variant="danger"
      @click="logout"
    >
      Logout
    </b-button>

  </b-container>
</template>

<script>
export default {
  name: 'DashboardPage',
  methods: {
    logout() {
      // TEMP: routing only
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
/* keep empty for now */
</style>
