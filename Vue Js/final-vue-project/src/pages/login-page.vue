<template>
  <div class="login-wrapper">
    <div class="floating-shapes">
      <div class="shape"></div>
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    
    <div class="login-card">
      <div class="logo-section">
        <div class="logo">⚡</div>
        <h1 class="logo-text">Hire3X</h1>
      </div>

      <div class="form-header">
        <h2>Welcome Back</h2>
        <p>Sign in to access your dashboard</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            type="email"
            class="form-input"
            v-model="email"
            placeholder="name@company.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            class="form-input"
            v-model="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="btn-login">Sign In</button>
      </form>

      <div class="login-footer">
        <p>Don't have an account? <a href="#">Create one</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // TEMP: routing test
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a3f 25%, #16213e 50%, #0f3460 75%, #16213e 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.shape {
  position: absolute;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
}

.shape:nth-child(1) {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -50px;
  animation: float 20s ease-in-out infinite;
}

.shape:nth-child(2) {
  width: 300px;
  height: 300px;
  bottom: -50px;
  left: -50px;
  animation: float 25s ease-in-out infinite reverse;
}

.shape:nth-child(3) {
  width: 250px;
  height: 250px;
  bottom: 20%;
  right: 10%;
  animation: float 15s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
  33% { transform: translateY(-30px) translateX(30px) rotate(120deg); }
  66% { transform: translateY(20px) translateX(-20px) rotate(240deg); }
}

.login-card {
  background: rgba(20, 20, 40, 0.7);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border-radius: 30px;
  padding: 3.5rem;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              0 0 60px rgba(0, 212, 255, 0.1);
  max-width: 450px;
  width: 100%;
  animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  position: relative;
  z-index: 10;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-title {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00d4ff, #0099ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.login-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
}

.form-control {
  background: rgba(255, 255, 255, 0.05);
  border: 1.5px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  padding: 1rem 1.2rem;
  font-size: 1rem;
  color: #fff;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  backdrop-filter: blur(10px);
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-control:focus {
  border-color: #00d4ff;
  background: rgba(0, 212, 255, 0.08);
  box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.15),
              inset 0 0 20px rgba(0, 212, 255, 0.05);
  outline: none;
}

.form-group label {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.btn-login {
  background: linear-gradient(135deg, #00d4ff 0%, #0099ff 50%, #667eea 100%);
  border: none;
  border-radius: 15px;
  padding: 1.1rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #fff;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  box-shadow: 0 10px 40px rgba(0, 212, 255, 0.3),
              0 0 60px rgba(0, 212, 255, 0.1);
  width: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-login::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
  z-index: 1;
}

.btn-login:hover::before {
  left: 100%;
}

.btn-login:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.4),
              0 0 100px rgba(0, 212, 255, 0.2);
}

.btn-login:active {
  transform: translateY(-1px);
}
</style>
