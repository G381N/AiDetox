# Project Structure & Setup Guide

## Project Overview

This is a Vue 2 dashboard application using BootstrapVue for UI components.

---

## Directory Structure

```
dashboard/
│
├── public/
│   └── index.html              # Main HTML file (entry point)
│
├── src/
│   ├── components/             # Reusable Vue components
│   │   ├── StatsCard.vue       # Statistics card widget
│   │   ├── BaseButton.vue      # Reusable button component
│   │   ├── UserTable.vue       # User management table
│   │   └── AddUserModal.vue    # Modal for adding users
│   │
│   ├── App.vue                 # Root component
│   └── main.js                 # Application entry point
│
├── Documentation/              # Project documentation
│   ├── BootstrapVue-Guide.md   # BootstrapVue reference
│   ├── Vue2-Fundamentals.md    # Vue 2 basics
│   └── Project-Setup.md        # This file
│
├── node_modules/               # Dependencies (auto-generated)
├── dist/                       # Build output (auto-generated)
│
├── .babelrc                    # Babel configuration
├── package.json                # Project dependencies
└── webpack.config.js           # Webpack configuration
```

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Navigate to project directory:**
   ```bash
   cd c:\Users\gebin\OneDrive\Desktop\AiDetox\VueDashboard\dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This installs:
   - Vue 2
   - BootstrapVue
   - Bootstrap
   - Webpack and build tools

3. **Start development server:**
   ```bash
   npm run serve
   ```
   
   This will:
   - Compile the application
   - Start a development server
   - Open http://localhost:8080 in your browser
   - Enable hot reload (auto-refresh on file changes)

4. **Build for production:**
   ```bash
   npm run build
   ```
   
   This creates optimized files in the `dist/` folder.

---

## File Explanations

### package.json

**Purpose:** Defines project dependencies and scripts.

**Key Sections:**
```json
{
  "scripts": {
    "serve": "webpack serve --mode development --open",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "vue": "^2.7.14",
    "bootstrap": "^4.6.2",
    "bootstrap-vue": "^2.23.1"
  },
  "devDependencies": {
    "webpack": "^5.88.0",
    // ... build tools
  }
}
```

**Dependencies:**
- `vue`: Vue.js framework (version 2.7)
- `bootstrap`: CSS framework for styling
- `bootstrap-vue`: Vue components for Bootstrap

**DevDependencies:**
- `webpack`: Module bundler
- `babel`: JavaScript compiler for modern features
- `vue-loader`: Webpack loader for .vue files

---

### webpack.config.js

**Purpose:** Configures how the application is built.

**What it does:**
1. Entry point: `src/main.js`
2. Output: Bundles everything into `dist/bundle.js`
3. Loaders:
   - `.vue` files → vue-loader
   - `.js` files → babel-loader
   - `.css` files → style-loader + css-loader
4. Dev server: Runs on port 8080

**Key Configuration:**
```javascript
module.exports = {
  entry: './src/main.js',           // Start here
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'            // Output file
  },
  module: {
    rules: [
      {
        test: /\.vue$/,              // For .vue files
        loader: 'vue-loader'          // Use vue-loader
      },
      {
        test: /\.js$/,               // For .js files
        loader: 'babel-loader'        // Use babel-loader
      }
    ]
  }
};
```

---

### .babelrc

**Purpose:** Configures Babel to transpile modern JavaScript.

```json
{
  "presets": ["@babel/preset-env"]
}
```

**What it does:**
- Converts ES6+ code to ES5
- Ensures compatibility with older browsers
- Allows using modern JavaScript features

---

### public/index.html

**Purpose:** The main HTML file loaded by the browser.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue Dashboard</title>
</head>
<body>
  <div id="app"></div>
  <!-- Webpack injects bundle.js here -->
</body>
</html>
```

**What happens:**
1. Browser loads this HTML
2. Webpack injects `<script src="bundle.js"></script>`
3. Vue mounts to `<div id="app"></div>`
4. App.vue replaces the div content

---

### src/main.js

**Purpose:** Application entry point, initializes Vue.

```javascript
import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

new Vue({
  render: h => h(App)
}).$mount('#app');
```

