<template>
  <div id="app">
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6" lg="5">
          
          <transition name="fade" mode="out-in">
            <!-- Dashboard Component -->
            <UserDashboard 
              v-if="isLoggedIn" 
              @logout="handleLogout"
            />

            <!-- Auth Component -->
            <UserAuth 
              v-else 
              @auth-success="handleLoginSuccess"
            />
          </transition>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserAuth from './components/UserAuth.vue';
import UserDashboard from './components/UserDashboard.vue';

export default {
  name: 'App',
  components: {
    UserAuth,
    UserDashboard
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    handleLoginSuccess(data) {
      console.log('User logged in:', data);
      this.isLoggedIn = true;
    },
    handleLogout() {
      this.isLoggedIn = false;
    }
  }
};
</script>

<style>
/* Simple transition for component switching */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
