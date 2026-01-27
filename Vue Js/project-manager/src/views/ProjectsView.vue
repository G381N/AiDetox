<template>
  <b-container class="mt-4">
    <b-row>
      <b-col>
        <h2>Projects</h2>

        <b-list-group>
          <b-list-group-item
            v-for="project in projects"
            :key="project.id"
            button
            @click="openProject(project)"
          >
            {{ project.name }}
          </b-list-group-item>
        </b-list-group>

        <b-button
          class="mt-3"
          variant="success"
          @click="createProject"
        >
          Create Project
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'ProjectsView',

  computed: {
    projects() {
      return this.$store.state.projects.projects
    }
  },

  created() {
    // Temporary mock data until API exists
    if (!this.projects.length) {
      this.$store.commit('projects/SET_PROJECTS', [
        { id: 1, name: 'Sample Project A' },
        { id: 2, name: 'Sample Project B' }
      ])
    }
  },

  methods: {
    openProject(project) {
      this.$store.dispatch('projects/setActiveProject', project)
      this.$router.push(`/projects/${project.id}`)
    },

    createProject() {
      // Placeholder for modal later
      alert('Create Project modal comes later')
    }
  }
}
</script>
