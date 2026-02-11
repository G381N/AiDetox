<template>
  <div id="app">
    <NavBar />
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  created() {
    // If token exists in local storage, set auth header
    const token = this.$store.state.token;
    if (token) {
        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #f8f9fa;
  min-height: 100vh;
}
</style>
