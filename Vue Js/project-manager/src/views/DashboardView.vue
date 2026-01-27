<template>
  <div class="dashboard-view">
    <div class="dashboard-header">
      <h1 class="dashboard-title">Dashboard</h1>
      <p class="dashboard-subtitle">Welcome back, {{ currentUser?.name || 'User' }}!</p>
    </div>

    <b-row class="stats-row">
      <b-col lg="4" md="6" class="mb-4">
        <div class="stat-card stat-card-primary">
          <div class="stat-icon">
            <span>📊</span>
          </div>
          <div class="stat-content">
            <h3 class="stat-value">{{ projectCount }}</h3>
            <p class="stat-label">Total Projects</p>
          </div>
        </div>
      </b-col>

      <b-col lg="4" md="6" class="mb-4">
        <div class="stat-card stat-card-success">
          <div class="stat-icon">
            <span>✅</span>
          </div>
          <div class="stat-content">
            <h3 class="stat-value">{{ completedTaskCount }}</h3>
            <p class="stat-label">Completed Tasks</p>
          </div>
        </div>
      </b-col>

      <b-col lg="4" md="6" class="mb-4">
        <div class="stat-card stat-card-warning">
          <div class="stat-icon">
            <span>📝</span>
          </div>
          <div class="stat-content">
            <h3 class="stat-value">{{ totalTaskCount }}</h3>
            <p class="stat-label">Total Tasks</p>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col lg="8" class="mb-4">
        <div class="content-card">
          <div class="card-title-bar">
            <h3 class="card-title">Recent Projects</h3>
            <b-button variant="primary" size="sm" class="skeu-button-sm" @click="$router.push('/projects')">
              View All
            </b-button>
          </div>
          <div v-if="projects.length > 0" class="projects-list">
            <div v-for="project in recentProjects" :key="project.id" class="project-item" @click="viewProject(project)">
              <div class="project-info">
                <h4 class="project-name">{{ project.title }}</h4>
                <p class="project-desc">{{ project.description }}</p>
              </div>
              <div class="project-meta">
                <span class="project-status" :class="`status-${project.status.toLowerCase().replace(' ', '-')}`">
                  {{ project.status }}
                </span>
                <span class="project-tasks">{{ project.tasks?.length || 0 }} tasks</span>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <p>No projects yet. Create your first project!</p>
          </div>
        </div>
      </b-col>

      <b-col lg="4" class="mb-4">
        <div class="content-card">
          <h3 class="card-title">Quick Actions</h3>
          <div class="quick-actions">
            <button class="action-button action-primary" @click="$router.push('/projects')">
              <span class="action-icon">➕</span>
              <span class="action-text">New Project</span>
            </button>
            <button class="action-button action-secondary" @click="$router.push('/projects')">
              <span class="action-icon">📋</span>
              <span class="action-text">View Projects</span>
            </button>
            <button class="action-button action-info" @click="loadProjects">
              <span class="action-icon">🔄</span>
              <span class="action-text">Refresh Data</span>
            </button>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'DashboardView',
  
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('projects', ['projects']),
    ...mapGetters('auth', { currentUser: 'currentUser' }),
    ...mapGetters('projects', ['projectCount', 'completedTaskCount', 'totalTaskCount']),
    
    recentProjects() {
      return this.projects.slice(0, 5)
    }
  },

  methods: {
    ...mapActions('projects', ['fetchProjects']),
    
    async loadProjects() {
      try {
        await this.fetchProjects()
      } catch (error) {
        console.error('Error loading projects:', error)
      }
    },
    
    viewProject(project) {
      this.$router.push(`/projects/${project.id}`)
    }
  },

  mounted() {
    this.loadProjects()
  }
}
</script>

<style scoped>
.dashboard-view {
  padding: 30px;
  min-height: calc(100vh - 80px);
  background: #FFE951;
  overflow: hidden;
  position: relative;
}

