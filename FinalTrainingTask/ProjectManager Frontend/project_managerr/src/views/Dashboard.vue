<template>
  <div class="dashboard container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>My Projects</h2>
      <b-button v-b-modal.modal-create-project variant="primary">Create Project</b-button>
    </div>

    <!-- Project List -->
    <div v-if="loading" class="text-center">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    
    <div v-else-if="projects.length === 0" class="text-center text-muted">
      <p>No projects found. Create your first one!</p>
    </div>

    <b-row v-else>
      <b-col md="4" v-for="project in projects" :key="project.id" class="mb-4">
        <b-card
          :title="project.name"
          tag="article"
          class="h-100 shadow-sm"
        >
          <b-card-text>
            {{ project.description || 'No description provided.' }}
          </b-card-text>
          
          <template #footer>
            <b-button :to="'/projects/' + project.id" variant="outline-primary" size="sm">View Details</b-button>
          </template>
        </b-card>
      </b-col>
    </b-row>

    <!-- Modal for Creating Project -->
    <b-modal id="modal-create-project" title="Create New Project" @ok="createProject">
      <b-form-group label="Project Name">
        <b-form-input v-model="newProject.name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea v-model="newProject.description" rows="3"></b-form-textarea>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      projects: [],
      loading: true,
      newProject: {
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
    async createProject(bvModalEvt) {
      if (!this.newProject.name) {
        alert('Please enter a project name');
        bvModalEvt.preventDefault();
        return;
      }
      try {
        await axios.post('/projects/', this.newProject);
        await this.fetchProjects(); // Refresh list
        this.newProject.name = '';
        this.newProject.description = '';
      } catch (error) {
        console.error("Error creating project", error);
        alert('Failed to create project');
      }
    }
  }
}
</script>
