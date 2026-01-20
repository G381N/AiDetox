<template>
  <!-- 
      Contains:
    - Navigation bar
    - Stats Section
    - User Table
    - Add User Modal
    
    DATA FLOW:
    - State is passed DOWN to child components via PROPS
    - Child components EMIT EVENTS up to this component
    - This component handles events and updates state
  -->
  <div id="app">
    <b-navbar
      v-bind:toggleable="'md'"
      v-bind:type="'dark'"
      v-bind:variant="'primary'"
      class="app-navbar"
    >
      <b-container>
        <b-navbar-brand v-bind:href="'#'"> Admin Dashboard </b-navbar-brand>
        <b-navbar-toggle v-bind:target="'nav-collapse'"></b-navbar-toggle>
        <b-collapse v-bind:id="'nav-collapse'" v-bind:is-nav="true">
          <!-- b-collapse is used to toggle the navigation menu on smaller screens -->

          <b-navbar-nav>
            <b-nav-item v-bind:href="'#'" v-bind:active="true"> Dashboard </b-nav-item>
            <b-nav-item v-bind:href="'#'"> Users </b-nav-item>
            <b-nav-item v-bind:href="'#'"> Reports </b-nav-item>
          </b-navbar-nav>
          <!-- Nav bar links -->

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown v-bind:text="'Gebin George '" v-bind:right="true">
              <b-dropdown-item v-bind:href="'#'">Profile</b-dropdown-item>
              <b-dropdown-item v-bind:href="'#'">Settings</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item v-bind:href="'#'">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <!-- Profile Dropdown place -->
        </b-collapse>
      </b-container>
    </b-navbar>

    <!-- Main -->
    <b-container class="mt-4">
      <b-row>
        <b-col>
          <h2 class="mb-4" align="center">Dashboard Overview</h2>
        </b-col>
      </b-row>
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

      <b-row class="mt-4">
        <b-col>
          <!-- 
            EVENT FLOW:
            1. User clicks button
            2. BaseButton component emits 'button-clicked' event
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
            <!-- Button component to add new users -->
          </div>

          <UserTable v-bind:users-prop="usersListData"></UserTable>
          <!-- Table Component displaying list of users -->
        </b-col>
      </b-row>
    </b-container>

    <AddUserModal
      v-bind:show-modal-prop="showAddUserModalData"
      v-on:user-added="handleUserAdded"
      v-on:modal-closed="handleModalClosed"
    ></AddUserModal>
    <!-- Modal Component to add new user -->
  </div>
</template>

<script>
// Import child components
import StatsCard from "./components/StatsCard.vue";
import BaseButton from "./components/BaseButton.vue";
import UserTable from "./components/UserTable.vue";
import AddUserModal from "./components/AddUserModal.vue";

export default {
  name: "App",

  // Register components for use in template
  components: {
    StatsCard,
    BaseButton,
    UserTable,
    AddUserModal,
  },

  // COMPONENT DATA - Application state
  data: function () {
    return {
      // Dashboard statistics data
      dashboardStatsData: {
        totalUsers: {
          title: "Total Users",
          value: 1245,
          icon: "fas fa-users",
        },
        totalOrders: {
          title: "Total Orders",
          value: 3892,
          icon: "fas fa-shopping-cart",
        },
        pendingOrders: {
          title: "Pending Orders",
          value: 47,
          icon: "fas fa-clock",
        },
        revenue: {
          title: "Revenue",
          value: "$52,840",
          icon: "fas fa-dollar-sign",
        },
      },

      // Users list - initial sample data (replaced with Marvel character names)
      usersListData: [
        {
          id: 1,
          name: "Tony Stark",
          email: "tony.stark@starkindustries.com",
          role: "Admin",
          status: "Active",
        },
        {
          id: 2,
          name: "Natasha Romanoff",
          email: "natasha.romanoff@shield.gov",
          role: "User",
          status: "Active",
        },
        {
          id: 3,
          name: "Steve Rogers",
          email: "steve.rogers@avengers.org",
          role: "Manager",
          status: "Active",
        },
        {
          id: 4,
          name: "Wanda Maximoff",
          email: "wanda.maximoff@sokovia.net",
          role: "User",
          status: "Inactive",
        },
        {
          id: 5,
          name: "Peter Parker",
          email: "peter.parker@dailybugle.com",
          role: "User",
          status: "Active",
        },
      ],

      // Modal visibility control
      showAddUserModalData: false,
    };
  },

  methods: {
    // EVENT HANDLER - Add User button clicked
    handleAddUserButtonClick: function (eventData) {
      console.log("Add User button clicked:", eventData);

      // Show the modal
      this.showAddUserModalData = true;
    },

    // EVENT HANDLER - User added from modal
    // Receives new user data from AddUserModal component
    handleUserAdded: function (newUserData) {
      console.log("New user added:", newUserData);

      // Add new user to the users list
      // This will automatically update the UserTable component
      // because it's bound to usersListData via props
      this.usersListData.push(newUserData);

      // Update total users stat
      this.dashboardStatsData.totalUsers.value = this.usersListData.length;

      // Optional: Show success message
      this.$bvToast.toast("User has been added successfully!", {
        title: "Success",
        variant: "success",
        solid: true,
        autoHideDelay: 3000,
      });
    },

    // EVENT HANDLER - Modal closed
    handleModalClosed: function () {
      console.log("Modal closed");

      // Hide the modal
      this.showAddUserModalData = false;
    },
  },
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
}

.app-navbar {
  margin-bottom: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Navbar toggle button (hamburger menu) styling */
.navbar-toggler {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border-radius: 0.25rem;
}

.navbar-toggler:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
}

.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.75)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stats-card {
    margin-bottom: 15px;
  }
}
</style>
