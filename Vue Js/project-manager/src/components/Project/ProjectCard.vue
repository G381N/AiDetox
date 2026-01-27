<template>
  <div class="project-card" @click="handleClick">
    <div class="project-card-header">
      <h3 class="project-title">{{ project.title }}</h3>
      <div class="project-actions">
        <button class="action-btn edit-btn" @click.stop="$emit('edit', project)" title="Edit">
          ✏️
        </button>
        <button class="action-btn delete-btn" @click.stop="$emit('delete', project.id)" title="Delete">
          🗑️
        </button>
      </div>
    </div>
    
    <p class="project-description">{{ project.description }}</p>
    
    <div class="project-footer">
      <span class="project-status" :class="`status-${project.status.toLowerCase().replace(' ', '-')}`">
        {{ project.status }}
      </span>
      <span class="project-due-date">
        📅 {{ formatDate(project.dueDate) }}
      </span>
    </div>
    
    <div class="project-stats">
      <div class="stat">
        <span class="stat-label">Tasks:</span>
        <span class="stat-value">{{ project.tasks?.length || 0 }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Completed:</span>
        <span class="stat-value">{{ completedTasks }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    completedTasks() {
      if (!this.project.tasks) return 0
      return this.project.tasks.filter(t => t.status === 'Done').length
    }
  },
  methods: {
    handleClick() {
      this.$emit('view', this.project)
    },
    formatDate(date) {
      if (!date) return 'No date'
      const d = new Date(date)
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }
}
</script>

<style scoped>
.project-card {
  background: #FFFFFF;
  border-radius: 0;
  padding: 20px;
  box-shadow: 8px 8px 0 #000000;
  border: 4px solid #000000;
  transition: all 0.2s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 #000000;
}

.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.project-title {
  font-size: 22px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  flex: 1;
  text-transform: uppercase;
}

.project-actions {
  display: flex;
  gap: 8px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-actions {
  opacity: 1;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: 3px solid #000000;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
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

.project-description {
  font-size: 14px;
  color: #000000;
  margin: 0 0 16px 0;
  line-height: 1.5;
  flex: 1;
  font-weight: 600;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.project-status {
  padding: 8px 14px;
  border-radius: 0;
  font-size: 12px;
  font-weight: 900;
  white-space: nowrap;
  border: 2px solid #000000;
  text-transform: uppercase;
}

.status-in-progress {
  background: #00F5FF;
  color: #000000;
}

.status-planning {
  background: #FFE951;
  color: #000000;
}

.status-todo {
  background: #FFFFFF;
  color: #000000;
}

.status-completed {
  background: #8338EC;
  color: #FFFFFF;
}

.project-due-date {
  font-size: 13px;
  color: #718096;
  font-weight: 500;
}

.project-stats {
  display: flex;
  gap: 16px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-label {
  font-size: 13px;
  color: #a0aec0;
  font-weight: 500;
}

.stat-value {
  font-size: 15px;
  color: #2d3748;
  font-weight: 700;
}
</style>
