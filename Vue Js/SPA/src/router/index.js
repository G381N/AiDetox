// ============================================
// VUE ROUTER - router/index.js
// Handles all application routing and guards
// ============================================

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// Import all view components
import LoginPage from '../views/LoginPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import UsersListPage from '../views/UsersListPage.vue'
import UserDetailsPage from '../views/UserDetailsPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

// Tell Vue to use the router plugin
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    // meta.requiresAuth = false means this route is public
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    // meta.requiresAuth = true means user must be logged in to access
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'UsersList',
    component: UsersListPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    component: UserDetailsPage,
    // Props: true passes route params as props to the component
    props: true,
    meta: { requiresAuth: true }
  },
  {//Default route redirects to dashboard
    path: '/',
    redirect: '/dashboard'
  },

  {
    path: '*',
    name: 'NotFound',
    component: NotFoundPage
  }
]

// Create the router instance
const router = new VueRouter({
  mode: 'hash',
  routes
})

// ============================================
// NAVIGATION GUARD (Global Before Each)
// Runs before every route navigation
// ============================================
router.beforeEach((destinationRoute, sourceRoute, proceedNavigation) => {


  const destinationRequiresAuthentication = destinationRoute.matched.some(
    record => record.meta.requiresAuth
  )
  
  // Check if user is currently authenticated (from Vuex store)
  const isUserAuthenticated = store.getters.isAuthenticated
  const destinationRouteName = destinationRoute.name

  //Route needs auth but user is NOT logged in
  if (destinationRequiresAuthentication && !isUserAuthenticated) {
    // Redirect to login page
    proceedNavigation({ name: 'Login' })
  }
  //User is logged in but trying to access login page
  else if (destinationRouteName === 'Login' && isUserAuthenticated) {
    proceedNavigation({ name: 'Dashboard' })
  }
  // All other cases - allow navigation
  else {
    proceedNavigation()
  }
})

export default router
