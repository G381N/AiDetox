<template>
  <!-- 
    App Component (Root Component)
    ==============================
    This is the main application component that contains:
    - Top navigation bar
    - Dashboard stats section
    - User table
    - Add user modal
    
    DATA FLOW:
    - This component holds the application STATE (users, stats)
    - State is passed DOWN to child components via PROPS
    - Child components EMIT EVENTS up to this component
    - This component handles events and updates state
  -->
  <div id="app">
    <!-- 
      NAVIGATION BAR
      ==============
      b-navbar: Bootstrap navigation component
      - type: Color scheme (light/dark)
      - variant: Background color variant
    -->
    <b-navbar 
      v-bind:type="'dark'" 
      v-bind:variant="'primary'"
      class="app-navbar"
    >
      <b-container>
        <!-- Brand/Logo -->
        <b-navbar-brand v-bind:href="'#'">
          Admin Dashboard
        </b-navbar-brand>

        <!-- 
          Navbar Toggle for mobile responsiveness
          - target: ID of the collapse element to toggle
        -->
        <b-navbar-toggle v-bind:target="'nav-collapse'"></b-navbar-toggle>

        <!-- 
          Collapsible navbar content
          - is-nav: Indicates this is navigation content
        -->
        <b-collapse v-bind:id="'nav-collapse'" v-bind:is-nav="true">
          <!-- Left-aligned navigation items -->
          <b-navbar-nav>
            <b-nav-item v-bind:href="'#'" v-bind:active="true">
              Dashboard
            </b-nav-item>
            <b-nav-item v-bind:href="'#'">
              Users
            </b-nav-item>
            <b-nav-item v-bind:href="'#'">
              Reports
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right-aligned navigation items -->
          <b-navbar-nav class="ml-auto">
            <!-- User dropdown menu -->
            <b-nav-item-dropdown v-bind:text="'User Account'" v-bind:right="true">
              <b-dropdown-item v-bind:href="'#'">Profile</b-dropdown-item>
              <b-dropdown-item v-bind:href="'#'">Settings</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item v-bind:href="'#'">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <!-- 
      MAIN CONTENT AREA
      =================
      b-container: Bootstrap container for responsive layout
    -->
    <b-container class="mt-4">
      <!-- Page Header -->
      <b-row>
        <b-col>
          <h2 class="mb-4">Dashboard Overview</h2>
        </b-col>
      </b-row>

      <!-- 
        STATS SECTION
        =============
        Display 4 statistic cards in a responsive grid
        
        PROP FLOW EXAMPLE:
        - dashboardStatsData (parent data) → titleProp, valueProp, etc. (child props)
        - Each StatsCard receives its data via props
      -->
      <b-row>
        <!-- Total Users Card -->
        <b-col v-bind:cols="12" v-bind:md="6" v-bind:lg="3">
          <StatsCard
            v-bind:title-prop="dashboardStatsData.totalUsers.title"
            v-bind:value-prop="dashboardStatsData.totalUsers.value"
            v-bind:icon-prop="dashboardStatsData.totalUsers.icon"
            v-bind:variant-prop="'primary'"
          ></StatsCard>
        </b-col>

        <!-- Total Orders Card -->
        <b-col v-bind:cols="12" v-bind:md="6" v-bind:lg="3">
          <StatsCard
            v-bind:title-prop="dashboardStatsData.totalOrders.title"
            v-bind:value-prop="dashboardStatsData.totalOrders.value"
            v-bind:icon-prop="dashboardStatsData.totalOrders.icon"
            v-bind:variant-prop="'success'"
          ></StatsCard>
        </b-col>

        <!-- Pending Orders Card -->
        <b-col v-bind:cols="12" v-bind:md="6" v-bind:lg="3">
          <StatsCard
            v-bind:title-prop="dashboardStatsData.pendingOrders.title"
            v-bind:value-prop="dashboardStatsData.pendingOrders.value"
            v-bind:icon-prop="dashboardStatsData.pendingOrders.icon"
            v-bind:variant-prop="'warning'"
          ></StatsCard>
        </b-col>

        <!-- Revenue Card -->
        <b-col v-bind:cols="12" v-bind:md="6" v-bind:lg="3">
          <StatsCard
            v-bind:title-prop="dashboardStatsData.revenue.title"
            v-bind:value-prop="dashboardStatsData.revenue.value"
            v-bind:icon-prop="dashboardStatsData.revenue.icon"
            v-bind:variant-prop="'info'"
          ></StatsCard>
        </b-col>
      </b-row>

      <!-- 
        USER MANAGEMENT SECTION
        =======================
      -->
      <b-row class="mt-4">
        <b-col>
          <!-- 
            Add User Button
            
            EVENT FLOW:
            1. User clicks button
            2. BaseButton emits 'button-clicked' event
            3. This component's handleAddUserButtonClick method executes
            4. Method sets showAddUserModalData to true
            5. Modal becomes visible
          -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4>User Management</h4>
            <BaseButton
              v-bind:text-prop="'Add User'"
              v-bind:variant-prop="'primary'"
              v-bind:size-prop="'md'"
              v-on:button-clicked="handleAddUserButtonClick"
            ></BaseButton>
          </div>

          <!-- 
            User Table Component
            
            PROP FLOW:
            - usersListData (array in this component) → usersProp (prop in UserTable)
            - UserTable displays the data in a table
          -->
          <UserTable
            v-bind:users-prop="usersListData"
          ></UserTable>
        </b-col>
      </b-row>
    </b-container>

    <!-- 
      ADD USER MODAL
      ==============
      
      PROP & EVENT FLOW:
      PROPS (Parent → Child):
      - showAddUserModalData → showModalProp
      
      EVENTS (Child → Parent):
      - 'user-added' event: Carries new user data from modal to this component
      - 'modal-closed' event: Notifies parent that modal was closed
    -->
    <AddUserModal
      v-bind:show-modal-prop="showAddUserModalData"
      v-on:user-added="handleUserAdded"
      v-on:modal-closed="handleModalClosed"
    ></AddUserModal>
  </div>
