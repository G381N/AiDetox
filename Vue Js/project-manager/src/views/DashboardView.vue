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
  background: linear-gradient(145deg, #667eea, #5a67d8);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  box-shadow: 
    0 2px 8px rgba(102, 126, 234, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.skeu-button-sm:hover {
  background: linear-gradient(145deg, #5a67d8, #4c51bf);
  transform: translateY(-2px);
  box-shadow: 
    0 4px 12px rgba(102, 126, 234, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-item {
  background: #FFE951;
  border-radius: 0;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 4px 4px 0 #000000;
  border: 3px solid #000000;
  transition: all 0.2s ease;
  cursor: pointer;
}

.project-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.project-info {
  flex: 1;
}

.project-name {
  font-size: 16px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 4px 0;
  text-transform: uppercase;
}

.project-desc {
  font-size: 13px;
  color: #000000;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
}

.project-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.project-status {
  padding: 6px 14px;
  border-radius: 0;
  font-size: 12px;
  font-weight: 900;
  white-space: nowrap;
  border: 2px solid #000000;
  text-transform: uppercase;
}

.status-in-progress {
  background: #00F5FF;
  color: #000000;
}

.status-planning {
  background: #FFE951;
  color: #000000;
}

.status-todo {
  background: #FFFFFF;
  color: #000000;
}

.status-completed {
  background: #8338EC;
  color: #FFFFFF;
}

.project-tasks {
  font-size: 13px;
  color: #718096;
  font-weight: 500;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border: 3px solid #000000;
  border-radius: 0;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0 #000000;
  text-transform: uppercase;
}

.action-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.action-button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #000000;
}

.action-primary {
  background: #8338EC;
  color: white;
}

.action-secondary {
  background: #00F5FF;
  color: #000000;
}

.action-info {
  background: #FF006E;
  color: white;
}

.action-icon {
  font-size: 20px;
}

.action-text {
  flex: 1;
  text-align: left;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #a0aec0;
}

.empty-state p {
  margin: 0;
  font-size: 15px;
}
</style>