**Execution flow:**
1. Import Vue library
2. Import root component (App.vue)
3. Import Bootstrap and BootstrapVue CSS
4. Register BootstrapVue plugin
5. Create Vue instance
6. Mount to #app element

---

### src/App.vue

**Purpose:** Root component containing the entire dashboard.

**Structure:**
```vue
<template>
  <!-- Navigation bar -->
  <b-navbar>...</b-navbar>
  
  <!-- Main content -->
  <b-container>
    <!-- Stats cards -->
    <b-row>
      <StatsCard />
      <StatsCard />
      <StatsCard />
      <StatsCard />
    </b-row>
    
    <!-- User table -->
    <UserTable />
  </b-container>
  
  <!-- Add user modal -->
  <AddUserModal />
</template>

<script>
import StatsCard from './components/StatsCard.vue';
import UserTable from './components/UserTable.vue';
import AddUserModal from './components/AddUserModal.vue';

export default {
  components: { StatsCard, UserTable, AddUserModal },
  data() {
    return {
      users: [...],
      stats: {...}
    };
  }
}
</script>
```

---

## Component Files

### StatsCard.vue

**Purpose:** Display a statistic (e.g., Total Users, Revenue).

**Props:**
- `titleProp`: Card title (e.g., "Total Users")
- `valueProp`: Statistic value (e.g., 1245)
- `iconProp`: Optional icon class
- `variantProp`: Color variant (primary, success, etc.)

**Usage:**
```vue
<StatsCard
  v-bind:title-prop="'Total Users'"
  v-bind:value-prop="1245"
  v-bind:variant-prop="'primary'"
></StatsCard>
```

---

### BaseButton.vue

**Purpose:** Reusable button with consistent styling.

**Props:**
- `textProp`: Button text
- `variantProp`: Color variant
- `sizeProp`: Button size (sm, md, lg)
- `disabledProp`: Disabled state

**Events:**
- `button-clicked`: Emitted when button is clicked

**Usage:**
```vue
<BaseButton
  v-bind:text-prop="'Add User'"
  v-bind:variant-prop="'primary'"
  v-on:button-clicked="handleClick"
></BaseButton>
```

---

### UserTable.vue

**Purpose:** Display users in a table with status badges.

**Props:**
- `usersProp`: Array of user objects

**Features:**
- Sortable columns
- Status badges (Active/Inactive)
- Empty state handling

**Usage:**
```vue
<UserTable v-bind:users-prop="usersList"></UserTable>
```

---

### AddUserModal.vue

**Purpose:** Modal dialog for adding new users.

**Props:**
- `showModalProp`: Controls modal visibility

**Events:**
- `user-added`: Emitted when user submits form
- `modal-closed`: Emitted when modal is closed

**Usage:**
```vue
<AddUserModal
  v-bind:show-modal-prop="showModal"
  v-on:user-added="handleUserAdded"
  v-on:modal-closed="handleModalClosed"
></AddUserModal>
```

---

## Data Flow

### Props Flow (Parent → Child)

```
App.vue (Parent)
    ↓ props
StatsCard.vue (Child)
    - titleProp: "Total Users"
    - valueProp: 1245
```

**In App.vue:**
```vue
<StatsCard
  v-bind:title-prop="dashboardStats.totalUsers.title"
  v-bind:value-prop="dashboardStats.totalUsers.value"
></StatsCard>
```

**In StatsCard.vue:**
```vue
<script>
export default {
  props: {
    titleProp: String,
    valueProp: Number
  }
}
</script>
```

---

### Event Flow (Child → Parent)

```
AddUserModal.vue (Child)
    ↑ emit event
App.vue (Parent)
    - Receives new user data
    - Adds to users array
```

**In AddUserModal.vue:**
```vue
methods: {
  handleSubmit() {
    this.$emit('user-added', newUserData);
  }
}
```

**In App.vue:**
```vue
<AddUserModal
  v-on:user-added="handleUserAdded"
></AddUserModal>

<script>
methods: {
  handleUserAdded(userData) {
    this.users.push(userData);
  }
}
</script>
```

---

## Build Process

### Development Build

