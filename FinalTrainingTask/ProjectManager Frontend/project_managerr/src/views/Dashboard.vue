<template>
  <div class="dashboard container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-5 p-4 border-black bg-white shadow-hard">
      <h1 class="font-weight-black m-0 text-uppercase">My Projects</h1>
      <b-button @click="openCreateModal" variant="primary" size="lg">Create Project +</b-button>
    </div>

    <!-- Project List -->
    <div v-if="loading" class="text-center">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    
    <div v-else-if="projects.length === 0" class="text-center text-muted">
      <p>No projects found. Create your first one!</p>
    </div>

    <b-row v-else>
      <b-col md="6" lg="4" v-for="project in projects" :key="project.id" class="mb-5">
        <b-card
          :title="project.name"
          tag="article"
          class="h-100 project-card"
        >
          <b-card-text>
            {{ project.description || 'No description provided.' }}
          </b-card-text>
          
          <template #footer>
            <div class="d-flex justify-content-between align-items-center w-100">
                <b-button :to="'/projects/' + project.id" variant="outline-primary" size="sm">View</b-button>
                <b-button @click="openEditModal(project)" variant="outline-secondary" size="sm">Edit</b-button>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>

    <!-- Modal for Creating/Editing Project -->
    <b-modal id="modal-project" :title="isEditing ? 'Edit Project' : 'Create New Project'" @ok="handleProjectSubmit" @hidden="resetModal">
      <b-form-group label="Project Name">
        <b-form-input v-model="form.name" required placeholder="Enter project name"></b-form-input>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea v-model="form.description" rows="3" placeholder="Enter project description"></b-form-textarea>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { EventBus } from '../bus/event-bus';

export default {
  data() {
    return {
      projects: [],
      loading: true,
      isEditing: false,
      editingId: null,
      form: {
        name: '',
        description: ''
      }
    }
  },
  async created() {
    await this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      this.loading = true;
      try {
        const response = await axios.get('/projects/');
        this.projects = response.data.results;
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        this.loading = false;
      }
    },
    openCreateModal() {
        this.isEditing = false;
        this.resetModal();
        this.$bvModal.show('modal-project');
    },
    openEditModal(project) {
        this.isEditing = true;
        this.editingId = project.id;
        this.form.name = project.name;
        this.form.description = project.description;
        this.$bvModal.show('modal-project');
    },
    resetModal() {
        this.form.name = '';
        this.form.description = '';
        this.editingId = null;
    },
    async handleProjectSubmit(bvModalEvt) {
      if (!this.form.name) {
        alert('Please enter a project name');
        bvModalEvt.preventDefault();
        return;
      }
      
      try {
        let response;
        if (this.isEditing) {
            response = await axios.put(`/projects/${this.editingId}/`, this.form);
            EventBus.$emit('project-updated', response.data); // Make sure to listen to this if needed, or just refresh
        } else {
            response = await axios.post('/projects/', this.form);
            EventBus.$emit('project-created', response.data);
        }
        
        await this.fetchProjects(); // Refresh list
        this.resetModal();
      } catch (error) {
        console.error("Error saving project", error);
        alert('Failed to save project');
      }
    }
  }
}
</script>



<style scoped>
.border-black {
    border: 4px solid #000;
}
.shadow-hard {
    box-shadow: 8px 8px 0 #000;
}
.font-weight-black {
    font-weight: 900;
}
.project-card {
    transition: transform 0.2s;
    background-color: #fff;
    border: 4px solid #000;
}
.project-card:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 #000 !important;
    background-color: #ff99c8 !important; /* Light Pink on hover for contrast */
}
</style>
