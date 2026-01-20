<template>
  <li class="user-item">
    <span>{{ user.name }} - {{ user.email }} (Age: {{ user.age }})</span>
    <!-- Displaying user data from 'user' prop using mustache syntax -->
    
    <button v-on:click="deleteUser">Delete</button>
    <!-- v-on:click calls deleteUser method when button is clicked -->
  </li>
</template>

<script>
export default 
{
  name: 'UserItem',
  
  props: 
  {
    user: {
      type: Object,   // Expects a user object with name, email, age
      required: true,
    },
    index: {
      type: Number,   // Position of this user in the array
      required: true,
    },
  },
  // Props received from parent (UserList.vue) via v-bind:user and v-bind:index
  
  methods: 
  {
    deleteUser() // Called when delete button is clicked
    {
      this.$emit('delete-user', this.index);
      // Emits 'delete-user' event UP to parent (UserList.vue) with the index
    },
  },
};
</script>

<style scoped>
/* scoped: styles only apply to this component */

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

button {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #cc0000;
}
</style>
