<template>
  <div class="project-detail-view">
    <div v-if="project" class="project-detail-container">
      <!-- Project Header -->
      <div class="project-header">
        <div class="header-content">
          <b-button variant="link" class="back-btn" @click="$router.push('/projects')">
            ← Back to Projects
          </b-button>
          <h1 class="project-title">{{ project.title }}</h1>
          <p class="project-description">{{ project.description }}</p>
          
          <div class="project-meta">
            <span class="meta-item">
              <span class="meta-icon">📊</span>
              <span class="meta-label">Status:</span>
              <span class="project-status" :class="`status-${project.status.toLowerCase().replace(' ', '-')}`">
                {{ project.status }}
              </span>
            </span>
            <span class="meta-item">
              <span class="meta-icon">📅</span>
              <span class="meta-label">Due:</span>
              <span class="meta-value">{{ formatDate(project.dueDate) }}</span>
            </span>
            <span class="meta-item">
              <span class="meta-icon">📝</span>
              <span class="meta-label">Tasks:</span>
              <span class="meta-value">{{ project.tasks?.length || 0 }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Tasks Section -->
      <div class="tasks-section">
        <div class="section-header">
          <h2 class="section-title">Tasks</h2>
          <b-button variant="primary" class="skeu-button" @click="openCreateTaskModal">
            <span class="btn-icon">➕</span>
            New Task
          </b-button>
        </div>

        <div v-if="!project.tasks || project.tasks.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <h3>No Tasks Yet</h3>
          <p>Add your first task to get started!</p>
          <b-button variant="primary" class="skeu-button" @click="openCreateTaskModal">
            Create Task
          </b-button>
        </div>

        <b-tabs v-else content-class="mt-3" class="task-tabs">
          <b-tab title="📝 Todo" :active="activeTab === 0" @click="activeTab = 0">
            <div class="tasks-list">
              <task-card
                v-for="task in todoTasks"
                :key="task.id"
                :task="task"
                @edit="openEditTaskModal"
                @delete="confirmDeleteTask"
                @status-change="handleStatusChange"
              />
              <div v-if="todoTasks.length === 0" class="empty-tab">
                <p>No todo tasks</p>
              </div>
            </div>
          </b-tab>

          <b-tab title="🔄 In Progress" :active="activeTab === 1" @click="activeTab = 1">
            <div class="tasks-list">
              <task-card
                v-for="task in inProgressTasks"
                :key="task.id"
                :task="task"
                @edit="openEditTaskModal"
                @delete="confirmDeleteTask"
                @status-change="handleStatusChange"
              />
              <div v-if="inProgressTasks.length === 0" class="empty-tab">
                <p>No tasks in progress</p>
              </div>
            </div>
          </b-tab>

          <b-tab title="✅ Done" :active="activeTab === 2" @click="activeTab = 2">
            <div class="tasks-list">
              <task-card
                v-for="task in doneTasks"
                :key="task.id"
                :task="task"
                @edit="openEditTaskModal"
                @delete="confirmDeleteTask"
                @status-change="handleStatusChange"
              />
              <div v-if="doneTasks.length === 0" class="empty-tab">
                <p>No completed tasks</p>
              </div>
            </div>
          </b-tab>

          <b-tab title="📋 All Tasks" :active="activeTab === 3" @click="activeTab = 3">
            <div class="tasks-list">
              <task-card
                v-for="task in project.tasks"
                :key="task.id"
                :task="task"
                @edit="openEditTaskModal"
                @delete="confirmDeleteTask"
                @status-change="handleStatusChange"
              />
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>

    <div v-else class="loading-state">
      <b-spinner variant="primary"></b-spinner>
      <p>Loading project...</p>
    </div>

    <task-modal
      :show="showTaskModal"
      :task="selectedTask"
      @save="handleSaveTask"
      @close="closeTaskModal"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TaskCard from '@/components/Task/TaskCard.vue'
import TaskModal from '@/components/Task/TaskModal.vue'

export default {
  name: 'ProjectDetailView',
  components: {
    TaskCard,
    TaskModal
  },
  data() {
    return {
      showTaskModal: false,
      selectedTask: null,
      activeTab: 0,
      hasUnsavedChanges: false
    }
  },
  computed: {
    ...mapState('projects', ['activeProject', 'projects']),
    
    project() {
      return this.activeProject
    },
    
    todoTasks() {
      return this.project?.tasks?.filter(t => t.status === 'Todo') || []
    },
    
    inProgressTasks() {
      return this.project?.tasks?.filter(t => t.status === 'In Progress') || []
    },
    
    doneTasks() {
      return this.project?.tasks?.filter(t => t.status === 'Done') || []
    }
  },
  methods: {
    ...mapActions('projects', ['setActiveProject', 'createTask', 'updateTask', 'deleteTask', 'updateTaskStatus']),
    
    loadProject() {
      const projectId = parseInt(this.$route.params.id)
      const found = this.projects.find(p => p.id === projectId)
      
      if (found) {
        this.setActiveProject(found)
      } else {
        this.$router.push('/projects')
      }
    },
    
    openCreateTaskModal() {
      this.selectedTask = null
      this.showTaskModal = true
    },
    
    openEditTaskModal(task) {
      this.selectedTask = task
      this.showTaskModal = true
    },
    
    closeTaskModal() {
      this.showTaskModal = false
      this.selectedTask = null
    },
    
    async handleSaveTask(taskData) {
      try {
        if (taskData.id) {
          await this.updateTask({
            projectId: this.project.id,
            task: taskData
          })
        } else {
          await this.createTask({
            projectId: this.project.id,
            task: taskData
          })
        }
        this.hasUnsavedChanges = false
      } catch (error) {
        console.error('Error saving task:', error)
      }
    },
    
    async handleStatusChange({ task, newStatus, oldStatus }) {
      const updatedTask = { ...task, status: newStatus }
      try {
        await this.updateTaskStatus({
          projectId: this.project.id,
          task: updatedTask,
          oldStatus
        })
      } catch (error) {
        console.error('Error updating task status:', error)
      }
    },
    
    confirmDeleteTask(taskId) {
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this task?', {
        title: 'Confirm Delete',
        size: 'md',
        buttonSize: 'md',
        okVariant: 'danger',
        okTitle: 'Delete',
        cancelTitle: 'Cancel',
        centered: true
      }).then(value => {
        if (value) {
          this.handleDeleteTask(taskId)
        }
      })
    },
    
    async handleDeleteTask(taskId) {
      try {
        await this.deleteTask({
          projectId: this.project.id,
          taskId
        })
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    },
    
    formatDate(date) {
      if (!date) return 'No date set'
      const d = new Date(date)
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.hasUnsavedChanges) {
      this.$bvModal.msgBoxConfirm('You have unsaved changes. Are you sure you want to leave?', {
        title: 'Unsaved Changes',
        size: 'md',
        buttonSize: 'md',
        okVariant: 'danger',
        okTitle: 'Leave',
        cancelTitle: 'Stay',
        centered: true
      }).then(value => {
        next(value)
      })
    } else {
      next()
    }
  },
  mounted() {
    this.loadProject()
  },
  watch: {
    '$route.params.id'() {
      this.loadProject()
    }
  }
}
</script>

