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
  background: linear-gradient(145deg, #ffffff, #f7fafc);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  margin-bottom: 12px;
  border-left: 4px solid #e2e8f0;
}

.task-card:hover {
  transform: translateX(4px);
  box-shadow: 
    0 6px 16px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.task-todo {
  border-left-color: #a0aec0;
}

.task-in-progress {
  border-left-color: #4299e1;
}

.task-done {
  border-left-color: #48bb78;
  opacity: 0.8;
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
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.task-done .task-title {
  text-decoration: line-through;
  opacity: 0.6;
}

.task-priority {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.priority-high {
  background: linear-gradient(145deg, #fc8181, #f56565);
  color: white;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.priority-medium {
  background: linear-gradient(145deg, #fbd38d, #f6ad55);
  color: #744210;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.priority-low {
  background: linear-gradient(145deg, #90cdf4, #63b3ed);
  color: #2c5282;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.task-actions {
  display: flex;
  gap: 6px;
}

.action-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.edit-btn {
  background: linear-gradient(145deg, #4299e1, #3182ce);
}

.edit-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 8px rgba(66, 153, 225, 0.4);
}

.delete-btn {
  background: linear-gradient(145deg, #fc8181, #f56565);
}

.delete-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 8px rgba(245, 101, 101, 0.4);
}

.task-footer {
  display: flex;
  align-items: center;
}

.status-select {
  max-width: 180px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 
    inset 0 1px 2px rgba(0, 0, 0, 0.05),
    0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 6px 10px;
  transition: all 0.3s ease;
}

.status-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 
    inset 0 1px 2px rgba(102, 126, 234, 0.1),
    0 0 0 3px rgba(102, 126, 234, 0.1);
}
</style>
