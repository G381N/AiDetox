<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav v-if="isAuthenticated" class="navbar">
      <div class="navbar-content">
        <div class="navbar-brand">
          <h1 class="brand-title">📊 Project Manager</h1>
        </div>
        
        <div class="navbar-menu">
          <router-link to="/dashboard" class="nav-link" active-class="nav-link-active">
            🏠 Dashboard
          </router-link>
          <router-link to="/projects" class="nav-link" active-class="nav-link-active">
            📁 Projects
          </router-link>
        </div>
        
        <div class="navbar-user">
          <span class="user-name">👤 {{ currentUser?.name || 'User' }}</span>
          <button class="logout-btn" @click="handleLogout">
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main :class="{ 'with-navbar': isAuthenticated }">
      <router-view />
    </main>

    <!-- Global Notification Toast -->
    <div class="notification-container">
      <transition-group name="notification" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-toast"
          :class="`notification-${notification.type}`"
        >
          <div class="notification-content">
            <span class="notification-icon">{{ notification.icon }}</span>
            <div class="notification-text">
              <h4 class="notification-title">{{ notification.title }}</h4>
              <p class="notification-message">{{ notification.message }}</p>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { EventBus, EVENTS } from './bus/eventBus'

export default {
  name: 'App',
  data() {
    return {
      notifications: []
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'currentUser'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    
    handleLogout() {
      this.logout()
      this.$router.push('/login')
    },
    
    showNotification({ title, message, type = 'info', icon = 'ℹ️' }) {
      const id = Date.now()
      const notification = { id, title, message, type, icon }
      
      this.notifications.push(notification)
      
      setTimeout(() => {
        this.removeNotification(id)
      }, 4000)
    },
    
    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index !== -1) {
        this.notifications.splice(index, 1)
      }
    },
    
    setupEventListeners() {
      EventBus.$on(EVENTS.PROJECT_CREATED, (project) => {
        this.showNotification({
          title: 'Project Created',
          message: `${project.title} has been created successfully!`,
          type: 'success',
          icon: '✅'
        })
      })
      
      EventBus.$on(EVENTS.PROJECT_UPDATED, (project) => {
        this.showNotification({
          title: 'Project Updated',
          message: `${project.title} has been updated!`,
          type: 'info',
          icon: '📝'
        })
      })
      
      EventBus.$on(EVENTS.PROJECT_DELETED, () => {
        this.showNotification({
          title: 'Project Deleted',
          message: 'Project has been removed successfully.',
          type: 'warning',
          icon: '🗑️'
        })
      })
      
      EventBus.$on(EVENTS.TASK_CREATED, (task) => {
        this.showNotification({
          title: 'Task Created',
          message: `${task.title} has been added!`,
          type: 'success',
          icon: '✅'
        })
      })
      
      EventBus.$on(EVENTS.TASK_UPDATED, (task) => {
        this.showNotification({
          title: 'Task Updated',
          message: `${task.title} has been updated!`,
          type: 'info',
          icon: '📝'
        })
      })
      
      EventBus.$on(EVENTS.TASK_STATUS_CHANGED, ({ task }) => {
        this.showNotification({
          title: 'Status Changed',
          message: `${task.title} is now ${task.status}!`,
          type: 'info',
          icon: '🔄'
        })
      })
      
      EventBus.$on(EVENTS.TASK_DELETED, () => {
        this.showNotification({
          title: 'Task Deleted',
          message: 'Task has been removed.',
          type: 'warning',
          icon: '🗑️'
        })
      })
    }
  },
  mounted() {
    this.setupEventListeners()
  },
  beforeDestroy() {
    EventBus.$off()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #FFE951;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

/* Navbar Styles */
.navbar {
  background: #FFFFFF;
  border-bottom: 4px solid #000000;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.navbar-brand {
  flex-shrink: 0;
}

.brand-title {
  font-size: 28px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -1px;
}

.navbar-menu {
  display: flex;
  gap: 12px;
  flex: 1;
}

.nav-link {
  padding: 12px 24px;
  border-radius: 0;
  text-decoration: none;
  color: #000000;
  font-weight: 700;
  font-size: 15px;
  transition: all 0.2s ease;
  background: #FFFFFF;
  border: 3px solid #000000;
  box-shadow: 4px 4px 0 #000000;
  white-space: nowrap;
  text-transform: uppercase;
}

.nav-link:hover {
  background: #00F5FF;
  color: #000000;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.nav-link-active {
  background: #FF006E;
  color: #FFFFFF;
  box-shadow: 4px 4px 0 #000000;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.user-name {
  font-size: 14px;
  color: #4a5568;
  font-weight: 600;
}

.logout-btn {
  padding: 10px 20px;
  border: 3px solid #000000;
  border-radius: 0;
  background: #FF006E;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0 #000000;
  white-space: nowrap;
  text-transform: uppercase;
}

.logout-btn:hover {
  background: #8338EC;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

main {
  min-height: calc(100vh - 80px);
}

main.with-navbar {
  min-height: calc(100vh - 80px);
}

/* Notification Styles */
.notification-container {
  position: fixed;
  top: 100px;
  right: 30px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

.notification-toast {
  background: #FFFFFF;
  border-radius: 0;
  padding: 20px;
  box-shadow: 6px 6px 0 #000000;
  border: 4px solid #000000;
  min-width: 320px;
}

.notification-success {
  background: #00F5FF;
}

.notification-warning {
  background: #FFE951;
}

.notification-info {
  background: #FF006E;
}

.notification-content {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.notification-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.notification-text {
  flex: 1;
}

.notification-title {
  font-size: 16px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 4px 0;
  text-transform: uppercase;
}

.notification-message {
  font-size: 14px;
  color: #000000;
  margin: 0;
  line-height: 1.4;
  font-weight: 600;
}

/* Notification Animations */
.notification-enter-active {
  animation: slideIn 0.3s ease-out;
}

.notification-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .navbar-menu {
    flex-direction: column;
  }
  
  .navbar-user {
    justify-content: space-between;
  }
  
  .notification-container {
    right: 20px;
    left: 20px;
    max-width: none;
  }
  
  .notification-toast {
    min-width: auto;
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(145deg, #f7fafc, #e2e8f0);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(145deg, #cbd5e0, #a0aec0);
  border-radius: 10px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(145deg, #a0aec0, #718096);
}
</style>
