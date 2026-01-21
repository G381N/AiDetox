<template>
  <!-- 
    UserTable Component
    ===================
    Displays a table of users with status badges
    
    PROPS FLOW:
    - usersProp: Array of user objects passed from parent
    
    EVENT FLOW:
    - No events emitted from this component (display only)
    - In a real app, you might emit 'edit-user' or 'delete-user' events
  -->
  <div class="user-table-container">
    <h4 class="mb-3">User Management</h4>
    
    <!-- 
      b-table Component
      - fields: Array defining table columns
      - items: Array of data to display
      - striped: Alternating row colors
      - hover: Highlight row on hover
      - bordered: Add borders to table
    -->
    <b-table
      v-bind:fields="tableFieldsData"
      v-bind:items="usersProp"
      v-bind:striped="true"
      v-bind:hover="true"
      v-bind:bordered="true"
      class="user-table"
    >
      <!-- 
        SCOPED SLOT for 'status' column
        Allows custom rendering of the status cell
        - data: Object containing row data
        - value: The specific value for this cell (status value)
      -->
      <template v-slot:cell(status)="data">
        <!-- 
          Display status as a badge
          Use computed method to determine badge variant (color)
        -->
        <b-badge v-bind:variant="getStatusVariant(data.value)">
          {{ data.value }}
        </b-badge>
      </template>

      <!-- 
        SLOT for empty state
        Displayed when items array is empty
      -->
      <template v-slot:empty>
        <div class="text-center text-muted py-4">
          <p>No users found</p>
          <small>Click "Add User" to create your first user</small>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  
  // PROPS - Data received from parent component
  props: {
    // Array of user objects to display in table
    usersProp: {
      type: Array,
      required: true,
      // Default value if not provided
      default: function() {
        return [];
      }
    }
  },
  
  // COMPONENT DATA - Local state
  data: function() {
    return {
      // Define table columns (fields)
      tableFieldsData: [
        {
          key: 'name',
          label: 'Name',
          sortable: true
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true
        },
        {
          key: 'role',
          label: 'Role',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        }
      ]
    };
  },
  
  methods: {
    // Determine badge color based on status value
    getStatusVariant: function(statusValue) {
      if (statusValue === 'Active') {
        return 'success';  // Green badge
      } else if (statusValue === 'Inactive') {
        return 'secondary';  // Gray badge
      } else if (statusValue === 'Pending') {
        return 'warning';  // Yellow badge
      } else {
        return 'info';  // Blue badge (default)
      }
    }
  }
};
</script>

<style scoped>
/* Scoped styles for UserTable component */

.user-table-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.user-table {
  margin-bottom: 0;
}
</style>
