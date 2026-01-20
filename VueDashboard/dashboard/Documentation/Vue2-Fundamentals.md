# Vue 2 Fundamentals

## Table of Contents
1. [Vue Instance](#vue-instance)
2. [Data Binding](#data-binding)
3. [Directives](#directives)
4. [Component Basics](#component-basics)
5. [Lifecycle Hooks](#lifecycle-hooks)

---

## Vue Instance

### Creating a Vue Instance

**main.js:**
```javascript
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount('#app');
```

**What happens:**
1. Creates a new Vue instance
2. `render` function tells Vue what component to display
3. `$mount('#app')` attaches Vue to `<div id="app">` in HTML
4. Vue takes control of that div and everything inside it

**DOM Before:**
```html
<div id="app"></div>
```

**DOM After:**
```html
<div id="app">
  <!-- App.vue template content rendered here -->
</div>
```

---

## Data Binding

### v-model (Two-Way Binding)

**Template:**
```vue
<template>
  <div>
    <input v-model="userName" type="text">
    <p>Hello, {{ userName }}!</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      userName: 'John'
    };
  }
}
</script>
```

**What happens:**
1. Input displays "John" initially
2. User types "Jane" → `userName` becomes "Jane"
3. Paragraph automatically updates to "Hello, Jane!"

**DOM Flow:**
```
User types in input
    ↓
v-model updates userName data
    ↓
{{ userName }} in template re-renders
    ↓
DOM updates automatically
```

---

### v-bind (One-Way Binding)

**Without Shorthand:**
```vue
<img v-bind:src="imageUrl" v-bind:alt="imageDescription">
<button v-bind:disabled="isLoading">Submit</button>
<div v-bind:class="containerClass"></div>
```

**With Shorthand (NOT USED IN THIS PROJECT):**
```vue
<!-- We avoid this shorthand -->
<img :src="imageUrl" :alt="imageDescription">
```

**What it does:**
- Binds JavaScript expression to HTML attribute
- Updates when data changes
- One-way: data → DOM (not DOM → data)

**Example:**
```vue
<template>
  <button v-bind:disabled="isSubmitting">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  data: function() {
    return {
      isSubmitting: false,
      buttonText: 'Submit'
    };
  },
  methods: {
    handleSubmit: function() {
      this.isSubmitting = true;  // Button becomes disabled
      this.buttonText = 'Submitting...';  // Text updates
    }
  }
}
</script>
```

**DOM Before:**
```html
<button>Submit</button>
```

**DOM After (when isSubmitting = true):**
```html
<button disabled>Submitting...</button>
```

---

### Mustache Syntax {{ }}

**Template:**
```vue
<template>
  <div>
    <p>{{ message }}</p>
    <p>{{ 2 + 2 }}</p>
    <p>{{ user.name.toUpperCase() }}</p>
    <p>{{ isActive ? 'Yes' : 'No' }}</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      message: 'Hello Vue!',
      user: { name: 'John' },
      isActive: true
    };
  }
}
</script>
```

**DOM Output:**
```html
<div>
  <p>Hello Vue!</p>
  <p>4</p>
  <p>JOHN</p>
  <p>Yes</p>
</div>
```

---

## Directives

### v-if, v-else-if, v-else

**Template:**
```vue
<template>
  <div>
    <p v-if="score >= 90">Grade: A</p>
    <p v-else-if="score >= 80">Grade: B</p>
    <p v-else-if="score >= 70">Grade: C</p>
    <p v-else>Grade: F</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      score: 85
    };
  }
}
</script>
```

**DOM Output:**
```html
<div>
  <p>Grade: B</p>
</div>
```

**What happens:**
- Only ONE element is rendered
- Other elements are completely removed from DOM (not just hidden)
- If score changes, Vue adds/removes elements as needed

---

### v-show

**Template:**
```vue
<template>
  <div>
    <p v-show="isVisible">This can be toggled</p>
    <button v-on:click="isVisible = !isVisible">Toggle</button>
  </div>
</template>
```

**When isVisible = true:**
```html
<p>This can be toggled</p>
```

**When isVisible = false:**
```html
<p style="display: none;">This can be toggled</p>
```

**v-if vs v-show:**
- `v-if`: Removes/adds element to DOM (higher toggle cost)
- `v-show`: Always in DOM, toggles CSS display (higher initial cost)
- Use `v-if` for rarely changing conditions
- Use `v-show` for frequent toggling

---

### v-for

**Template:**
```vue
<template>
  <ul>
    <li v-for="user in users" v-bind:key="user.id">
      {{ user.name }} - {{ user.email }}
    </li>
  </ul>
</template>

<script>
export default {
  data: function() {
    return {
      users: [
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' },
        { id: 3, name: 'Bob', email: 'bob@example.com' }
      ]
    };
  }
}
</script>
```

**DOM Output:**
```html
<ul>
  <li>John - john@example.com</li>
  <li>Jane - jane@example.com</li>
  <li>Bob - bob@example.com</li>
</ul>
```

**Why v-bind:key is important:**
- Helps Vue track which items changed
- Improves performance when list updates
- Should be unique identifier (id, not index)

**With index:**
```vue
<li v-for="(user, index) in users" v-bind:key="user.id">
  {{ index + 1 }}. {{ user.name }}
</li>
```

**Output:**
```html
<li>1. John</li>
<li>2. Jane</li>
<li>3. Bob</li>
```

---

### v-on (Event Handling)

**Without Shorthand:**
```vue
<button v-on:click="handleClick">Click Me</button>
<input v-on:input="handleInput" v-on:blur="handleBlur">
<form v-on:submit.prevent="handleSubmit">
```

**With Shorthand (NOT USED IN THIS PROJECT):**
```vue
<!-- We avoid this shorthand -->
<button @click="handleClick">Click Me</button>
```

**Event Modifiers:**
```vue
<!-- Prevent default browser behavior -->
<form v-on:submit.prevent="handleSubmit">

<!-- Stop event propagation -->
<div v-on:click.stop="handleClick">

<!-- Only trigger on Enter key -->
<input v-on:keyup.enter="handleSearch">

<!-- Chain modifiers -->
<button v-on:click.stop.prevent="handleClick">
```

**Passing Parameters:**
```vue
<template>
  <button v-on:click="greet('Hello')">Greet</button>
  <button v-on:click="deleteUser(user.id)">Delete</button>
</template>

<script>
export default {
  methods: {
    greet: function(message) {
      alert(message);
    },
    deleteUser: function(userId) {
      console.log('Deleting user:', userId);
    }
  }
}
</script>
```

**Accessing Event Object:**
```vue
<template>
  <!-- Implicit event passing -->
  <button v-on:click="handleClick">Click</button>
  
  <!-- Explicit event passing -->
  <button v-on:click="handleClickWithParam($event, 'extra data')">
    Click
  </button>
</template>

<script>
export default {
  methods: {
    handleClick: function(event) {
      console.log('Clicked element:', event.target);
    },
    handleClickWithParam: function(event, data) {
      console.log('Event:', event);
      console.log('Data:', data);
    }
  }
}
</script>
```

---

## Component Basics

### Component Structure

**MyComponent.vue:**
```vue
<!-- TEMPLATE: HTML structure -->
<template>
  <div class="my-component">
    <h1>{{ title }}</h1>
    <button v-on:click="handleClick">Click Me</button>
  </div>
</template>

<!-- SCRIPT: JavaScript logic -->
<script>
export default {
  name: 'MyComponent',
  
  // Component data (must be a function)
  data: function() {
    return {
      title: 'Hello World'
    };
  },
  
  // Component methods
  methods: {
    handleClick: function() {
      alert('Button clicked!');
    }
  }
}
</script>

<!-- STYLE: CSS styling -->
<style scoped>
.my-component {
  padding: 20px;
  background: #f0f0f0;
}
</style>
```

---

### Component Registration

**Global Registration (in main.js):**
```javascript
import Vue from 'vue';
import MyComponent from './components/MyComponent.vue';

// Register globally - available everywhere
Vue.component('MyComponent', MyComponent);
```

**Local Registration (in component):**
```vue
<template>
  <div>
    <MyComponent></MyComponent>
  </div>
</template>

<script>
import MyComponent from './MyComponent.vue';

export default {
  // Register locally - only available in this component
  components: {
    MyComponent
  }
}
</script>
```

---

### Data Must Be a Function

**WRONG:**
```javascript
export default {
  data: {
    count: 0  // DON'T DO THIS
  }
}
```

**CORRECT:**
```javascript
export default {
  data: function() {
    return {
      count: 0
    };
  }
}
```

**Why?**
- Each component instance needs its own data
- Function returns new object for each instance
- Object reference would be shared between instances

---

## Lifecycle Hooks

### Component Lifecycle

```
Creation Phase:
  beforeCreate  → Instance initialized, data not yet set up
  created       → Data reactive, methods available

Mounting Phase:
  beforeMount   → Template compiled, not yet in DOM
  mounted       → Component inserted into DOM

Update Phase:
  beforeUpdate  → Data changed, DOM not yet updated
  updated       → DOM re-rendered with new data

Destruction Phase:
  beforeDestroy → Before component removed
  destroyed     → Component removed, cleanup done
```

---

### Lifecycle Hook Examples

**created:**
```vue
<script>
export default {
  data: function() {
    return {
      users: []
    };
  },
  created: function() {
    // Component created, can access data
    console.log('Component created');
    
    // Good place to fetch data
    this.fetchUsers();
  },
  methods: {
    fetchUsers: function() {
      // Fetch data from API
      this.users = [{ id: 1, name: 'John' }];
    }
  }
}
</script>
```

**mounted:**
```vue
<script>
export default {
  mounted: function() {
    // Component in DOM, can access $el
    console.log('Component mounted');
    console.log('DOM element:', this.$el);
    
    // Good place to:
    // - Set up third-party libraries
    // - Add event listeners
    // - Focus inputs
    this.$el.querySelector('input').focus();
  }
}
</script>
```

**beforeDestroy:**
```vue
<script>
export default {
  data: function() {
    return {
      timer: null
    };
  },
  mounted: function() {
    // Start timer
    this.timer = setInterval(function() {
      console.log('Tick');
    }, 1000);
  },
  beforeDestroy: function() {
    // Clean up timer before component removed
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>
```

---

### Lifecycle Diagram

```
new Vue()
    ↓
beforeCreate
    ↓
Initialize: data, methods, computed
    ↓
created ← Good for: API calls, setting up data
    ↓
Compile template
    ↓
beforeMount
    ↓
Create DOM elements
    ↓
mounted ← Good for: DOM manipulation, third-party libraries
    ↓
[Component Active]
    ↓
Data changes
    ↓
beforeUpdate
    ↓
Re-render DOM
    ↓
updated
    ↓
[Component Active]
    ↓
Component removed
    ↓
beforeDestroy ← Good for: cleanup, removing listeners
    ↓
destroyed
```

---

## Computed Properties vs Methods

### Computed Properties

```vue
<template>
  <div>
    <p>{{ fullName }}</p>
    <p>{{ fullName }}</p>  <!-- Cached, not re-calculated -->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    };
  },
  computed: {
    fullName: function() {
      console.log('Computing fullName');
      return this.firstName + ' ' + this.lastName;
    }
  }
}
</script>
```

**Console output:**
```
Computing fullName
```
(Only once, even though used twice)

---

### Methods

```vue
<template>
  <div>
    <p>{{ getFullName() }}</p>
    <p>{{ getFullName() }}</p>  <!-- Recalculated every time -->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    };
  },
  methods: {
    getFullName: function() {
      console.log('Getting fullName');
      return this.firstName + ' ' + this.lastName;
    }
  }
}
</script>
```

**Console output:**
```
Getting fullName
Getting fullName
```
(Twice, once for each call)

---

### When to Use Each

**Use Computed:**
- Deriving value from existing data
- Need caching (expensive operations)
- Pure function (same input → same output)

**Use Methods:**
- Performing actions (not just returning values)
- Need to pass parameters
- Don't want caching

---

## Watchers

Watch for changes in data and react.

```vue
<script>
export default {
  data: function() {
    return {
      question: '',
      answer: 'Ask a question!'
    };
  },
  watch: {
    // Watch 'question' data property
    question: function(newValue, oldValue) {
      console.log('Question changed from', oldValue, 'to', newValue);
      this.answer = 'Waiting for you to stop typing...';
      this.debouncedGetAnswer();
    }
  },
  methods: {
    debouncedGetAnswer: function() {
      // Fetch answer after user stops typing
      setTimeout(function() {
        this.answer = 'The answer is 42';
      }.bind(this), 500);
    }
  }
}
</script>
```

**When to use watchers:**
- Asynchronous operations
- Expensive operations
- Responding to data changes with side effects
- Not for simple derived values (use computed instead)

---

## Summary

### Vue Core Concepts

1. **Reactive Data**: Change data → DOM updates automatically
2. **Directives**: Special HTML attributes (v-if, v-for, v-model, etc.)
3. **Components**: Reusable, self-contained pieces of UI
4. **Props**: Pass data from parent to child
5. **Events**: Pass information from child to parent
6. **Lifecycle**: Hook into component creation/update/destruction

### Data Flow

```
User Interaction (click, type, etc.)
    ↓
Event Handler (v-on)
    ↓
Update Data (this.someValue = newValue)
    ↓
Vue's Reactivity System
    ↓
Update Virtual DOM
    ↓
Efficiently Update Real DOM
```
