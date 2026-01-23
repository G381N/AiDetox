<template>
  <div class="notfound-wrapper">
    <div class="floating-shapes">
      <div class="shape"></div>
      <div class="shape"></div>
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    
    <div class="notfound-content">
      <div class="error-code">404</div>
      <h1 class="error-title">Page Not Found</h1>
      <p class="error-message">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <router-link :to="{ name: 'Login' }" class="btn-home">Go to Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>

<style scoped>
.notfound-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #111838 50%, #0a0e27 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.shape {
  position: absolute;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.1), transparent 70%);
  border-radius: 50%;
  filter: blur(50px);
}

.shape:nth-child(1) { width: 500px; height: 500px; top: -150px; right: -100px; animation: float 25s ease-in-out infinite; }
.shape:nth-child(2) { width: 400px; height: 400px; bottom: -100px; left: -100px; animation: float 30s ease-in-out infinite reverse; }
.shape:nth-child(3) { width: 350px; height: 350px; bottom: 20%; right: 10%; animation: float 20s ease-in-out infinite; }
.shape:nth-child(4) { width: 300px; height: 300px; top: 30%; left: 5%; animation: float 27s ease-in-out infinite reverse; }

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  33% { transform: translateY(-50px) translateX(40px); }
  66% { transform: translateY(30px) translateX(-30px); }
}

.notfound-content {
  text-align: center;
  z-index: 10;
  animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  max-width: 550px;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  color: rgba(0, 212, 255, 0.12);
  line-height: 0.9;
  margin: 0 0 1rem 0;
  letter-spacing: 2px;
  text-shadow: 0 0 60px rgba(0, 212, 255, 0.1);
}

.error-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 1rem 0;
  letter-spacing: 0.5px;
}

.error-message {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.65);
  margin: 0 0 2.5rem 0;
  line-height: 1.6;
  letter-spacing: 0.3px;
}

.btn-home {
  background: linear-gradient(135deg, #00d4ff, #0099ff);
  color: #0a0e27;
  border: none;
  border-radius: 12px;
  padding: 1rem 3rem;
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 12px 40px rgba(0, 212, 255, 0.25);
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}

.btn-home:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.35);
}

.btn-home:active {
  transform: translateY(-2px);
}
</style>
