<template>
  <div class="project-detail container mt-4">
    <div v-if="loading" class="text-center">
      <b-spinner label="Loading..."></b-spinner>
    </div>

    <div v-else-if="error" class="text-center text-danger">
      <p>{{ error }}</p>
      <b-button to="/dashboard" variant="outline-primary">Back to Dashboard</b-button>
    </div>

    <div v-else>
      <div class="mb-4">
        <b-button to="/dashboard" variant="outline-secondary" size="sm" class="mb-2">&larr; Back</b-button>
        <h2>{{ project.name }}</h2>
        <p class="text-muted">{{ project.description }}</p>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Tasks</h4>
        <b-button v-b-modal.modal-create-task variant="success" size="sm">Add Task</b-button>
      </div>

      <!-- Task Lists grouped by status (optional) or just a single list -->
      <b-list-group>
        <b-list-group-item v-if="tasks.length === 0">No tasks yet.</b-list-group-item>
        <b-list-group-item 
          v-for="task in tasks" 
          :key="task.id" 
          class="d-flex justify-content-between align-items-center"
        >
          <div>
            <h5 class="mb-1">{{ task.title }}</h5>
            <small class="text-muted">{{ task.description }}</small>
          </div>
          <div class="d-flex align-items-center">
            <b-badge :variant="getStatusVariant(task.status)" class="mr-3">{{ task.status }}</b-badge>
            
            <!-- Status Dropdown -->
            <b-dropdown size="sm" variant="outline-secondary" text="Status" class="mr-2">
              <b-dropdown-item @click="updateStatus(task, 'Todo')">Todo</b-dropdown-item>
              <b-dropdown-item @click="updateStatus(task, 'In Progress')">In Progress</b-dropdown-item>
              <b-dropdown-item @click="updateStatus(task, 'Done')">Done</b-dropdown-item>
            </b-dropdown>

            <b-button variant="danger" size="sm" @click="deleteTask(task.id)">Bin</b-button>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>

    <!-- Modal for Creating Task -->
    <b-modal id="modal-create-task" title="Add New Task" @ok="createTask">
      <b-form-group label="Task Title">
        <b-form-input v-model="newTask.title" required></b-form-input>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea v-model="newTask.description" rows="3"></b-form-textarea>
      </b-form-group>
      <b-form-group label="Status">
        <b-form-select v-model="newTask.status" :options="['Todo', 'In Progress', 'Done']"></b-form-select>
      </b-form-group>
    </b-modal>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      project: {},
      tasks: [],
      loading: true,
      error: null,
      newTask: {
        title: '',
        description: '',
        status: 'Todo'
      }
    }
  },
  async created() {
    await this.fetchProjectDetails();
    await this.fetchTasks();
  },
  methods: {
    async fetchProjectDetails() {
      try {
        const response = await axios.get(`/projects/${this.$route.params.id}/`);
        this.project = response.data;
      } catch (err) {
        this.error = "Failed to load project details.";
        console.error(err);
      }
    },
    async fetchTasks() {
      try {
        const response = await axios.get(`/projects/${this.$route.params.id}/tasks/`);
        this.tasks = response.data.results;
      } catch (err) {
        console.error("Failed to load tasks", err);
      } finally {
        this.loading = false;
      }
    },
    async createTask(bvModalEvt) {
      if (!this.newTask.title) {
        alert('Task title is required');
        bvModalEvt.preventDefault();
        return;
      }
      try {
        await axios.post(`/projects/${this.$route.params.id}/tasks/`, this.newTask);
        await this.fetchTasks(); // Refresh list
        this.newTask.title = '';
        this.newTask.description = '';
        this.newTask.status = 'Todo';
      } catch (err) {
        alert('Failed to create task');
      }
    },
    async updateStatus(task, newStatus) {
      try {
        await axios.put(`/projects/tasks/${task.id}/`, { ...task, status: newStatus });
        task.status = newStatus;
      } catch (err) {
        alert('Failed to update status');
      }
    },
    async deleteTask(taskId) {
      if(!confirm("Are you sure?")) return;
      try {
        await axios.delete(`/projects/tasks/${taskId}/`);
        this.tasks = this.tasks.filter(t => t.id !== taskId);
      } catch (err) {
        alert('Failed to delete task');
      }
    },
    getStatusVariant(status) {
      switch(status) {
        case 'Todo': return 'secondary';
        case 'In Progress': return 'primary';
        case 'Done': return 'success';
        default: return 'light';
      }
    }
  }
}
</script>
