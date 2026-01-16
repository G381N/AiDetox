<template>
  <section class="list">
    <p v-if="!users.length">No users added yet</p>

    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(u, i) in users" :key="u.email" :class="{'senior': u.age > 40}">
          <td>{{ u.name }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.age }}</td>
          <td><button @click="$emit('delete-user', i)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: 'UserList',
  props: { users: { type: Array, required: true } }
}
</script>

<style scoped>
table { width: 100%; border-collapse: collapse }
th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd }
.senior { background: #fff7e6 }
</style>
