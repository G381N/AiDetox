<script>
import HeaderComp from "./components/HeaderComp.vue";
import UserForm from "./components/UserForm.vue";
import UserList from "./components/UserList.vue";

export default {
  name: "App",
  components: { HeaderComp, UserForm, UserList },
  data: () => ({ users: [] }),
  methods: {
    addUser(user) {
      this.users.push(user);
    },
    deleteUser(idx) {
      this.users.splice(idx, 1);
    },
  },
  created() {
    console.log("User Manager App Loaded, created hook");
  },
  mounted() {
    console.log("User Manager App Loaded");
    this.users = [];
  },
};
</script>

<template>
  <div id="app" class="container">
    <HeaderComp :count="users.length" />
    <UserForm @add-user="addUser" />
    <UserList :users="users" @delete-user="deleteUser" />
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
}
</style>
