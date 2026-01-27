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
  border-radius: 0;
  border: 5px solid #000000;
  box-shadow: 12px 12px 0 #000000;
}

.task-modal .modal-header {
  background: #00F5FF;
  color: #000000;
  border-radius: 0;
  border-bottom: 4px solid #000000;
}

.task-modal .modal-title {
  font-weight: 900;
  text-transform: uppercase;
}

.task-modal .modal-body {
  padding: 24px;
  background: #FFFFFF;
}

.task-modal .modal-footer {
  border-top: 4px solid #000000;
  padding: 16px 24px;
  background: #FFFFFF;
}

.task-modal .btn-primary {
  background: #FF006E;
  border: 3px solid #000000;
  border-radius: 0;
  padding: 10px 24px;
  font-weight: 900;
  box-shadow: 4px 4px 0 #000000;
  text-transform: uppercase;
}

.task-modal .btn-primary:hover {
  background: #8338EC;
  color: #FFFFFF;
  box-shadow: 6px 6px 0 #000000;
  transform: translate(-2px, -2px);
}

.task-modal .btn-secondary {
  background: #FFFFFF;
  border: 3px solid #000000;
  border-radius: 0;
  padding: 10px 24px;
  font-weight: 900;
  color: #000000;
  box-shadow: 4px 4px 0 #000000;
  text-transform: uppercase;
}

.task-modal .btn-secondary:hover {
  background: #FFE951;
  box-shadow: 6px 6px 0 #000000;
  transform: translate(-2px, -2px);
}

.task-modal .skeu-input {
  background: #FFE951;
  border: 3px solid #000000;
  border-radius: 0;
  padding: 10px 14px;
  box-shadow: none;
  transition: all 0.2s ease;
  font-weight: 700;
}

.task-modal .skeu-input:focus {
  outline: none;
  border-color: #000000;
  background: #00F5FF;
  box-shadow: 4px 4px 0 #000000;
  transform: translate(-2px, -2px);
}
</style>
