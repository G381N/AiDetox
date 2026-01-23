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

// ============================================
// ROUTE DEFINITIONS
// ============================================
const routes = [
  {
    // PUBLIC ROUTE - Login page
    path: '/login',
    name: 'Login',
    component: LoginPage,
    // meta.requiresAuth = false means this route is public
    meta: { requiresAuth: false }
  },
  {
    // PROTECTED ROUTE - Dashboard page
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    // meta.requiresAuth = true means user must be logged in
    meta: { requiresAuth: true }
  },
  {
    // PROTECTED ROUTE - Users list page
    path: '/users',
    name: 'UsersList',
    component: UsersListPage,
    meta: { requiresAuth: true }
  },
  {
    // PROTECTED ROUTE - User details page (dynamic route)
    // :id is a route parameter that will be passed to the component
    path: '/users/:id',
    name: 'UserDetails',
    component: UserDetailsPage,
    // Props: true passes route params as props to the component
    props: true,
    meta: { requiresAuth: true }
  },
  {
    // REDIRECT - Default route goes to dashboard
    path: '/',
    redirect: '/dashboard'
  },
  {
    // 404 PAGE - Catch all unmatched routes
    // The * wildcard matches any path not defined above
    path: '*',
    name: 'NotFound',
    component: NotFoundPage
  }
]u

// Create the router instance
const router = new VueRouter({
  // Use hash mode for compatibility (URLs will have #)
  mode: 'hash',
  routes
})

// ============================================
// NAVIGATION GUARD (Global Before Each)
// Runs before every route navigation
// ============================================
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  const routeRequiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  // Check if user is currently authenticated (from Vuex store)
  const userIsAuthenticated = store.getters.isAuthenticated

  // CASE 1: Route needs auth but user is NOT logged in
  if (routeRequiresAuth && !userIsAuthenticated) {
    // Redirect to login page
    next({ name: 'Login' })
  }
  // CASE 2: User is logged in but trying to access login page
  else if (to.name === 'Login' && userIsAuthenticated) {
    // Redirect to dashboard (no need to see login again)
    next({ name: 'Dashboard' })
  }
  // CASE 3: All other cases - allow navigation
  else {
    next()
  }
})

export default router
