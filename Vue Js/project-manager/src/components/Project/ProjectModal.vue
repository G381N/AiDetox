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
  border-radius: 0;
  border: 5px solid #000000;
  box-shadow: 12px 12px 0 #000000;
}

.project-modal .modal-header {
  background: #8338EC;
  color: white;
  border-radius: 0;
  border-bottom: 4px solid #000000;
}

.project-modal .modal-title {
  font-weight: 900;
  text-transform: uppercase;
}

.project-modal .modal-body {
  padding: 24px;
  background: #FFFFFF;
}

.project-modal .modal-footer {
  border-top: 4px solid #000000;
  padding: 16px 24px;
  background: #FFFFFF;
}

.project-modal .btn-primary {
  background: #FF006E;
  border: 3px solid #000000;
  border-radius: 0;
  padding: 10px 24px;
  font-weight: 900;
  box-shadow: 4px 4px 0 #000000;
  text-transform: uppercase;
}

.project-modal .btn-primary:hover {
  background: #00F5FF;
  color: #000000;
  box-shadow: 6px 6px 0 #000000;
  transform: translate(-2px, -2px);
}

.project-modal .btn-secondary {
  background: #FFFFFF;
  border: 3px solid #000000;
  border-radius: 0;
  padding: 10px 24px;
  font-weight: 900;
  color: #000000;
  box-shadow: 4px 4px 0 #000000;
  text-transform: uppercase;
}

.project-modal .btn-secondary:hover {
  background: #FFE951;
  box-shadow: 6px 6px 0 #000000;
  transform: translate(-2px, -2px);
}

.project-modal .skeu-input {
  background: #FFE951;
  border: 3px solid #000000;
  border-radius: 0;
  padding: 10px 14px;
  box-shadow: none;
  transition: all 0.2s ease;
  font-weight: 700;
}

.project-modal .skeu-input:focus {
  outline: none;
  border-color: #000000;
  background: #00F5FF;
  box-shadow: 4px 4px 0 #000000;
  transform: translate(-2px, -2px);
}
</style>
