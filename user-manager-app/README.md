# User Manager App

A Vue.js learning project to understand **Props** and **$emit**.

## 📊 Props Flow (Data flows DOWN ⬇️)

```
App.vue
  │
  │ users: [] (array)
  │
  ├──> UserList.vue
  │      │
  │      │ user: {} (object)
  │      │ index: number
  │      │
  │      └──> UserItem.vue
  │
  └──> UserForm.vue
```

**App.vue** sends `users` array down to **UserList.vue**.  
**UserList.vue** then sends individual `user` object and `index` down to each **UserItem.vue**.

## 📤 Emit Flow (Events flow UP ⬆️)

```
UserForm.vue
  │
  │ $emit('add-user', newUser)
  │
  └──> App.vue (receives user, adds to array)


UserItem.vue
  │
  │ $emit('delete-user', index)
  │
  └──> UserList.vue
         │
         │ re-emits $emit('delete-user', index)
         │
         └──> App.vue (receives index, deletes from array)
```

**UserForm.vue** emits `add-user` event up to **App.vue** with new user data.  
**UserItem.vue** emits `delete-user` event up to **UserList.vue**, which re-emits it up to **App.vue**.

## 🧩 What Each Component Does

| Component | Props It Receives | Events It Emits | What It Does |
|-----------|------------------|-----------------|--------------|
| **App.vue** | None (root) | None | Stores `users` array, handles add/delete |
| **UserForm.vue** | None | `add-user` | Form to add new user |
| **UserList.vue** | `users` (Array) | `delete-user` (re-emitted) | Loops through users, passes to UserItem |
| **UserItem.vue** | `user` (Object), `index` (Number) | `delete-user` | Displays one user, has delete button |

[ Parent Component ]
       |
       |  :prop-name="data" (Data flows down)
       v
[ Child Component ]
       |
       |  $emit('event-name') (Events flow up)
       v
[ Parent Component ]
```

#### Implementation Example

**Parent Component**
```vue
<template>
  <UserCard 
    :name="userName" 
    @update-name="handleUpdate" 
  />
</template>
```

**Child Component**
```vue
<template>
  <div>
    <h3>{{ name }}</h3>
    <button @click="$emit('update-name', 'New Name')">Change Name</button>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  }
}
</script>
