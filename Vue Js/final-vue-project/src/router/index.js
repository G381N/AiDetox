import vue from 'vue'
import Router from 'vue-router'


// Importing all the pages  in order of User Flow
import Login from '@/pages/Login.vue'
import Dashboard from '@/pages/Dashboard.vue'
import UserListPage from '@/pages/UserListPage.vue'
import UserDetailsPage from '@/pages/UserDetailsPage.vue'
import NotFound from '@/pages/NotFound.vue'

vue.use(Router)// Telling Vue to use the Router plugin

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