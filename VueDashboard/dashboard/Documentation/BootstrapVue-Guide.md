# BootstrapVue Documentation

## Table of Contents
1. [BootstrapVue Setup](#1-bootstrapvue-setup)
2. [Layout System (Grid & Utilities)](#2-layout-system-grid--utilities)
3. [Navigation Components](#3-navigation-components)
4. [Cards & Dashboard Widgets](#4-cards--dashboard-widgets)
5. [Forms & Inputs](#5-forms--inputs)
6. [Tables](#6-tables)
7. [Modals](#7-modals)
8. [Reusable UI Components](#8-reusable-ui-components)

---

## 1. BootstrapVue Setup

### What is BootstrapVue?
BootstrapVue is a Vue.js implementation of Bootstrap 4 components. It provides Vue-specific components that integrate seamlessly with Vue's reactivity system.

### Installation

```bash
npm install bootstrap bootstrap-vue
```

### Importing in main.js

```javascript
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';

// Import BootstrapVue CSS
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import BootstrapVue library
import BootstrapVue from 'bootstrap-vue';

// Register BootstrapVue as a global plugin
Vue.use(BootstrapVue);
```

### What Happens in the DOM?
When you register BootstrapVue:
- All BootstrapVue components (b-button, b-card, etc.) become available globally
- No need to import individual components in each file
- Components will render as regular HTML with Bootstrap CSS classes

**Example:**
```vue
<b-button variant="primary">Click Me</b-button>
```

**Renders as:**
```html
<button class="btn btn-primary">Click Me</button>
```

---

## 2. Layout System (Grid & Utilities)

### Grid Components

#### b-container
Creates a responsive container that centers content and provides padding.

**Usage:**
```vue
<b-container>
  Content goes here
</b-container>
```

**DOM Output:**
```html
<div class="container">
  Content goes here
</div>
```

**What it does:**
- Centers content horizontally
- Adds responsive padding on left and right
- Max width adjusts based on screen size

---

#### b-row
Creates a flexbox row for grid layout.

**Usage:**
```vue
<b-row>
  <b-col>Column 1</b-col>
  <b-col>Column 2</b-col>
</b-row>
```

**DOM Output:**
```html
<div class="row">
  <div class="col">Column 1</div>
  <div class="col">Column 2</div>
</div>
```

**What it does:**
- Creates a horizontal row
- Uses flexbox for alignment
- Negative margin to offset column padding

---

#### b-col (Columns)
Creates responsive columns within a row.

**Usage:**
```vue
<!-- Equal width columns -->
<b-col>Column 1</b-col>
<b-col>Column 2</b-col>

<!-- Specific widths (12 column grid) -->
<b-col v-bind:cols="6">Half width</b-col>
<b-col v-bind:cols="3">Quarter width</b-col>

<!-- Responsive breakpoints -->
<b-col v-bind:cols="12" v-bind:md="6" v-bind:lg="3">
  Responsive column
</b-col>
```

**DOM Output:**
```html
<!-- cols="12" md="6" lg="3" -->
<div class="col-12 col-md-6 col-lg-3">
  Responsive column
</div>
```

**What it does:**
- Bootstrap uses 12-column grid system
- `cols="6"` means take up 6/12 (50%) of row width
- `md="6"` means 50% width on medium screens and up
- `lg="3"` means 25% width on large screens and up

**Breakpoints:**
- `cols`: Extra small devices (< 576px)
- `sm`: Small devices (≥ 576px)
- `md`: Medium devices (≥ 768px)
- `lg`: Large devices (≥ 992px)
- `xl`: Extra large devices (≥ 1200px)

---

### Utility Classes

#### Spacing Utilities
Bootstrap provides utility classes for margin and padding.

**Format:**
- `m-*` : margin
- `p-*` : padding
- `t` : top
- `b` : bottom
- `l` : left
- `r` : right
- `x` : left and right
- `y` : top and bottom

**Examples:**
```vue
<!-- Margin top 3 -->
<div class="mt-3">Content</div>

<!-- Padding all sides 4 -->
<div class="p-4">Content</div>

<!-- Margin bottom 2, padding horizontal 3 -->
<div class="mb-2 px-3">Content</div>
```

**Scale:** 0-5 (0 = 0px, 1 = 0.25rem, 2 = 0.5rem, 3 = 1rem, 4 = 1.5rem, 5 = 3rem)

---

#### Text Alignment
```vue
<div class="text-left">Left aligned</div>
<div class="text-center">Center aligned</div>
<div class="text-right">Right aligned</div>
```

---

#### Display Utilities
```vue
<!-- Flexbox utilities -->
<div class="d-flex">Flex container</div>
<div class="d-flex justify-content-between">Space between items</div>
<div class="d-flex align-items-center">Vertically center items</div>

<!-- Visibility -->
<div class="d-none">Hidden</div>
<div class="d-block">Block display</div>
<div class="d-inline">Inline display</div>

<!-- Responsive display -->
<div class="d-none d-md-block">Hidden on mobile, visible on tablet+</div>
```

---

## 3. Navigation Components

### b-navbar
Creates a responsive navigation bar.

**Usage:**
```vue
<b-navbar v-bind:type="'dark'" v-bind:variant="'primary'">
  <b-navbar-brand v-bind:href="'#'">Brand</b-navbar-brand>
  <b-navbar-nav>
    <b-nav-item v-bind:href="'#'" v-bind:active="true">Home</b-nav-item>
    <b-nav-item v-bind:href="'#'">About</b-nav-item>
  </b-navbar-nav>
</b-navbar>
```

**DOM Output:**
```html
<nav class="navbar navbar-dark bg-primary">
  <a class="navbar-brand" href="#">Brand</a>
  <ul class="navbar-nav">
    <li class="nav-item active">
      <a class="nav-link" href="#">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">About</a>
    </li>
  </ul>
</nav>
```

**Props:**
- `type`: "light" or "dark" (text color)
- `variant`: Bootstrap color variant (primary, success, danger, etc.)

---

### b-navbar-toggle
Creates a hamburger menu button for mobile responsiveness.

**Usage:**
```vue
<b-navbar-toggle v-bind:target="'nav-collapse'"></b-navbar-toggle>

<b-collapse v-bind:id="'nav-collapse'" v-bind:is-nav="true">
  <!-- Navigation items here -->
</b-collapse>
```

**What it does:**
- Shows hamburger icon on small screens
- Hides regular menu items
- Clicking toggle reveals/hides collapsed menu
- `target` connects to the collapse component ID

---

### b-nav-item
Creates a navigation link.

**Usage:**
```vue
<b-nav-item v-bind:href="'#home'" v-bind:active="true">
  Home
</b-nav-item>
```

**Props:**
- `href`: Link destination
- `active`: Boolean - highlights as current page

---

### b-nav-item-dropdown
Creates a dropdown menu in navbar.

**Usage:**
```vue
<b-nav-item-dropdown v-bind:text="'User'" v-bind:right="true">
  <b-dropdown-item v-bind:href="'#'">Profile</b-dropdown-item>
  <b-dropdown-item v-bind:href="'#'">Settings</b-dropdown-item>
  <b-dropdown-divider></b-dropdown-divider>
  <b-dropdown-item v-bind:href="'#'">Logout</b-dropdown-item>
</b-nav-item-dropdown>
```

**DOM Output:**
```html
<li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" href="#" role="button">User</a>
  <div class="dropdown-menu dropdown-menu-right">
    <a class="dropdown-item" href="#">Profile</a>
    <a class="dropdown-item" href="#">Settings</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Logout</a>
  </div>
</li>
```

---

## 4. Cards & Dashboard Widgets

### b-card
Creates a flexible content container.

**Basic Usage:**
```vue
<b-card v-bind:title="'Card Title'">
  Card content goes here
</b-card>
```

**DOM Output:**
```html
<div class="card">
  <div class="card-body">
    <h4 class="card-title">Card Title</h4>
    <p class="card-text">Card content goes here</p>
  </div>
</div>
```

---

### Card with Header and Footer

**Usage:**
```vue
<b-card>
  <template v-slot:header>
    <h6>Header Content</h6>
  </template>
  
  <b-card-text>
    Main card content
  </b-card-text>
  
  <template v-slot:footer>
    <small class="text-muted">Footer text</small>
  </template>
</b-card>
```

**DOM Output:**
```html
<div class="card">
  <div class="card-header">
    <h6>Header Content</h6>
  </div>
  <div class="card-body">
    <p class="card-text">Main card content</p>
  </div>
  <div class="card-footer">
    <small class="text-muted">Footer text</small>
  </div>
</div>
```

---

### Card with Border Variant

**Usage:**
```vue
<b-card v-bind:border-variant="'primary'">
  Content
</b-card>
```

**DOM Output:**
```html
<div class="card border-primary">
  <div class="card-body">Content</div>
</div>
```

**Variants:** primary, secondary, success, danger, warning, info, light, dark

---

### Dashboard Stats Card Example

**Usage:**
```vue
<b-card v-bind:border-variant="'success'">
  <template v-slot:header>
    <h6>Total Users</h6>
  </template>
  <h2>1,245</h2>
  <template v-slot:footer>
    <small>↑ 12% from last month</small>
  </template>
</b-card>
```

**What it creates:**
- Card with green border (success variant)
- Header section with title
- Large number in body
- Footer with additional info

---

## 5. Forms & Inputs

### b-form
Creates a form container.

**Usage:**
```vue
<b-form v-on:submit.prevent="handleSubmit">
  <!-- Form fields here -->
</b-form>
```

**What `.prevent` does:**
- Same as `event.preventDefault()`
- Prevents default form submission (page reload)
- Allows you to handle submission with JavaScript

---

### b-form-group
Creates a form field group with label.

**Usage:**
```vue
<b-form-group
  v-bind:label="'Email:'"
  v-bind:label-for="'input-email'"
  v-bind:description="'We will never share your email'"
>
  <b-form-input v-bind:id="'input-email'"></b-form-input>
</b-form-group>
```

**DOM Output:**
```html
<div class="form-group">
  <label for="input-email">Email:</label>
  <input id="input-email" class="form-control" type="text">
  <small class="form-text text-muted">
    We will never share your email
  </small>
</div>
```

---

### b-form-input
Creates a text input field.

**Usage:**
```vue
<b-form-input
  v-bind:id="'input-name'"
  v-model="userName"
  v-bind:type="'text'"
  v-bind:placeholder="'Enter your name'"
  v-bind:required="true"
></b-form-input>
```

**DOM Output:**
```html
<input 
  id="input-name"
  class="form-control"
  type="text"
  placeholder="Enter your name"
  required
>
```

**Props:**
- `type`: text, email, password, number, etc.
- `placeholder`: Hint text when empty
- `required`: Makes field mandatory
- `disabled`: Makes field uneditable

**v-model binding:**
- Creates two-way data binding
- When user types, `userName` variable updates
- When `userName` changes in code, input updates

---

### b-form-select
Creates a dropdown select menu.

**Usage:**
```vue
<b-form-select
  v-model="selectedRole"
  v-bind:options="roleOptions"
></b-form-select>

<!-- In component data: -->
data: function() {
  return {
    selectedRole: 'User',
    roleOptions: [
      { value: 'Admin', text: 'Administrator' },
      { value: 'User', text: 'Regular User' },
      { value: 'Guest', text: 'Guest User' }
    ]
  }
}
```

**DOM Output:**
```html
<select class="form-control">
  <option value="Admin">Administrator</option>
  <option value="User" selected>Regular User</option>
  <option value="Guest">Guest User</option>
</select>
```

---

### b-form-textarea
Creates a multi-line text input.

**Usage:**
```vue
<b-form-textarea
  v-model="userComments"
  v-bind:rows="3"
  v-bind:placeholder="'Enter comments'"
></b-form-textarea>
```

**DOM Output:**
```html
<textarea class="form-control" rows="3" placeholder="Enter comments">
</textarea>
```

---

### b-button
Creates a styled button.

**Usage:**
```vue
<b-button 
  v-bind:variant="'primary'"
  v-bind:size="'lg'"
  v-bind:type="'submit'"
  v-on:click="handleClick"
>
  Submit
</b-button>
```

**DOM Output:**
```html
<button class="btn btn-primary btn-lg" type="submit">
  Submit
</button>
```

**Props:**
- `variant`: primary, secondary, success, danger, warning, info, light, dark
- `size`: sm, md (default), lg
- `type`: button, submit, reset
- `disabled`: Boolean

---

### Form Layout Example

**Usage:**
```vue
<b-form v-on:submit.prevent="handleSubmit">
  <b-row>
    <b-col v-bind:cols="6">
      <b-form-group v-bind:label="'First Name'">
        <b-form-input v-model="firstName"></b-form-input>
      </b-form-group>
    </b-col>
    <b-col v-bind:cols="6">
      <b-form-group v-bind:label="'Last Name'">
        <b-form-input v-model="lastName"></b-form-input>
      </b-form-group>
    </b-col>
  </b-row>
  
  <b-button v-bind:type="'submit'" v-bind:variant="'primary'">
    Submit
  </b-button>
</b-form>
```

**Result:**
- Two columns side by side (50% each)
- Stacks vertically on mobile screens
- Submit button below

---

## 6. Tables

### b-table
Creates a responsive data table.

**Usage:**
```vue
<b-table
  v-bind:items="users"
  v-bind:fields="tableFields"
  v-bind:striped="true"
  v-bind:hover="true"
  v-bind:bordered="true"
></b-table>

<!-- In component data: -->
data: function() {
  return {
    tableFields: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role' }
    ],
    users: [
      { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
    ]
  }
}
```

**DOM Output:**
```html
<table class="table table-striped table-hover table-bordered">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>Jane Smith</td>
      <td>jane@example.com</td>
      <td>User</td>
    </tr>
  </tbody>
</table>
```

**Props:**
- `items`: Array of data objects
- `fields`: Array defining columns
- `striped`: Alternating row colors
- `hover`: Highlight row on hover
- `bordered`: Add borders
- `small`: Compact table

---

### Table Field Configuration

**Field Object Properties:**
```javascript
{
  key: 'email',          // Property name in data
  label: 'Email Address', // Column header text
  sortable: true,        // Enable sorting
  class: 'text-center',  // CSS class for column
  formatter: function(value) {  // Custom formatting
    return value.toLowerCase();
  }
}
```

---

### Custom Cell Rendering with Slots

**Usage:**
```vue
<b-table v-bind:items="users" v-bind:fields="fields">
  <!-- Custom rendering for 'status' column -->
  <template v-slot:cell(status)="data">
    <b-badge v-bind:variant="data.value === 'Active' ? 'success' : 'secondary'">
      {{ data.value }}
    </b-badge>
  </template>
  
  <!-- Custom rendering for 'actions' column -->
  <template v-slot:cell(actions)="row">
    <b-button 
      v-bind:size="'sm'" 
      v-on:click="editUser(row.item)"
    >
      Edit
    </b-button>
  </template>
</b-table>
```

**Slot Properties:**
- `data.value`: The cell value
- `data.item`: The entire row object
- `data.index`: Row index

---

### Empty State Handling

**Usage:**
```vue
<b-table v-bind:items="users" v-bind:fields="fields">
  <template v-slot:empty>
    <div class="text-center text-muted">
      <p>No users found</p>
      <b-button v-bind:variant="'primary'">Add First User</b-button>
    </div>
  </template>
</b-table>
```

**What it does:**
- Shown when `items` array is empty
- Replaces the entire table body
- Good for showing helpful messages or actions

---

## 7. Modals

### b-modal
Creates a popup dialog overlay.

**Basic Usage:**
```vue
<b-modal 
  v-model="showModal"
  v-bind:title="'Confirm Action'"
>
  <p>Are you sure you want to proceed?</p>
</b-modal>

<!-- In component data: -->
data: function() {
  return {
    showModal: false
  }
}

<!-- To show modal: -->
this.showModal = true;
```

**DOM Output (when open):**
```html
<div class="modal fade show" style="display: block;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Confirm Action</h5>
        <button type="button" class="close">×</button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to proceed?</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary">Cancel</button>
        <button class="btn btn-primary">OK</button>
      </div>
    </div>
  </div>
</div>
<div class="modal-backdrop fade show"></div>
```

**What happens:**
- Dark backdrop overlay behind modal
- Modal centered on screen
- Body scroll disabled
- ESC key closes modal
- Click outside closes modal

---

### Modal Props

```vue
<b-modal
  v-model="showModal"
  v-bind:title="'Modal Title'"
  v-bind:size="'lg'"
  v-bind:centered="true"
  v-bind:hide-footer="true"
  v-bind:no-close-on-backdrop="true"
>
  Content here
</b-modal>
```

**Props:**
- `title`: Header text
- `size`: sm, md (default), lg, xl
- `centered`: Vertically center modal
- `hide-header`: Remove header
- `hide-footer`: Remove footer
- `no-close-on-backdrop`: Prevent closing when clicking outside
- `no-close-on-esc`: Prevent closing with ESC key

---

### Opening Modal with $bvModal

**Method 1: v-model (Recommended)**
```vue
<b-button v-on:click="showModal = true">Open</b-button>
<b-modal v-model="showModal">Content</b-modal>
```

**Method 2: $bvModal.show()**
```vue
<b-button v-on:click="openModal">Open</b-button>
<b-modal v-bind:id="'my-modal'">Content</b-modal>

methods: {
  openModal: function() {
    this.$bvModal.show('my-modal');
  }
}
```

**Method 3: $bvModal.hide()**
```vue
methods: {
  closeModal: function() {
    this.$bvModal.hide('my-modal');
  }
}
```

---

### Custom Modal Footer

**Usage:**
```vue
<b-modal 
  v-model="showModal"
  v-bind:hide-footer="true"
>
  <p>Modal content</p>
  
  <!-- Custom footer buttons -->
  <div class="d-flex justify-content-end">
    <b-button 
      v-bind:variant="'secondary'"
      v-on:click="showModal = false"
      class="mr-2"
    >
      Cancel
    </b-button>
    <b-button 
      v-bind:variant="'primary'"
      v-on:click="handleConfirm"
    >
      Confirm
    </b-button>
  </div>
</b-modal>
```

---

### Modal Events

**Usage:**
```vue
<b-modal
  v-model="showModal"
  v-on:show="handleModalShow"
  v-on:shown="handleModalShown"
  v-on:hide="handleModalHide"
  v-on:hidden="handleModalHidden"
  v-on:ok="handleOk"
  v-on:cancel="handleCancel"
>
  Content
</b-modal>

methods: {
  handleModalShow: function(event) {
    // Before modal opens
    console.log('Modal is about to show');
  },
  handleModalShown: function(event) {
    // After modal opens (animation complete)
    console.log('Modal is fully shown');
  },
  handleModalHide: function(event) {
    // Before modal closes
    // Can prevent closing: event.preventDefault()
    console.log('Modal is about to hide');
  },
  handleModalHidden: function(event) {
    // After modal closes
    console.log('Modal is fully hidden');
  }
}
```

---

## 8. Reusable UI Components

### Why Create Reusable Components?

**Benefits:**
1. **Code Reusability** - Write once, use many times
2. **Consistency** - Same look and behavior everywhere
3. **Maintainability** - Update in one place, affects all instances
4. **Testability** - Easier to test isolated components

---

### Component Communication

#### Props (Parent → Child)
Props pass data DOWN from parent to child component.

**Child Component (StatsCard.vue):**
```vue
<script>
export default {
  name: 'StatsCard',
  props: {
    titleProp: {
      type: String,
      required: true
    },
    valueProp: {
      type: Number,
      required: true
    }
  }
}
</script>
```

**Parent Component:**
```vue
<template>
  <StatsCard
    v-bind:title-prop="'Total Users'"
    v-bind:value-prop="1245"
  ></StatsCard>
</template>
```

**Data Flow:**
```
Parent Component
    ↓ (props)
    titleProp: "Total Users"
    valueProp: 1245
    ↓
Child Component (StatsCard)
```

---

#### Events (Child → Parent)
Events pass information UP from child to parent.

**Child Component (BaseButton.vue):**
```vue
<template>
  <button v-on:click="handleClick">{{ text }}</button>
</template>

<script>
export default {
  name: 'BaseButton',
  methods: {
    handleClick: function() {
      // Emit custom event to parent
      this.$emit('button-clicked', { timestamp: new Date() });
    }
  }
}
</script>
```

**Parent Component:**
```vue
<template>
  <BaseButton
    v-on:button-clicked="handleButtonClicked"
  ></BaseButton>
</template>

<script>
export default {
  methods: {
    handleButtonClicked: function(eventData) {
      console.log('Button clicked at:', eventData.timestamp);
    }
  }
}
</script>
```

**Event Flow:**
```
Child Component (BaseButton)
    ↑ (emit event)
    Event: 'button-clicked'
    Data: { timestamp: Date }
    ↑
Parent Component
    (catches event with v-on:button-clicked)
```

---

### Prop Types and Validation

```vue
<script>
export default {
  props: {
    // String, required
    title: {
      type: String,
      required: true
    },
    
    // Number with default
    count: {
      type: Number,
      required: false,
      default: 0
    },
    
    // Multiple types
    value: {
      type: [String, Number],
      required: true
    },
    
    // Object with default (use function)
    config: {
      type: Object,
      default: function() {
        return { enabled: false };
      }
    },
    
    // Array with default
    items: {
      type: Array,
      default: function() {
        return [];
      }
    },
    
    // Boolean
    isActive: {
      type: Boolean,
      default: false
    },
    
    // Custom validator
    status: {
      type: String,
      validator: function(value) {
        return ['Active', 'Inactive', 'Pending'].includes(value);
      }
    }
  }
}
</script>
```

---

### Slots (Content Distribution)

Slots allow parent to pass HTML content into child component.

**Child Component (Card.vue):**
```vue
<template>
  <div class="card">
    <div class="card-header">
      <!-- Named slot for header -->
      <slot name="header">Default Header</slot>
    </div>
    <div class="card-body">
      <!-- Default slot for main content -->
      <slot>Default content</slot>
    </div>
    <div class="card-footer">
      <!-- Named slot for footer -->
      <slot name="footer">Default Footer</slot>
    </div>
  </div>
</template>
```

**Parent Component:**
```vue
<template>
  <Card>
    <!-- Content for default slot -->
    <p>This is the main content</p>
    
    <!-- Content for named slots -->
    <template v-slot:header>
      <h4>Custom Header</h4>
    </template>
    
    <template v-slot:footer>
      <small>Custom Footer</small>
    </template>
  </Card>
</template>
```

**Result:**
```html
<div class="card">
  <div class="card-header">
    <h4>Custom Header</h4>
  </div>
  <div class="card-body">
    <p>This is the main content</p>
  </div>
  <div class="card-footer">
    <small>Custom Footer</small>
  </div>
</div>
```

---

### Scoped Slots

Scoped slots allow child component to pass data back to parent for rendering.

**Child Component (List.vue):**
```vue
<template>
  <ul>
    <li v-for="item in items" v-bind:key="item.id">
      <!-- Pass item data to parent via slot -->
      <slot v-bind:item="item" v-bind:index="index">
        {{ item.name }}
      </slot>
    </li>
  </ul>
</template>
```

**Parent Component:**
```vue
<template>
  <List v-bind:items="users">
    <!-- Access slot data via slotProps -->
    <template v-slot:default="slotProps">
      <strong>{{ slotProps.item.name }}</strong>
      (Index: {{ slotProps.index }})
    </template>
  </List>
</template>
```

---

### Component Best Practices

1. **Single Responsibility**
   - Each component should do one thing well
   - StatsCard displays a stat - nothing else

2. **Clear Naming**
   - Use descriptive prop names: `titleProp` not just `t`
   - Use descriptive event names: `user-added` not `update`

3. **Prop Validation**
   - Always define prop types
   - Mark required props
   - Provide defaults when sensible

4. **Documentation**
   - Comment complex prop flows
   - Explain what events are emitted and when

5. **Avoid Prop Mutation**
   - Never modify props directly in child
   - Emit event to parent to update data
   - Use computed properties for derived values

6. **Scoped Styles**
   - Use `<style scoped>` to prevent CSS leakage
   - Component styles won't affect other components

---

### Complete Example: Reusable Button

**BaseButton.vue:**
```vue
<template>
  <b-button
    v-bind:variant="variantProp"
    v-bind:size="sizeProp"
    v-bind:disabled="disabledProp"
    v-on:click="handleClick"
  >
    <slot>{{ textProp }}</slot>
  </b-button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    textProp: {
      type: String,
      default: 'Click Me'
    },
    variantProp: {
      type: String,
      default: 'primary'
    },
    sizeProp: {
      type: String,
      default: 'md'
    },
    disabledProp: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick: function(event) {
      this.$emit('button-clicked', {
        text: this.textProp,
        timestamp: new Date()
      });
    }
  }
}
</script>
```

**Usage:**
```vue
<template>
  <div>
    <!-- Basic usage -->
    <BaseButton
      v-bind:text-prop="'Save'"
      v-on:button-clicked="handleSave"
    ></BaseButton>
    
    <!-- With custom styling -->
    <BaseButton
      v-bind:text-prop="'Delete'"
      v-bind:variant-prop="'danger'"
      v-bind:size-prop="'sm'"
      v-on:button-clicked="handleDelete"
    ></BaseButton>
    
    <!-- With slot content -->
    <BaseButton v-on:button-clicked="handleClick">
      <i class="fas fa-plus"></i> Add Item
    </BaseButton>
  </div>
</template>
```

---

## Summary

### BootstrapVue Component Pattern

1. **Import CSS in main.js**
2. **Register BootstrapVue plugin**
3. **Use components in templates**
4. **Components render as Bootstrap HTML**
5. **Bootstrap CSS styles the elements**

### Data Flow

```
Parent Component State
    ↓ (props)
Child Component
    ↓ (render)
DOM Elements with Bootstrap Classes
    ↓ (user interaction)
Events
    ↑ (emit)
Parent Component (update state)
```

### Key Concepts

- **Props**: Parent → Child data flow
- **Events**: Child → Parent communication  
- **Slots**: Parent → Child content distribution
- **v-model**: Two-way data binding
- **v-bind**: One-way data binding (shorthand: `:`)
- **v-on**: Event listening (shorthand: `@`)
