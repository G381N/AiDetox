Good. Phase 1 is **navigation backbone**.
If you screw this up, everything built on top is fragile trash.
By the end of this, you should be able to **design routes on paper** before touching code.

No AI. No guessing. Just understanding.

---

# 🟩 PHASE 1 — VUE ROUTER (DEEP, COMPLETE, NO GAPS)

## 🎯 Phase Goal

You must be able to:

* design routes for any app
* write router config from memory
* choose params vs query correctly
* debug routing issues without Google

If you can’t explain *why* a route exists, it shouldn’t exist.

---

## 1️⃣ WHAT ROUTING REALLY IS (NO FRAMEWORK TALK)

In a **traditional app**:

* URL → backend → HTML page

In a **SPA**:

* URL → **router** → Vue component
* backend is NOT involved in page switching

👉 Vue Router is just a **URL → Component mapper**

That’s it. Nothing magical.

---

## 2️⃣ WHEN YOU NEED ROUTER (RULE)

You need Vue Router **IF AND ONLY IF**:

* your app has multiple screens
* URL should change
* back / forward button must work

❌ Modals, tabs, dropdowns → **NO ROUTER**
✅ Login, dashboard, profile → **ROUTER**

If you route tabs, you’re already doing dumb stuff.

---

## 3️⃣ INSTALL & WIREFRAME (FROM SCRATCH)

### Install

```bash
npm install vue-router
```

### File structure (DO THIS EVERY TIME)

```
src/
 ├─ views/        ← route-level components ONLY
 │   ├─ Login.vue
 │   ├─ Dashboard.vue
 │   └─ UserProfile.vue
 ├─ router/
 │   └─ index.js
 └─ main.js
```

**Rule:**

* `views` = pages
* `components` = reusable UI

If you mix this, your app will rot.

---

## 4️⃣ ROUTER SETUP (MEMORIZE THIS)

### `/src/router/index.js`

```js
import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/dashboard',
      component: Dashboard
    }
  ]
})

export default router
```

### `/src/main.js`

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

If you can’t write this **without looking**, stop here and repeat.

---

## 5️⃣ `history` vs `hash` (PRODUCTION KNOWLEDGE)

### Hash mode

```
example.com/#/login
```

Why it exists:

* no backend config needed

Why it sucks:

* ugly
* SEO trash
* looks amateur

### History mode (REAL APPS)

```
example.com/login
```

⚠️ Requires backend fallback:

```nginx
try_files $uri /index.html;
```

**Rule:**

* portfolio → history
* startup → history
* serious app → history

If someone tells you hash is fine → they never shipped prod.

---

## 6️⃣ `<router-view>` & `<router-link>` (NON-OPTIONAL)

### `App.vue`

```html
<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>
```

### Navigation

```html
<router-link to="/login">Login</router-link>
```

❌ NEVER

```html
<a href="/login">Login</a>
```

Why?

* reloads page
* loses state
* kills SPA benefits

If you do this → instant downgrade.

---

## 7️⃣ STATIC ROUTES (EASY)

```js
{
  path: '/about',
  component: About
}
```

Used for:

* login
* dashboard
* settings
* help

If route content doesn’t change based on URL → static route.

---

## 8️⃣ DYNAMIC ROUTES (CRITICAL)

### Route

```js
{
  path: '/users/:id',
  component: UserProfile
}
```

### URL

```
/users/42
```

### Accessing param

```js
this.$route.params.id
```

### Mental rule

> **Dynamic routes represent identity**

User ID
Order ID
Product ID

If it identifies **one unique thing** → param.

---

## 9️⃣ PARAMS vs QUERY (THIS CONFUSES PEOPLE)

### PARAM

```
/users/42
```

```js
this.$route.params.id
```

Use when:

* resource identity
* required value
* page breaks without it

---

### QUERY

```
/users?tab=posts&page=2
```

```js
this.$route.query.tab
```

Use when:

* filters
* sorting
* optional data
* pagination

---

### GOLDEN RULE (DO NOT VIOLATE)

* **Params = WHO**
* **Query = HOW**

If you swap them, your URLs become nonsense.

---

## 🔟 PROGRAMMATIC NAVIGATION

```js
this.$router.push('/login')
```

With params:

```js
this.$router.push({
  path: `/users/${id}`
})
```

With query:

```js
this.$router.push({
  path: '/users',
  query: { page: 2 }
})
```

Use this after:

* login success
* logout
* button actions

---

## 1️⃣1️⃣ 404 / FALLBACK ROUTE (PROFESSIONALISM)

```js
{
  path: '*',
  component: NotFound
}
```

Always last.

If user hits a broken link and sees blank page → you failed.

---

## 1️⃣2️⃣ ROUTE DESIGN THINKING (IMPORTANT)

Before coding, ask:

1. What pages exist?
2. Which ones need IDs?
3. Which ones need filters?
4. Which URLs should be shareable?

Example:

```
/login
/dashboard
/users
/users/42
/users/42/settings
/search?q=vue
```

This is **architecture**, not syntax.

---

## 1️⃣3️⃣ COMMON MISTAKES (BRUTAL)

❌ Routing components inside components
❌ Using query for identity
❌ Using params for filters
❌ Forgetting 404
❌ Using `<a href>`
❌ Mixing `views` and `components`

Each one causes pain later.
