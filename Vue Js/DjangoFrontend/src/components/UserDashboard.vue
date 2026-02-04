<template>
  <b-card class="custom-card shadow-sm text-center p-4">
    <h2 class="mb-4 welcome-text">Welcome Back!</h2>
    <p class="text-muted mb-4">You have successfully logged in to the system.</p>
    
    <b-alert show variant="success" class="mb-4">
      <b-icon icon="check-circle-fill" class="mr-2"></b-icon>
      Session Active
    </b-alert>
    
    <!-- Optional: Display user info if available -->
    
    <b-button 
      block 
      class="btn-primary-custom" 
      @click="$emit('logout')"
    >
      Logout
    </b-button>
  </b-card>
</template>

<script>
export default {
  name: 'UserDashboard'
}
</script>

<style scoped>
/* Scoped styles if specific tweaks are needed, 
   otherwise inherits from global custom.css */
</style>
