<template>
  <div class="task-card" :class="`task-${task.status.toLowerCase()}`">
    <div class="task-header">
      <div class="task-info">
        <h4 class="task-title">{{ task.title }}</h4>
        <span class="task-priority" :class="`priority-${task.priority?.toLowerCase()}`">
          {{ task.priority }}
        </span>
      </div>
      <div class="task-actions">
        <button class="action-btn edit-btn" @click="$emit('edit', task)" title="Edit">
          ✏️
        </button>
        <button class="action-btn delete-btn" @click="$emit('delete', task.id)" title="Delete">
          🗑️
        </button>
      </div>
    </div>
    
    <div class="task-footer">
      <b-form-select
        v-model="taskStatus"
        :options="statusOptions"
        size="sm"
        class="status-select"
        @change="handleStatusChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      taskStatus: this.task.status,
      statusOptions: [
        { value: 'Todo', text: '📝 Todo' },
        { value: 'In Progress', text: '🔄 In Progress' },
        { value: 'Done', text: '✅ Done' }
      ]
    }
  },
  watch: {
    'task.status'(newVal) {
      this.taskStatus = newVal
    }
  },
  methods: {
    handleStatusChange(newStatus) {
      const oldStatus = this.task.status
      this.$emit('status-change', { task: this.task, newStatus, oldStatus })
    }
  }
}
</script>

<style scoped>
.task-card {
  background: #FFFFFF;
  border-radius: 0;
  padding: 16px;
  box-shadow: 4px 4px 0 #000000;
  border: 3px solid #000000;
  transition: all 0.2s ease;
  margin-bottom: 12px;
  border-left: 8px solid #000000;
}

.task-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.task-todo {
  border-left-color: #FFE951;
  background: #FFFEF0;
}

.task-in-progress {
  border-left-color: #00F5FF;
  background: #F0FEFF;
}

.task-done {
  border-left-color: #8338EC;
  opacity: 0.7;
  background: #F5F0FF;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.task-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.task-title {
  font-size: 16px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  text-transform: uppercase;
}

.task-done .task-title {
  text-decoration: line-through;
  opacity: 0.6;
}

.task-priority {
  padding: 4px 12px;
  border-radius: 0;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 2px solid #000000;
}

.priority-high {
  background: #FF006E;
  color: white;
}

.priority-medium {
  background: #FFE951;
  color: #000000;
}

.priority-low {
  background: #00F5FF;
  color: #000000;
}

.task-actions {
  display: flex;
  gap: 6px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: 3px solid #000000;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 3px 3px 0 #000000;
}

.edit-btn {
  background: #00F5FF;
}

.edit-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #000000;
}

.delete-btn {
  background: #FF006E;
}

.delete-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #000000;
}

.task-footer {
  display: flex;
  align-items: center;
}

.status-select {
  max-width: 180px;
  font-size: 13px;
  font-weight: 900;
  border-radius: 0;
  border: 3px solid #000000;
  background: #FFE951;
  box-shadow: 3px 3px 0 #000000;
  padding: 8px 12px;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.status-select:focus {
  outline: none;
  border-color: #000000;
  box-shadow: 5px 5px 0 #000000;
  transform: translate(-2px, -2px);
  background: #00F5FF;
}
</style>