.dashboard-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    rgba(0,0,0,0),
    rgba(0,0,0,0) 20px,
    rgba(0,0,0,0.1) 20px,
    rgba(0,0,0,0.1) 40px
  );
  animation: slide 60s linear infinite;
  z-index: 0;
}

@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.dashboard-header, .stats-row, .mt-4 {
  position: relative;
  z-index: 1;
}

.dashboard-header {
  margin-bottom: 30px;
}

.dashboard-title {
  font-size: 48px;
  font-weight: 900;
  color: #000000;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: -2px;
}

.dashboard-subtitle {
  font-size: 18px;
  color: #000000;
  margin: 0;
  font-weight: 700;
}

.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  background: #FFFFFF;
  border-radius: 0;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 8px 8px 0 #000000;
  border: 4px solid #000000;
  transition: all 0.2s ease;
  cursor: pointer;
  height: 100%;
}

.stat-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 #000000;
}

.stat-icon {
  width: 70px;
  height: 70px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  border: 3px solid #000000;
  box-shadow: 4px 4px 0 #000000;
}

.stat-card-primary .stat-icon {
  background: #8338EC;
}

.stat-card-success .stat-icon {
  background: #00F5FF;
}

.stat-card-warning .stat-icon {
  background: #FF006E;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 42px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  color: #000000;
  margin: 8px 0 0 0;
  font-weight: 700;
  text-transform: uppercase;
}

.content-card {
  background: #FFFFFF;
  border-radius: 0;
  padding: 24px;
  box-shadow: 8px 8px 0 #000000;
  border: 4px solid #000000;
  height: 100%;
}

.card-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 24px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  text-transform: uppercase;
}

.skeu-button-sm {
  background: #8338EC;
  border: 3px solid #000000;
  border-radius: 0;
  padding: 8px 20px;
  font-weight: 900;
  box-shadow: 4px 4px 0 #000000;
  text-transform: uppercase;
  color: white;
  font-size: 14px;
}

.skeu-button-sm:hover {
  background: #FF006E;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.project-item {
  background: #FFE951;
  border: 4px solid #000000;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 8px 8px 0 #000000;
}

.project-item:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 #000000;
  background: #00F5FF;
}

.project-info {
  flex: 1;
}

.project-name {
  font-size: 20px;
  font-weight: 900;
  margin: 0 0 4px 0;
  text-transform: uppercase;
  color: #000000;
}

.project-desc {
  font-size: 14px;
  color: #000000;
  margin: 0;
  font-weight: 600;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  margin-left: 20px;
}

.project-status {
  padding: 6px 12px;
  border: 3px solid #000000;
  font-weight: 900;
  font-size: 12px;
  text-transform: uppercase;
  background: #FFFFFF;
  color: #000000;
}

.project-status.status-in-progress {
  background: #00F5FF;
  box-shadow: 4px 4px 0 #000000;
}

.project-tasks {
  font-size: 14px;
  font-weight: 700;
  color: #000000;
}

.empty-state {
  padding: 40px;
  text-align: center;
  font-weight: 700;
  color: #000000;
  background: #FFFFFF;
  border: 4px solid #000000;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}

.action-button {
  width: 100%;
  padding: 20px;
  border: 4px solid #000000;
  border-radius: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 8px 8px 0 #000000;
}

.action-button:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 #000000;
}

.action-button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #000000;
}

.action-icon {
  font-size: 24px;
}

.action-primary {
  background: #FF006E;
  color: #FFFFFF;
}
.action-primary:hover {
  background: #00F5FF;
  color: #000000;
}

.action-secondary {
  background: #8338EC;
  color: #FFFFFF;
}
.action-secondary:hover {
  background: #FFE951;
  color: #000000;
}

.action-info {
  background: #00F5FF;
  color: #000000;
}
.action-info:hover {
  background: #FF006E;
  color: #FFFFFF;
}
</style>