<style scoped>
.project-detail-view {
  padding: 30px;
  min-height: calc(100vh - 80px);
  background: #8338EC;
}

.project-header,
.tasks-section {
  background: #FFE951;
  border: 5px solid #000000;
  box-shadow: 12px 12px 0 #000000;
  padding: 30px;
  margin-bottom: 30px;
}

.back-btn {
  color: #000000;
  font-weight: 900;
  padding: 8px 16px;
  margin-bottom: 16px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s ease;
  background: #8338EC;
  color: #FFFFFF;
  border: 3px solid #000000;
  box-shadow: 4px 4px 0 #000000;
  text-transform: uppercase;
}

.back-btn:hover {
  color: #000000;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
  background: #00F5FF;
}

.project-title {
  font-size: 40px;
  font-weight: 900;
  color: #000000;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: -2px;
}

.project-description {
  font-size: 16px;
  color: #000000;
  margin-bottom: 20px;
  line-height: 1.6;
  font-weight: 700;
}

.project-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-icon {
  font-size: 18px;
}

.meta-label {
  font-size: 14px;
  color: #a0aec0;
  font-weight: 500;
}

.meta-value {
  font-size: 14px;
  color: #2d3748;
  font-weight: 600;
}

.project-status {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.status-in-progress {
  background: linear-gradient(145deg, #bee3f8, #90cdf4);
  color: #2c5282;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.status-planning {
  background: linear-gradient(145deg, #feebc8, #fbd38d);
  color: #744210;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.status-todo {
  background: linear-gradient(145deg, #e2e8f0, #cbd5e0);
  color: #2d3748;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.status-completed {
  background: linear-gradient(145deg, #c6f6d5, #9ae6b4);
  color: #22543d;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.tasks-section {
  background: #FFFFFF;
  border-radius: 0;
  padding: 30px;
  box-shadow: 8px 8px 0 #000000;
  border: 4px solid #000000;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.section-title {
  font-size: 32px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  text-transform: uppercase;
}

.skeu-button {
  background: #FF006E;
  border: 4px solid #000000;
  border-radius: 0;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 900;
  color: white;
  box-shadow: 6px 6px 0 #000000;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
}

.skeu-button:hover {
  background: #00F5FF;
  color: #000000;
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #000000;
}

.btn-icon {
  font-size: 18px;
}

.task-tabs {
  margin-top: 20px;
}

.task-tabs >>> .nav-tabs {
  border: none;
  gap: 8px;
}

.task-tabs >>> .nav-link {
  background: linear-gradient(145deg, #f7fafc, #e2e8f0);
  border: 1px solid #e2e8f0;
  border-radius: 10px 10px 0 0;
  color: #718096;
  font-weight: 600;
  padding: 12px 20px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.task-tabs >>> .nav-link:hover {
  background: linear-gradient(145deg, #e2e8f0, #cbd5e0);
  color: #2d3748;
}

.task-tabs >>> .nav-link.active {
  background: linear-gradient(145deg, #667eea, #5a67d8);
  color: white;
  border-color: #667eea;
  box-shadow: 
    0 4px 12px rgba(102, 126, 234, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.tasks-list {
  padding: 20px 0;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
}

.empty-state p {
  font-size: 14px;
  color: #718096;
  margin-bottom: 20px;
}

.empty-tab {
  text-align: center;
  padding: 40px 20px;
  color: #a0aec0;
}

.empty-tab p {
  margin: 0;
  font-size: 15px;
}

.loading-state {
  text-align: center;
  padding: 80px 20px;
  color: #718096;
}

.loading-state p {
  margin-top: 16px;
  font-size: 16px;
}
</style>