```bash
npm run serve
```

**What happens:**
1. Webpack reads `src/main.js`
2. Follows all imports (components, CSS, etc.)
3. Bundles everything into memory
4. Starts development server
5. Watches for file changes
6. Hot reloads browser on changes

---

### Production Build

```bash
npm run build
```

**What happens:**
1. Webpack bundles all files
2. Minifies JavaScript and CSS
3. Optimizes for performance
4. Outputs to `dist/` folder
5. Creates:
   - `dist/bundle.js` (minified)
   - `dist/index.html`

**To deploy:**
Upload the entire `dist/` folder to a web server.

---

## Troubleshooting

### Port 8080 already in use

**Error:**
```
Port 8080 is already in use
```

**Solution:**
Change port in webpack.config.js:
```javascript
devServer: {
  port: 8081  // Changed from 8080
}
```

---

### Module not found errors

**Error:**
```
Module not found: Can't resolve 'bootstrap-vue'
```

**Solution:**
```bash
npm install
```

---

### Changes not showing

**Solutions:**
1. Hard refresh browser: Ctrl + F5
2. Clear browser cache
3. Restart dev server:
   ```bash
   # Stop server (Ctrl + C)
   npm run serve
   ```

---

## Development Workflow

### Adding a New Component

1. **Create component file:**
   ```
   src/components/MyComponent.vue
   ```

2. **Import in parent component:**
   ```vue
   <script>
   import MyComponent from './components/MyComponent.vue';
   
   export default {
     components: {
       MyComponent
     }
   }
   </script>
   ```

3. **Use in template:**
   ```vue
   <template>
     <MyComponent></MyComponent>
   </template>
   ```

---

### Making Changes

1. Edit .vue file
2. Save file
3. Browser automatically refreshes
4. Check browser console for errors

---

### Debugging

**Vue DevTools:**
- Install Vue DevTools browser extension
- Inspect component data
- View component hierarchy
- Track events

**Console Logging:**
```javascript
console.log('Current users:', this.users);
```

**Debugging in Browser:**
1. Open DevTools (F12)
2. Go to Sources tab
3. Find your .vue file
4. Set breakpoints
5. Inspect variables

---

## Best Practices

### 1. Component Organization
- One component per file
- Component names should be multi-word (avoid single words)
- Use PascalCase for component names

### 2. Props
- Always validate prop types
- Mark required props
- Provide defaults when sensible

### 3. Events
- Use kebab-case for event names (`user-added`, not `userAdded`)
- Emit events, don't call parent methods

### 4. Code Style
- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Use descriptive variable names

### 5. Performance
- Use `v-show` for frequent toggling
- Use `v-if` for conditional rendering
- Always use `:key` with `v-for`

---

## Next Steps

### Learning Path

1. **Understand the basics** (Documentation/)
   - Read Vue2-Fundamentals.md
   - Read BootstrapVue-Guide.md

2. **Explore the code**
   - Open src/App.vue
   - Follow the component imports
   - Understand data flow

3. **Make changes**
   - Modify some text in StatsCard
   - Change colors/variants
   - Add a new stat card

4. **Experiment**
   - Add a new component
   - Add a new form field
   - Create a new modal

5. **Build something**
   - Add a search feature
   - Add user edit functionality
   - Add user delete functionality

---

## Additional Resources

### Official Documentation
- Vue 2: https://v2.vuejs.org/
- BootstrapVue: https://bootstrap-vue.org/
- Bootstrap 4: https://getbootstrap.com/docs/4.6/

### Helpful Tools
- Vue DevTools: Browser extension for debugging
- VS Code Extensions:
  - Vetur (Vue syntax highlighting)
  - ESLint (code quality)

---

## Summary

### Project Structure
```
public/index.html → Loads →
src/main.js → Initializes →
src/App.vue → Uses →
src/components/*.vue
```

### Development Cycle
```
1. Edit .vue files
2. Save
3. Webpack rebuilds
4. Browser reloads
5. Test changes
6. Repeat
```

### Data Flow
```
Parent (App.vue)
  ↓ Props
Child Components (display data)
  ↑ Events
Parent (update data)
```
