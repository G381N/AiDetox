<template>
  <!-- 
    AddUserModal Component
    ======================
    A modal dialog for adding new users
    
    PROPS FLOW:
    - showModalProp: Boolean controlling modal visibility (from parent)
    
    EVENT FLOW:
    - Emits 'modal-closed' when user closes modal
    - Emits 'user-added' when user submits the form with new user data
    - Parent listens to these events and updates its state accordingly
  -->
  
  <!-- 
    b-modal Component
    - v-model: Two-way binding for show/hide state
    - title: Modal header text
    - size: Modal size (sm, md, lg, xl)
    - hide-footer: Remove default footer (we'll use custom buttons)
  -->
  <b-modal
    v-model="isModalVisibleData"
    v-bind:title="modalTitleData"
    v-bind:size="'md'"
    v-bind:hide-footer="true"
    v-on:hide="handleModalHide"
  >
    <!-- 
      b-form Component
      Form for collecting new user data
    -->
    <b-form v-on:submit.prevent="handleFormSubmit">
      <!-- 
        Name Input Field
        - v-model: Two-way data binding with formData.nameValue
      -->
      <b-form-group
        v-bind:label="'Name:'"
        v-bind:label-for="'input-name'"
      >
        <b-form-input
          v-bind:id="'input-name'"
          v-model="formData.nameValue"
          v-bind:type="'text'"
          v-bind:placeholder="'Enter user name'"
          v-bind:required="true"
        ></b-form-input>
      </b-form-group>

      <!-- 
        Email Input Field
        - type="email": Browser validates email format
      -->
      <b-form-group
        v-bind:label="'Email:'"
        v-bind:label-for="'input-email'"
      >
        <b-form-input
          v-bind:id="'input-email'"
          v-model="formData.emailValue"
          v-bind:type="'email'"
          v-bind:placeholder="'Enter email address'"
          v-bind:required="true"
        ></b-form-input>
      </b-form-group>

      <!-- 
        Role Dropdown Field
        - b-form-select: Dropdown menu
        - options: Array of selectable values
      -->
      <b-form-group
        v-bind:label="'Role:'"
        v-bind:label-for="'input-role'"
      >
        <b-form-select
          v-bind:id="'input-role'"
          v-model="formData.roleValue"
          v-bind:options="roleOptionsData"
          v-bind:required="true"
        ></b-form-select>
      </b-form-group>

      <!-- 
        Form Action Buttons
        Using our custom BaseButton component
      -->
      <div class="d-flex justify-content-end mt-4">
        <!-- Cancel Button - closes modal without saving -->
        <BaseButton
          v-bind:text-prop="'Cancel'"
          v-bind:variant-prop="'secondary'"
          v-bind:size-prop="'md'"
          v-on:button-clicked="handleCancelClick"
          class="mr-2"
        ></BaseButton>

        <!-- Submit Button - saves user data -->
        <b-button
          v-bind:type="'submit'"
          v-bind:variant="'primary'"
        >
          Add User
        </b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
// Import the BaseButton component
import BaseButton from './BaseButton.vue';

export default {
  name: 'AddUserModal',
  
  // Register components used in this template
  components: {
    BaseButton
  },
  
  // PROPS - Data from parent component
  props: {
    // Controls whether modal is visible
    showModalProp: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  
  // COMPONENT DATA - Local state
  data: function() {
    return {
      // Modal title text
      modalTitleData: 'Add New User',
      
      // Form data object - stores input values
      formData: {
        nameValue: '',
        emailValue: '',
        roleValue: 'User'  // Default role
      },
      
      // Options for role dropdown
      roleOptionsData: [
        { value: 'Admin', text: 'Admin' },
        { value: 'User', text: 'User' },
        { value: 'Manager', text: 'Manager' },
        { value: 'Guest', text: 'Guest' }
      ]
    };
  },
  
  // COMPUTED PROPERTIES
  computed: {
    // Two-way computed property for modal visibility
    // Syncs with parent's showModalProp
    isModalVisibleData: {
      get: function() {
        return this.showModalProp;
      },
      set: function(newValue) {
        // When modal visibility changes, emit event to parent
        if (!newValue) {
          this.$emit('modal-closed');
        }
      }
    }
  },
  
  methods: {
    // EVENT HANDLER - Form submission
    handleFormSubmit: function() {
      console.log('Form submitted with data:', this.formData);
      
      // Create new user object from form data
      var newUserData = {
        name: this.formData.nameValue,
        email: this.formData.emailValue,
        role: this.formData.roleValue,
        status: 'Active',  // Default status for new users
        id: Date.now()  // Simple ID generation
      };
      
      // EMIT EVENT to parent with new user data
      // Parent will receive this data and add user to table
      this.$emit('user-added', newUserData);
      
      // Reset form fields
      this.resetForm();
      
      // Close modal
      this.$emit('modal-closed');
    },
    
    // EVENT HANDLER - Cancel button clicked
    handleCancelClick: function() {
      console.log('Cancel button clicked');
      
      // Reset form and close modal
      this.resetForm();
      this.$emit('modal-closed');
    },
    
    // EVENT HANDLER - Modal hidden
    handleModalHide: function() {
      console.log('Modal is being hidden');
      this.resetForm();
    },
    
    // HELPER METHOD - Reset form to initial state
    resetForm: function() {
      this.formData = {
        nameValue: '',
        emailValue: '',
        roleValue: 'User'
      };
    }
  }
};
</script>

<style scoped>
/* Scoped styles for AddUserModal */

.mr-2 {
  margin-right: 0.5rem;
}
</style>
