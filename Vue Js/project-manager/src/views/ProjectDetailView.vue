<template>
  <b-container class="mt-4">
    <b-row>
      <b-col>
        <h2>Project Details</h2>

        <div v-if="project">
          <p><strong>Project Name:</strong> {{ project.name }}</p>

          <b-button
            variant="primary"
            @click="goToTasks"
          >
            View Tasks
          </b-button>

          <b-button
            class="ml-2"
            variant="secondary"
            @click="$router.push('/projects')"
          >
            Back to Projects
          </b-button>
        </div>

        <div v-else>
          <p>Loading project...</p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'ProjectDetailView',

  computed: {
    project() {
      return this.$store.state.projects.activeProject
    }
  },

  created() {
    // If user refreshes directly on /projects/:id
    if (!this.project) {
      const projectId = this.$route.params.id

      const found = this.$store.state.projects.projects.find(
        p => String(p.id) === String(projectId)
      )

      if (found) {
        this.$store.dispatch('projects/setActiveProject', found)
      }
    }
  },

  methods: {
    goToTasks() {
      this.$router.push(`/projects/${this.$route.params.id}/tasks`)
    }
  }
}
</script>
