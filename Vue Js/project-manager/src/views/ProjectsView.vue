<template>
  <div class="projects-view">
    <div class="projects-header">
      <div>
        <h1 class="projects-title">Projects</h1>
        <p class="projects-subtitle">Manage all your projects in one place</p>
      </div>
      <b-button variant="primary" class="skeu-button create-btn" @click="openCreateModal">
        <span class="btn-icon">➕</span>
        New Project
      </b-button>
    </div>

    <div v-if="loading" class="loading-state">
      <b-spinner variant="primary"></b-spinner>
      <p>Loading projects...</p>
    </div>

    <div v-else-if="projects.length === 0" class="empty-state">
      <div class="empty-icon">📋</div>
      <h3>No Projects Yet</h3>
      <p>Create your first project to get started!</p>
      <b-button variant="primary" class="skeu-button" @click="openCreateModal">
        Create Project
      </b-button>
    </div>

    <b-row v-else class="projects-grid">
      <b-col 
        v-for="project in projects" 
        :key="project.id" 
        lg="4" 
        md="6" 
        class="mb-4"
      >
        <project-card
          :project="project"
          @view="viewProject"
          @edit="openEditModal"
          @delete="confirmDelete"
        />
      </b-col>
    </b-row>

    <project-modal
      :show="showModal"
      :project="selectedProject"
      @save="handleSave"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProjectCard from '@/components/Project/ProjectCard.vue'
import ProjectModal from '@/components/Project/ProjectModal.vue'

export default {
  name: 'ProjectsView',
  components: {
    ProjectCard,
    ProjectModal
  },
  data() {
    return {
      loading: false,
      showModal: false,
      selectedProject: null
    }
  },
  computed: {
    ...mapState('projects', ['projects'])
  },
  methods: {
    ...mapActions('projects', ['fetchProjects', 'createProject', 'updateProject', 'deleteProject', 'setActiveProject']),
    
    async loadProjects() {
      this.loading = true
      try {
        await this.fetchProjects()
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        this.loading = false
      }
    },
    
    openCreateModal() {
      this.selectedProject = null
      this.showModal = true
    },
    
    openEditModal(project) {
      this.selectedProject = project
      this.showModal = true
    },
    
    closeModal() {
      this.showModal = false
      this.selectedProject = null
    },
    
    async handleSave(projectData) {
      try {
        if (projectData.id) {
          await this.updateProject(projectData)
        } else {
          await this.createProject(projectData)
        }
      } catch (error) {
        console.error('Error saving project:', error)
      }
    },
    
    viewProject(project) {
      this.setActiveProject(project)
      this.$router.push(`/projects/${project.id}`)
    },
    
    confirmDelete(projectId) {
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this project? This action cannot be undone.', {
        title: 'Confirm Delete',
        size: 'md',
        buttonSize: 'md',
        okVariant: 'danger',
        okTitle: 'Delete',
        cancelTitle: 'Cancel',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }).then(value => {
        if (value) {
          this.handleDelete(projectId)
        }
      })
    },
    
    async handleDelete(projectId) {
      try {
        await this.deleteProject(projectId)
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  },
  mounted() {
    this.loadProjects()
  }
}
</script>

<style scoped>
.projects-view {
  padding: 30px;
  min-height: calc(100vh - 80px);
  background: #00F5FF;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.projects-title {
  font-size: 48px;
  font-weight: 900;
  color: #000000;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: -2px;
}

.projects-subtitle {
  font-size: 16px;
  color: #000000;
  margin: 0;
  font-weight: 700;
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
  background: #8338EC;
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #000000;
}

.skeu-button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #000000;
}

.btn-icon {
  font-size: 20px;
}

.create-btn {
  white-space: nowrap;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #000000;
  font-weight: 700;
}

.loading-state p {
  margin-top: 16px;
  font-size: 16px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: #FFFFFF;
  border-radius: 0;
  box-shadow: 8px 8px 0 #000000;
  border: 4px solid #000000;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 28px;
  font-weight: 900;
  color: #000000;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.empty-state p {
  font-size: 16px;
  color: #000000;
  margin-bottom: 24px;
  font-weight: 700;
}

.projects-grid {
  margin-top: 0;
}
</style>
