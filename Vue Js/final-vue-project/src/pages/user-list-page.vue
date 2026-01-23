<template>
  <b-container class="mt-4">

    <b class="d-block mb-3">
      Users List Page
    </b>

    <b-list-group>
      <b-list-group-item
        v-for="user in users"
        :key="user.id"
        class="d-flex justify-content-between align-items-center"
      >
        <span>
          <b>{{ user.name }}</b>
        </span>

        <b-button
          size="sm"
          variant="primary"
          :to="{ name: 'UserDetails', params: { id: user.id } }"
        >
          View
        </b-button>
      </b-list-group-item>
    </b-list-group>

  </b-container>
</template>

<script>
export default {
  name: 'UsersListPage',
  data() {
    return {
      users: [
        { id: 1, name: 'User One' },
        { id: 2, name: 'User Two' },
        { id: 3, name: 'User Three' }
      ]
    }
  }
}
</script>

<style scoped>
/* keep empty */
</style>
