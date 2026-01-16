<template>
  <header class="header">
    <h1>User Manager</h1>
    <p>Total users: {{ count }}</p>
  </header>
</template>

<script>
export default {
  name: 'HeaderComp',
  props: { count: { type: Number, required: true } }
}
</script>

<style scoped>
.header { margin-bottom: 12px }
.header h1 { margin: 0 0 4px }
</style>
