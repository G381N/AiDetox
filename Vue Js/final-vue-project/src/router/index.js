import Vue from 'vue';
import Router from 'vue-router';

// Importing all the pages  in order of User Flow
import Login from '@/pages/login-page.vue'
import Dashboard from '@/pages/dashboard-page.vue'
import UserListPage from '@/pages/user-list-page.vue'
import UserDetailsPage from '@/pages/user-details-page.vue'
import NotFound from '@/pages/not-found-page.vue'

Vue.use(Router)// Telling Vue to use the Router plugin

const router = new Router({
    mode: 'history',   // Using history mode to avoid hash in URLs
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
           path: '/dashboard',
           name: 'Dashboard',
           component: Dashboard
        },
        {
            path: '/users',
            name: 'UserListPage',
            component: UserListPage
        },
        {  
            path: '/users/:id',
            name: 'UserDetailsPage',
            component: UserDetailsPage
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})

export default router