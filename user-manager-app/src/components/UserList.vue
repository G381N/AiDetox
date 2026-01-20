<template>
  <div>
    <p v-if="users.length === 0">No users added yet</p>
    <ul v-else>
      <UserItem
        v-for="(user, index) in users"
        v-bind:key="index"
        v-bind:user="user"
        v-bind:index="index"
        v-on:delete-user="$emit('delete-user', index)"
      />
      <!-- v-on:delete-user listens for event from UserItem and re-emits it UP to App.vue  -->
    </ul>
  </div>
</template>

<script>
import UserItem from "./UserItem.vue";

export default 
{
  name: "UserList",
  
  components: 
  {
    UserItem,
  },
  
  props: 
  {
    users: {
      type: Array,    
      required: true, 
    },
  },
};
</script>

<style scoped>
/* scoped: styles only apply to this component */

ul {
  padding: 0;
  list-style: none;
}
</style>
