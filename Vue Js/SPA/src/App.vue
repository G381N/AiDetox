<template>
  <!-- ============================================
       ROOT APP COMPONENT TEMPLATE
       Contains the router-view where pages render
       ============================================ -->
  <div id="app">
    <!-- 
      ROUTER-VIEW
      This is where the matched route component renders
      When URL is /login, LoginPage renders here
      When URL is /dashboard, DashboardPage renders here
      etc.
    -->
    <router-view />
  </div>
</template>

<script>
// ============================================
// ROOT APP COMPONENT
// The main wrapper component for the application
// ============================================

export default {
  // Component name for debugging
  name: 'App'
  
  // No additional logic needed
  // The router-view handles all page rendering
}
</script>

<style>
/* ============================================
   GLOBAL STYLES (not scoped)
   Applied to entire application
   ============================================ */

/* Reset default margins and padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Base body styles */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
               Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 
               sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f7fa;
  color: #333;
}

/* Remove default link colors for router-link */
a {
  color: inherit;
}

/* Default button reset */
button {
  font-family: inherit;
}
</style>
