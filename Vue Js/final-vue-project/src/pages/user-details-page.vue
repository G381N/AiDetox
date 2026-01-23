<template>
  <b-container class="mt-4">

    <b class="d-block mb-3">
      User Details Page
    </b>

    <b-card>
      <p>
        <b>User ID:</b> {{ userId }}
      </p>

      <b-button
        variant="secondary"
        :to="{ name: 'UsersList' }"
      >
        Back to Users
      </b-button>
    </b-card>

  </b-container>
</template>

<script>
export default {
  name: 'UserDetailsPage',
  computed: {
    userId() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
/* keep empty */
</style>
