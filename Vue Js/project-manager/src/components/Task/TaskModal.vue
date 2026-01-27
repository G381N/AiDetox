<template>
  <b-modal
    :visible="show"
    :title="isEdit ? 'Edit Task' : 'Create New Task'"
    @hide="handleClose"
    @ok="handleSubmit"
    ok-title="Save"
    cancel-title="Cancel"
    modal-class="task-modal"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group label="Task Title" label-for="task-title">
        <b-form-input
          id="task-title"
          v-model="$v.form.title.$model"
          placeholder="Enter task title"
          :state="validateState('title')"
          class="skeu-input"
        />
        <b-form-invalid-feedback>
          Title is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-row>
        <b-col md="6">
          <b-form-group label="Status" label-for="task-status">
            <b-form-select
              id="task-status"
              v-model="form.status"
              :options="statusOptions"
              class="skeu-input"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Priority" label-for="task-priority">
            <b-form-select
              id="task-priority"
              v-model="form.priority"
              :options="priorityOptions"
              class="skeu-input"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'TaskModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    task: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        title: '',
        status: 'Todo',
        priority: 'Medium'
      },
      statusOptions: [
        { value: 'Todo', text: 'Todo' },
        { value: 'In Progress', text: 'In Progress' },
        { value: 'Done', text: 'Done' }
      ],
      priorityOptions: [
        { value: 'Low', text: 'Low' },
        { value: 'Medium', text: 'Medium' },
        { value: 'High', text: 'High' }
      ]
    }
  },
  validations: {
    form: {
      title: { required }
    }
  },
  computed: {
    isEdit() {
      return !!this.task
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.resetForm()
      }
    },
    task: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = {
            title: newVal.title || '',
            status: newVal.status || 'Todo',
            priority: newVal.priority || 'Medium'
          }
        }
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    
    handleSubmit(evt) {
      if (evt) {
        evt.preventDefault()
      }
      
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      const taskData = { ...this.form }
      if (this.isEdit) {
        taskData.id = this.task.id
      }

      this.$emit('save', taskData)
      this.handleClose()
    },
    
    handleClose() {
      this.$v.$reset()
      this.$emit('close')
    },
    
    resetForm() {
      if (!this.task) {
        this.form = {
          title: '',
          status: 'Todo',
          priority: 'Medium'
        }
        this.$v.$reset()
      }
    }
  }
}
</script>

<style>
.task-modal .modal-content {
  border-radius: 16px;
  border: none;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.task-modal .modal-header {
  background: linear-gradient(145deg, #48bb78, #38a169);
  color: white;
  border-radius: 16px 16px 0 0;
  border-bottom: none;
}

.task-modal .modal-title {
  font-weight: 700;
}

.task-modal .modal-body {
  padding: 24px;
}

.task-modal .modal-footer {
  border-top: 1px solid #e2e8f0;
  padding: 16px 24px;
}

.task-modal .btn-primary {
  background: linear-gradient(145deg, #48bb78, #38a169);
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-weight: 600;
  box-shadow: 
    0 4px 12px rgba(72, 187, 120, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.task-modal .btn-primary:hover {
  background: linear-gradient(145deg, #38a169, #2f855a);
  box-shadow: 
    0 6px 16px rgba(72, 187, 120, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.task-modal .btn-secondary {
  background: linear-gradient(145deg, #e2e8f0, #cbd5e0);
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-weight: 600;
  color: #2d3748;
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.task-modal .btn-secondary:hover {
  background: linear-gradient(145deg, #cbd5e0, #a0aec0);
}

.task-modal .skeu-input {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 14px;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.05),
    0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.task-modal .skeu-input:focus {
  outline: none;
  border-color: #48bb78;
  box-shadow: 
    inset 0 2px 4px rgba(72, 187, 120, 0.1),
    0 0 0 3px rgba(72, 187, 120, 0.1);
}
</style>
