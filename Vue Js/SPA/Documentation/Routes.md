# ROUTES — Vue 2 Router (SPA Navigation)

This document explains **routing in a Vue 2 Single Page Application**, including **why routing is needed**, **how it is set up**, **folder structure**, and **all core routing concepts** used in real-world SPAs.

---

## 1️⃣ What is Routing in an SPA?

In a **Single Page Application (SPA)**:

* The browser loads **one HTML file**
* Page changes do **not reload the browser**
* Navigation is handled by **JavaScript**

👉 **Vue Router maps URLs to Vue components**

```
URL  →  Vue Router  →  Page Component  →  <router-view>
```

Without routing:

* URLs don’t change
* Refresh breaks the app
* Back/forward buttons don’t work

Routing makes an SPA feel like a real website.

---

## 2️⃣ Why Vue Router is Needed

Vue Router enables:

* Multiple screens/pages
* Clean URLs
* Browser navigation (back / forward)
* Route protection (auth guards)
* Dynamic pages (`/users/:id`)

Any app with more than one screen **must use routing**.

---

## 3️⃣ Folder Structure (Recommended)

This project follows a **clear separation of responsibilities**.

```
src/
 ├─ pages/                 ← Route-level components (screens)
 │   ├─ LoginPage.vue
 │   ├─ DashboardPage.vue
 │   ├─ UsersListPage.vue
 │   ├─ UserDetailsPage.vue
 │   └─ NotFoundPage.vue
 │
 ├─ components/            ← Reusable UI components
 │   └─ NavBar.vue
 │
 ├─ router/
 │   └─ index.js           ← Vue Router configuration
 │
 ├─ App.vue                ← Root component (contains <router-view>)
 └─ main.js                ← App bootstrap (injects router)
```

### Rule

* **pages/** → full screens mapped to routes
* **components/** → reusable UI (navbar, buttons, cards)

---

## 4️⃣ Installing Vue Router (Vue 2)

Vue 2 requires **vue-router v3**.

```bash
npm install vue-router@3
```

---

## 5️⃣ Router Setup

### `src/router/index.js`

```js
import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from '@/pages/LoginPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import UsersListPage from '@/pages/UsersListPage.vue'
import UserDetailsPage from '@/pages/UserDetailsPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardPage,
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
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFoundPage
    }
  ]
})

export default router
```

---

## 6️⃣ Connecting Router to the App

### `src/main.js`

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

---

## 7️⃣ `<router-view>` — Where Pages Render

### `App.vue`

```vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

`<router-view>` is a **placeholder**.
The component that matches the current URL is rendered here.

Without `<router-view>`, routing will not work.

---

## 8️⃣ `<router-link>` — Navigation (SPA-safe)

Used for **template-based navigation**.

```vue
<router-link to="/login">Login</router-link>
```

Recommended (using route name):

```vue
<router-link :to="{ name: 'Dashboard' }">
  Dashboard
</router-link>
```

❌ Never use:

```html
<a href="/dashboard">
```

Because it:

* reloads the page
* resets app state
* breaks SPA behavior

---

## 9️⃣ Route Types

### Static Routes

Used when page content does not depend on URL data.

```js
{
  path: '/dashboard',
  component: DashboardPage
}
```

Examples:

* `/login`
* `/dashboard`
* `/settings`

---

### Dynamic Routes

Used when URL represents a **specific resource**.

```js
{
  path: '/users/:id',
  component: UserDetailsPage
}
```

URL:

```
/users/42
```

Accessing the parameter:

```js
this.$route.params.id
```

Dynamic routes represent **identity**.

---

## 🔟 Route Params vs Query Params

### Route Params

```
/users/42
```

```js
this.$route.params.id
```

Use when:

* value is required
* identifies a single resource

Think: **WHO**

---

### Query Params

```
/users?page=2&sort=name
```

```js
this.$route.query.page
```

Use when:

* value is optional
* used for filters, sorting, pagination

Think: **HOW**

---

### Golden Rule

* **Params = identity**
* **Query = options**

---

## 1️⃣1️⃣ Programmatic Navigation

Used when navigation happens after logic (login, logout, submit).

```js
this.$router.push('/dashboard')
```

Recommended:

```js
this.$router.push({ name: 'Dashboard' })
```

With params:

```js
this.$router.push({
  name: 'UserDetails',
  params: { id: 42 }
})
```

With query:

```js
this.$router.push({
  path: '/users',
  query: { page: 2 }
})
```

---

## 1️⃣2️⃣ 404 / Fallback Route

Must be **last** in routes array.

```js
{
  path: '*',
  component: NotFoundPage
}
```

Why:

* catches invalid URLs
* prevents blank pages
* improves UX

---

## 1️⃣3️⃣ Route Design Checklist

Before coding routes, ask:

1. What are my screens?
2. Which screens need IDs?
3. Which screens need filters?
4. Which URLs should be shareable?

Example:

```
/login
/dashboard
/users
/users/42
/search?q=vue
```

---

## 1️⃣4️⃣ Common Mistakes

❌ Using `<a href>`
❌ Using query params for IDs
❌ Reusing list page for details
❌ Forgetting 404 route
❌ Missing `<router-view>`
❌ Using hash mode without reason

---

## ✅ Summary

* Vue Router maps **URL → Component**
* `<router-view>` renders pages
* `<router-link>` enables SPA navigation
* Dynamic routes use params
* Queries are for filters/options
* History mode is recommended
* 404 route is mandatory

---

📌 **This document covers all routing concepts required for a Vue 2 SPA.**
