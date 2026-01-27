import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: LoginView },

    {
      path: '/dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },

    {
      path: '/projects',
      component: ProjectsView,
      meta: { requiresAuth: true }
    },

    {
      path: '/projects/:id',
      component: ProjectDetailView,
      meta: { requiresAuth: true }
    },

    { path: '*', redirect: '/login' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
