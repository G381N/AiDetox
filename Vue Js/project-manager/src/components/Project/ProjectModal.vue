<template>
  <b-modal
    :visible="show"
    :title="isEdit ? 'Edit Project' : 'Create New Project'"
    @hide="handleClose"
    @ok="handleSubmit"
    ok-title="Save"
    cancel-title="Cancel"
    size="lg"
    modal-class="project-modal"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group label="Project Title" label-for="project-title">
        <b-form-input
          id="project-title"
          v-model="$v.form.title.$model"
          placeholder="Enter project title"
          :state="validateState('title')"
          class="skeu-input"
        />
        <b-form-invalid-feedback>
          Title is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Description" label-for="project-description">
        <b-form-textarea
          id="project-description"
          v-model="$v.form.description.$model"
          placeholder="Enter project description"
          rows="3"
          :state="validateState('description')"
          class="skeu-input"
        />
        <b-form-invalid-feedback>
          Description is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-row>
        <b-col md="6">
          <b-form-group label="Status" label-for="project-status">
            <b-form-select
              id="project-status"
              v-model="form.status"
              :options="statusOptions"
              class="skeu-input"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Due Date" label-for="project-due-date">
            <b-form-input
              id="project-due-date"
              v-model="form.dueDate"
              type="date"
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
  name: 'ProjectModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    project: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        status: 'Planning',
        dueDate: ''
      },
      statusOptions: [
        { value: 'Planning', text: 'Planning' },
        { value: 'In Progress', text: 'In Progress' },
        { value: 'Todo', text: 'Todo' },
        { value: 'Completed', text: 'Completed' }
      ]
    }
  },
  validations: {
    form: {
      title: { required },
      description: { required }
    }
  },
  computed: {
    isEdit() {
      return !!this.project
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.resetForm()
      }
    },
    project: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = {
            title: newVal.title || '',
            description: newVal.description || '',
            status: newVal.status || 'Planning',
            dueDate: newVal.dueDate || ''
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

      const projectData = { ...this.form }
      if (this.isEdit) {
        projectData.id = this.project.id
        projectData.tasks = this.project.tasks || []
      }

      this.$emit('save', projectData)
      this.handleClose()
    },
    
    handleClose() {
      this.$v.$reset()
      this.$emit('close')
    },
    
    resetForm() {
      if (!this.project) {
        this.form = {
          title: '',
          description: '',
          status: 'Planning',
          dueDate: ''
        }
        this.$v.$reset()
      }
    }
  }
}
</script>

<style>
.project-modal .modal-content {
  border-radius: 16px;
  border: none;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.project-modal .modal-header {
  background: linear-gradient(145deg, #667eea, #5a67d8);
  color: white;
  border-radius: 16px 16px 0 0;
  border-bottom: none;
}

.project-modal .modal-title {
  font-weight: 700;
}

.project-modal .modal-body {
  padding: 24px;
}

.project-modal .modal-footer {
  border-top: 1px solid #e2e8f0;
  padding: 16px 24px;
}

.project-modal .btn-primary {
  background: linear-gradient(145deg, #667eea, #5a67d8);
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-weight: 600;
  box-shadow: 
    0 4px 12px rgba(102, 126, 234, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.project-modal .btn-primary:hover {
  background: linear-gradient(145deg, #5a67d8, #4c51bf);
  box-shadow: 
    0 6px 16px rgba(102, 126, 234, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.project-modal .btn-secondary {
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

.project-modal .btn-secondary:hover {
  background: linear-gradient(145deg, #cbd5e0, #a0aec0);
}

.project-modal .skeu-input {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 14px;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.05),
    0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.project-modal .skeu-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 
    inset 0 2px 4px rgba(102, 126, 234, 0.1),
    0 0 0 3px rgba(102, 126, 234, 0.1);
}
</style>
