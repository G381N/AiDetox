<template>
  <b-container class="mt-3">
    <h3>Tasks</h3>

    <b-table
      :items="tasks"
      :fields="fields"
      small
    >
      <template #cell(status)="row">
        <b-form-select
          v-model="row.item.status"
          :options="statusOptions"
          @change="onStatusChange(row.item)"
        />
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" variant="danger" @click="deleteTask(row.item.id)">
          Delete
        </b-button>
      </template>
    </b-table>

    <b-button class="mt-3" variant="success" @click="addTask">
      Add Task
    </b-button>
  </b-container>
</template>

<script>
import { eventBus } from '../bus/eventBus'

export default {
  name: 'TasksView',

  data() {
    return {
      tasks: [],
      dirty: false,
      fields: [
        { key: 'title', label: 'Task' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' }
      ],
      statusOptions: ['Todo', 'In Progress', 'Done']
    }
  },

  created() {
    // Mock tasks per project
    this.tasks = [
      { id: 1, title: 'Initial setup', status: 'Todo' },
      { id: 2, title: 'Wire views', status: 'In Progress' }
    ]
  },

  methods: {
    addTask() {
      this.tasks.push({
        id: Date.now(),
        title: 'New Task',
        status: 'Todo'
      })
      this.dirty = true

      eventBus.$emit('notify', {
        message: 'Task added',
        type: 'success'
      })
    },

    deleteTask(taskId) {
      this.tasks = this.tasks.filter(t => t.id !== taskId)
      this.dirty = true

      eventBus.$emit('notify', {
        message: 'Task deleted',
        type: 'danger'
      })
    },

    onStatusChange(task) {
      this.dirty = true

      eventBus.$emit('notify', {
        message: `Task "${task.title}" marked as ${task.status}`,
        type: 'info'
      })
    }
  },

  beforeRouteLeave(to, from, next) {
    if (this.dirty) {
      const confirmLeave = confirm(
        'You have unsaved task changes. Leave anyway?'
      )
      if (!confirmLeave) return next(false)
    }
    next()
  }
}
</script>
