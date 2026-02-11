<template>
  <div id="app">
    <NavBar />
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { EventBus } from './bus/event-bus'

export default {
  name: 'App',
  components: {
    NavBar
  },
  created() {
    // If token exists in local storage, set auth header
    const token = this.$store.state.token;
    if (token) {
        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    // Global Event Listeners
    EventBus.$on('project-created', (project) => {
      this.$bvToast.toast(`Project "${project.name}" created successfully!`, {
        title: 'Success',
        variant: 'success',
        solid: true
      })
    })

    EventBus.$on('project-deleted', () => {
      this.$bvToast.toast(`Project deleted successfully`, {
        title: 'Deleted',
        variant: 'danger',
        solid: true
      })
    })

    EventBus.$on('task-updated', (task) => {
      this.$bvToast.toast(`Task "${task.title}" updated`, {
        title: 'Task Update',
        variant: 'info',
        solid: true
      })
    })
  }
}
</script>

<style>
/* Global Neo-Brutalism Theme */
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700;900&display=swap');

:root {
  --nb-bg: #EBE0FF; /* Soft Lavender Background */
  --nb-primary: #8338ec; /* Purple */
  --nb-secondary: #ff006e; /* Hot Pink */
  --nb-accent: #fb5607; /* Orange */
  --nb-success: #3a86ff; /* Blue */
  --nb-warn: #ffbe0b; /* Mustard Yellow */
  --nb-dark: #000000;
  --nb-border: 4px solid var(--nb-dark);
  --nb-bold: 900;
  --nb-shadow: 6px 6px 0 var(--nb-dark);
  --nb-shadow-hover: 8px 8px 0 var(--nb-dark);
  --nb-shadow-active: 2px 2px 0 var(--nb-dark);
}

body {
  font-family: 'Public Sans', sans-serif !important;
  background-color: var(--nb-bg) !important;
  color: var(--nb-dark) !important;
}

#app {
  min-height: 100vh;
  background-color: var(--nb-bg) !important;
}

/* Global Navbar Styling (Targeting Bootstrap Class) */
.navbar {
    border-bottom: var(--nb-border) !important;
    box-shadow: var(--nb-shadow) !important;
    padding: 1rem 2rem !important;
    background-color: var(--nb-warn) !important; /* Yellow Navbar */
}

.navbar-brand {
    font-weight: var(--nb-bold) !important;
    text-transform: uppercase !important;
    font-size: 1.8rem !important;
    color: var(--nb-dark) !important;
    letter-spacing: -1px;
}

.nav-link {
    font-weight: 700 !important;
    color: var(--nb-dark) !important;
    text-transform: uppercase !important;
    margin-left: 1rem;
    position: relative;
}

.nav-link:hover {
    text-decoration: underline !important;
    text-decoration-thickness: 3px !important;
    text-decoration-color: var(--nb-secondary) !important;
}

/* Override Bootstrap Defaults */
.btn {
  border-radius: 0 !important;
  border: var(--nb-border) !important;
  box-shadow: var(--nb-shadow) !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  margin-right: 8px;
}

.btn:hover {
  transform: translate(-2px, -2px) !important;
  box-shadow: var(--nb-shadow-hover) !important;
}

.btn:active {
  transform: translate(2px, 2px) !important;
  box-shadow: var(--nb-shadow-active) !important;
}

.btn-primary {
  background-color: var(--nb-primary) !important;
  color: #fff !important;
}

.btn-secondary {
    background-color: #fff !important;
    color: var(--nb-dark) !important;
}

.btn-success {
    background-color: var(--nb-success) !important;
}

.btn-danger {
    background-color: var(--nb-secondary) !important;
}

.btn-warning {
    background-color: var(--nb-warn) !important;
    color: var(--nb-dark) !important;
}

.card {
  border-radius: 0 !important;
  border: var(--nb-border) !important;
  box-shadow: var(--nb-shadow) !important;
  background-color: #fff !important;
}

.form-control {
  border-radius: 0 !important;
  border: var(--nb-border) !important;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.1) !important;
  font-weight: 700 !important;
}

.form-control:focus {
  box-shadow: var(--nb-shadow) !important;
  border-color: var(--nb-dark) !important;
  transform: translate(-1px, -1px);
}

.modal-content {
    border-radius: 0 !important;
    border: var(--nb-border) !important;
    box-shadow: 12px 12px 0 var(--nb-dark) !important;
}

.modal-header, .modal-footer {
    border-bottom: var(--nb-border) !important;
    border-top: var(--nb-border) !important;
    background-color: var(--nb-warn) !important;
}

/* Badge Styling */
.badge {
    border-radius: 0 !important;
    border: 2px solid var(--nb-dark) !important;
    font-size: 0.9rem !important;
    padding: 0.5em 0.8em !important;
    box-shadow: 2px 2px 0 var(--nb-dark) !important;
}
</style>
