<template>
  <div class="dashboard-wrapper">
    <div class="container-fluid px-5 py-5">
      
      <div class="dashboard-top">
        <div class="header-content">
          <h1 class="page-title">Dashboard</h1>
          <p class="page-subtitle">Welcome back, here's your overview</p>
        </div>
        <button class="btn-logout" @click="logout">Sign Out</button>
      </div>

      <div class="stats-grid">
        <div class="stat-card" style="animation-delay: 0s">
          <div class="stat-icon purple">👥</div>
          <div class="stat-content">
            <div class="stat-value">24</div>
            <div class="stat-label">Total Users</div>
          </div>
          <div class="stat-trend">+4.2%</div>
        </div>

        <div class="stat-card" style="animation-delay: 0.1s">
          <div class="stat-icon blue">📊</div>
          <div class="stat-content">
            <div class="stat-value">142</div>
            <div class="stat-label">Total Reports</div>
          </div>
          <div class="stat-trend">+12.1%</div>
        </div>

        <div class="stat-card" style="animation-delay: 0.2s">
          <div class="stat-icon green">✓</div>
          <div class="stat-content">
            <div class="stat-value">89%</div>
            <div class="stat-label">Completion Rate</div>
          </div>
          <div class="stat-trend">+2.4%</div>
        </div>

        <div class="stat-card" style="animation-delay: 0.3s">
          <div class="stat-icon orange">⭐</div>
          <div class="stat-content">
            <div class="stat-value">4.8</div>
            <div class="stat-label">Avg Rating</div>
          </div>
          <div class="stat-trend">+0.3%</div>
        </div>
      </div>

      <div class="dashboard-footer">
        <router-link :to="{ name: 'UserListPage' }" class="btn btn-primary">Manage Users</router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  methods: {
    logout() {
      // TEMP: routing only
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.dashboard-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #111838 50%, #0a0e27 100%);
  padding-top: 2rem;
}

.dashboard-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.5px;
}

.page-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.05rem;
  margin: 0;
  font-weight: 400;
}

.btn-logout {
  background: rgba(255, 67, 67, 0.15);
  border: 1px solid rgba(255, 67, 67, 0.3);
  color: #ff6b6b;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-logout:hover {
  background: rgba(255, 67, 67, 0.25);
  border-color: rgba(255, 67, 67, 0.5);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: rgba(20, 30, 60, 0.4);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: 18px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  animation: fadeInUp 0.6s ease-out both;
  position: relative;
  overflow: hidden;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.stat-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent);
  border-radius: 50%;
  filter: blur(30px);
  transition: all 0.4s ease;
}

.stat-card:hover {
  transform: translateY(-8px);
  border-color: rgba(0, 212, 255, 0.3);
  background: rgba(20, 40, 80, 0.5);
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.1);
}

.stat-card:hover::before {
  width: 300px;
  height: 300px;
  right: -30%;
  top: -30%;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.2) rotate(-5deg);
}

.stat-icon.purple { background: linear-gradient(135deg, #667eea, #764ba2); }
.stat-icon.blue { background: linear-gradient(135deg, #00d4ff, #0099ff); }
.stat-icon.green { background: linear-gradient(135deg, #00d084, #00ff88); }
.stat-icon.orange { background: linear-gradient(135deg, #ff6b6b, #ffd93d); }

.stat-content {
  position: relative;
  z-index: 1;
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  letter-spacing: 0.5px;
}

.stat-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 600;
  margin-top: 0.4rem;
}

.stat-trend {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  color: #00ff88;
  font-weight: 700;
  font-size: 0.9rem;
  z-index: 1;
}

.dashboard-footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9rem;
}

.btn-primary {
  background: linear-gradient(135deg, #00d4ff, #0099ff);
  color: #0a0e27;
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 45px rgba(0, 212, 255, 0.3);
}

.btn-secondary {
  background: transparent;
  border: 1.5px solid rgba(0, 212, 255, 0.3);
  color: #00d4ff;
}

.btn-secondary:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.6);
}
</style>
