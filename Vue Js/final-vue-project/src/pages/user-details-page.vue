<template>
  <div class="details-wrapper">
    <div class="container-fluid px-5 py-5">
      
      <router-link :to="{ name: 'UserListPage' }" class="back-link">
        ← Back to Team
      </router-link>

      <div class="profile-layout">
        <div class="profile-sidebar">
          <div class="profile-card">
            <div class="profile-avatar">{{ user.name.charAt(0) }}</div>
            <h2 class="profile-name">{{ user.name }}</h2>
            <p class="profile-role">{{ user.role }}</p>
            <div class="profile-stats">
              <div class="stat">
                <div class="stat-val">{{ user.projects }}</div>
                <div class="stat-lbl">Projects</div>
              </div>
              <div class="stat">
                <div class="stat-val">{{ user.tasks }}</div>
                <div class="stat-lbl">Tasks</div>
              </div>
              <div class="stat">
                <div class="stat-val">{{ user.rating }}</div>
                <div class="stat-lbl">Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-main">
          <div class="info-card">
            <h3 class="card-title">Contact Information</h3>
            
            <div class="info-row">
              <div class="info-label">Email Address</div>
              <div class="info-value">{{ user.email }}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Phone Number</div>
              <div class="info-value">{{ user.phone }}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Location</div>
              <div class="info-value">{{ user.location }}</div>
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn btn-secondary">Edit Profile</button>
            <router-link :to="{ name: 'UserListPage' }" class="btn btn-primary">Back to List</router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetailsPage',
  data() {
    return {
      usersData: {
        1: { name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', location: 'New York, USA', role: 'Administrator', projects: 12, tasks: 48, rating: '4.9' },
        2: { name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 891', location: 'Los Angeles, USA', role: 'Developer', projects: 8, tasks: 32, rating: '4.7' },
        3: { name: 'Bob Wilson', email: 'bob@example.com', phone: '+1 234 567 892', location: 'Chicago, USA', role: 'Designer', projects: 15, tasks: 56, rating: '4.8' },
        4: { name: 'Alice Brown', email: 'alice@example.com', phone: '+1 234 567 893', location: 'Houston, USA', role: 'Manager', projects: 6, tasks: 24, rating: '4.6' },
        5: { name: 'Charlie Davis', email: 'charlie@example.com', phone: '+1 234 567 894', location: 'Miami, USA', role: 'Developer', projects: 10, tasks: 40, rating: '4.5' }
      }
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
    user() {
      return this.usersData[this.userId] || { name: 'Unknown', email: 'N/A', phone: 'N/A', location: 'N/A', role: 'N/A', projects: 0, tasks: 0, rating: 'N/A' }
    }
  }
}
</script>

<style scoped>
.details-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #111838 50%, #0a0e27 100%);
  padding: 2rem 0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: #00d4ff;
  font-weight: 700;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: all 0.3s;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.back-link:hover {
  color: #00e5ff;
  transform: translateX(-8px);
}

.profile-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  animation: fadeIn 0.6s ease-out;
}

@media (max-width: 768px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.profile-card {
  background: rgba(20, 30, 60, 0.4);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: 18px;
  padding: 2rem 1.5rem;
  backdrop-filter: blur(20px);
  text-align: center;
  position: sticky;
  top: 2rem;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 18px;
  background: linear-gradient(135deg, #00d4ff, #667eea);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
  color: #fff;
  font-weight: 800;
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.2);
}

.profile-name {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.5px;
}

.profile-role {
  color: rgba(0, 212, 255, 0.8);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
}

.profile-stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 212, 255, 0.1);
}

.stat {
  text-align: center;
}

.stat-val {
  color: #00d4ff;
  font-size: 1.3rem;
  font-weight: 800;
}

.stat-lbl {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.3rem;
}

.profile-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background: rgba(20, 30, 60, 0.4);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: 18px;
  padding: 2rem;
  backdrop-filter: blur(20px);
}

.card-title {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.5px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 212, 255, 0.08);
  transition: all 0.3s;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row:hover {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.info-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-value {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
}

.btn {
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
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
