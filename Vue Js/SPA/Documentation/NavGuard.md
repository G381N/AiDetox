# NAVIGATION GUARDS — Vue Router (Vue 2)

This document explains **Navigation Guards** in Vue Router, their purpose, types, syntax, and real-world use cases in a Vue 2 SPA.

---

## 1️⃣ What Are Navigation Guards?

Navigation guards are **functions that run before a route change**.

They decide:

* ✅ allow navigation
* ❌ block navigation
* 🔁 redirect to another route

They are used for:

* authentication
* authorization (roles)
* preventing data loss
* conditional redirects

---

## 2️⃣ Why Navigation Guards Are Needed

Without guards:

* Protected routes can be accessed directly via URL
* Authentication is only UI-based (insecure)
* Users can lose unsaved data

Guards enforce **rules before navigation happens**.

---

## 3️⃣ Types of Navigation Guards

Vue Router provides **three levels** of guards:

| Guard Type      | Scope                      |
| --------------- | -------------------------- |
| Global          | Runs on every route change |
| Route-level     | Runs for a specific route  |
| Component-level | Runs inside a component    |

---

## 4️⃣ Global Guards (`beforeEach`)

### Purpose

Used for **app-wide rules**, mainly authentication.

### Syntax

```js
router.beforeEach((to, from, next) => {
  next()
})
```

### Auth Protection Example

```js
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
```

### Key Points

* Runs on every navigation
* Uses `meta` fields from routes
* Must always call `next()`

---

## 5️⃣ Route Metadata (`meta`)

Routes can carry custom metadata.

```js
{
  path: '/dashboard',
  component: DashboardPage,
  meta: { requiresAuth: true }
}
```

`meta` is not used by Vue Router automatically — it is **read by guards**.

---

## 6️⃣ Route-Level Guards (`beforeEnter`)

### Purpose

Used for **specific route logic** (e.g. role checks).

### Syntax

```js
{
  path: '/admin',
  component: AdminPage,
  beforeEnter: (to, from, next) => {
    const isAdmin = false
    isAdmin ? next() : next('/dashboard')
  }
}
```

### Use When

* Only one route needs special logic
* Role-based access control

---

## 7️⃣ Component Guards

Used when navigation logic depends on **component state**.

---

### `beforeRouteEnter`

Runs **before component is created**.

```js
beforeRouteEnter(to, from, next) {
  next(vm => {
    vm.fetchData()
  })
}
```

⚠️ `this` is not available directly.

---

### `beforeRouteLeave`

Runs **when leaving a component**.

```js
beforeRouteLeave(to, from, next) {
  if (this.hasUnsavedChanges) {
    if (!confirm('Discard changes?')) {
      next(false)
      return
    }
  }
  next()
}
```

Used to prevent losing unsaved data.

---

## 8️⃣ `next()` Behavior

`next()` controls navigation:

| Usage                     | Result            |
| ------------------------- | ----------------- |
| `next()`                  | Allow navigation  |
| `next(false)`             | Cancel navigation |
| `next('/login')`          | Redirect          |
| `next({ name: 'Login' })` | Redirect          |

Failing to call `next()` will **freeze navigation**.

---

## 9️⃣ Common Use Cases

* Auth protection → Global guard
* Role-based access → Route-level guard
* Unsaved form protection → `beforeRouteLeave`
* Data pre-fetch → `beforeRouteEnter`

---

## 1️⃣0️⃣ Common Mistakes

❌ Forgetting `next()`
❌ Using `this` in `beforeRouteEnter`
❌ Putting auth logic inside components
❌ Redirect loops
❌ Duplicating guard logic

---

## ✅ Summary

* Navigation guards run **before route changes**
* Global guards handle app-wide rules
* Route-level guards handle specific routes
* Component guards handle component-specific logic
* `meta` communicates intent from routes
* `next()` decides navigation outcome
