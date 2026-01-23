<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">

    <!-- Brand -->
    <b-navbar-brand :to="{ name: 'Dashboard' }">
      Hire3X
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>

        <b-nav-item :to="{ name: 'Dashboard' }">
          Dashboard
        </b-nav-item>

        <b-nav-item :to="{ name: 'UsersList' }">
          Users
        </b-nav-item>

      </b-navbar-nav>

      <!-- Right side -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="logout">
          Logout
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavbarComponent',
  methods: {
    logout() {
      // TEMP: routing only
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
</style>
