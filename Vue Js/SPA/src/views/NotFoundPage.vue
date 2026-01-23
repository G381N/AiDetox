<template>
  <!-- ============================================
       404 NOT FOUND PAGE TEMPLATE
       Displayed for any unmatched routes
       ============================================ -->
  <div class="not-found-page">
    <div class="content">
      <!-- Big 404 Text -->
      <h1 class="error-code">404</h1>
      
      <!-- Error Message -->
      <h2>Page Not Found</h2>
      <p class="message">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <!-- Navigation Links -->
      <div class="nav-links">
        <!-- Link to Dashboard (if logged in) -->
        <router-link to="/dashboard" class="primary-link">
          Go to Dashboard
        </router-link>
        
        <!-- Link to Login -->
        <router-link to="/login" class="secondary-link">
          Back to Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// ============================================
// NOT FOUND PAGE COMPONENT
// Simple 404 error page with navigation links
// ============================================

export default {
  // Component name for debugging
  name: 'NotFoundPage'
  
  // No data, methods, or computed needed
  // This is a simple static page
}
</script>

<style scoped>
/* ============================================
   404 PAGE STYLES
   ============================================ */

.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.content {
  text-align: center;
  color: white;
}

.error-code {
  font-size: 150px;
  font-weight: 800;
  margin: 0;
  line-height: 1;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.content h2 {
  font-size: 32px;
  margin: 20px 0 10px;
}

.message {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 40px;
}

.nav-links {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-link,
.secondary-link {
  padding: 14px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.primary-link {
  background: white;
  color: #667eea;
}

.secondary-link {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.primary-link:hover,
.secondary-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>