</template>

<script>
// Import child components
import StatsCard from './components/StatsCard.vue';
import BaseButton from './components/BaseButton.vue';
import UserTable from './components/UserTable.vue';
import AddUserModal from './components/AddUserModal.vue';

export default {
  name: 'App',
  
  // Register components for use in template
  components: {
    StatsCard,
    BaseButton,
    UserTable,
    AddUserModal
  },
  
  // COMPONENT DATA - Application state
  data: function() {
    return {
      // Dashboard statistics data
      dashboardStatsData: {
        totalUsers: {
          title: 'Total Users',
          value: 1245,
          icon: 'fas fa-users'
        },
        totalOrders: {
          title: 'Total Orders',
          value: 3892,
          icon: 'fas fa-shopping-cart'
        },
        pendingOrders: {
          title: 'Pending Orders',
          value: 47,
          icon: 'fas fa-clock'
        },
        revenue: {
          title: 'Revenue',
          value: '$52,840',
          icon: 'fas fa-dollar-sign'
        }
      },
      
      // Users list - initial sample data
      usersListData: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'Admin',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          role: 'User',
          status: 'Active'
        },
        {
          id: 3,
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          role: 'Manager',
          status: 'Active'
        },
        {
          id: 4,
          name: 'Alice Williams',
          email: 'alice.williams@example.com',
          role: 'User',
          status: 'Inactive'
        },
        {
          id: 5,
          name: 'Charlie Brown',
          email: 'charlie.brown@example.com',
          role: 'User',
          status: 'Active'
        }
      ],
      
      // Modal visibility control
      showAddUserModalData: false
    };
  },
  
  methods: {
    // EVENT HANDLER - Add User button clicked
    handleAddUserButtonClick: function(eventData) {
      console.log('Add User button clicked:', eventData);
      
      // Show the modal
      this.showAddUserModalData = true;
    },
    
    // EVENT HANDLER - User added from modal
    // Receives new user data from AddUserModal component
    handleUserAdded: function(newUserData) {
      console.log('New user added:', newUserData);
      
      // Add new user to the users list
      // This will automatically update the UserTable component
      // because it's bound to usersListData via props
      this.usersListData.push(newUserData);
      
      // Update total users stat
      this.dashboardStatsData.totalUsers.value = this.usersListData.length;
      
      // Optional: Show success message
      this.$bvToast.toast('User has been added successfully!', {
        title: 'Success',
        variant: 'success',
        solid: true,
        autoHideDelay: 3000
      });
    },
    
    // EVENT HANDLER - Modal closed
    handleModalClosed: function() {
      console.log('Modal closed');
      
      // Hide the modal
      this.showAddUserModalData = false;
    }
  }
};
</script>

<style>
/* 
  GLOBAL STYLES
  =============
  These styles apply to the entire application
  (not scoped to this component)
*/

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
}

.app-navbar {
  margin-bottom: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stats-card {
    margin-bottom: 15px;
  }
}
</style>
