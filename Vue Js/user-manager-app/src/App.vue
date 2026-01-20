<template>
  <div class="app">
    <h1>User Manager</h1>
    
    <p>Total Users: {{ users.length }}</p>

    <UserForm v-on:add-user="addUser" /> 
    <!-- We are calling custom event 'add-user' from the UserForm component and
     linking to addUser method in this component. -->

    <UserList
      v-bind:users="users"
      v-on:delete-user="deleteUser"
    />
    <!-- Sending users array as a prop to UserList component.
    listening for delete-user event from UserList. -->
  </div>
</template>


<script>
import UserForm from "./components/UserForm.vue";
import UserList from "./components/UserList.vue";

export default 
{
  name: "App",
  components: 
  {
    UserForm, 
    UserList,
  },

  data() 
  {
    return {
      users: [], //Users array sent as prop as well.
    };
  },
  
  methods: {
    addUser(user) { //Recieves 'user' from event emitted by UserForm
      this.users.push(user);
    },
    
    deleteUser(index) { //Recieves index from event emitted by UserList
      this.users.splice(index, 1);
    },
  },
  
  watch: {
    users: {
      handler(newUsers) { // Runs whenever users array changes
        console.log("Users changed! Count:", newUsers.length);
      },
      deep: true,
    },
  },
  
  
  mounted() // Called after the component first appears on the page 
  { 
    console.log("User Manager App Loaded");
    this.users = [];
  },
};
</script>

<style>
.app {
  max-width: 600px;     
  margin: 40px auto;    
  font-family: Arial, sans-serif;
}
</style>
