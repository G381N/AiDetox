# Vue 2 Registration Form with Vuelidate

A comprehensive guide to form validation using Vuelidate in Vue 2, demonstrated through a real-world user registration form.

---

## Table of Contents
1. [Vuelidate Basics](#1️⃣-vuelidate-basics)
2. [Built-in Validators](#2️⃣-built-in-validators)
3. [Custom Validators](#3️⃣-custom-validators)
4. [Form Error Handling & UX](#4️⃣-form-error-handling--ux)
5. [Validation for Real-World Forms](#5️⃣-validation-for-real-world-forms)

---

## 1️⃣ Vuelidate Basics

### What is Vuelidate and Why Use It?

**Vuelidate** is a lightweight, model-based validation library for Vue.js applications. Unlike template-based validation libraries, Vuelidate works directly with your component's data model.

**Why use Vuelidate?**
- ✅ **Decoupled from templates** - Validation logic stays in JavaScript
- ✅ **Lightweight** - Small bundle size (~3KB gzipped)
- ✅ **Flexible** - Easy to create custom validators
- ✅ **Reactive** - Automatically updates validation state
- ✅ **No dependencies** - Works standalone with Vue

### Installing & Configuring Vuelidate in Vue 2

**Installation:**
```bash
npm install vuelidate
```

**Configuration in `main.js`:**
```javascript
import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

// Register Vuelidate globally
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```

> **Why globally?** Registering Vuelidate globally with `Vue.use(Vuelidate)` makes the `$v` object available in all components without importing it repeatedly.

---

### The `$v` Object Structure

The `$v` object is the heart of Vuelidate. It mirrors your `validations` object and provides validation state for each field.

**In our project's `RegistrationForm.vue`:**

```javascript
validations: {
  form: {
    username: {
      required,
      minLength: minLength(4),
      alphaNum
    },
    email: {
      required,
      email
    },
    // ... more fields
  }
}
```

**Accessing `$v` in template:**
```html
<!-- Access validation state for username -->
$v.form.username.$error    <!-- true if field has errors -->
$v.form.username.required  <!-- true if passes required check -->
$v.form.username.$dirty    <!-- true if field was touched -->
```

**`$v` Object Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `$invalid` | Boolean | `true` if any validation fails |
| `$dirty` | Boolean | `true` if field was interacted with |
| `$error` | Boolean | `true` if `$invalid && $dirty` |
| `$pending` | Boolean | `true` if async validation is running |
| `$model` | Any | The value being validated |
| `$params` | Object | Parameters passed to validators |

---

### Validation Lifecycle

```
User Types → v-model updates → Validators run → $v updates → Template reacts
```

1. **Initial State**: All fields are `$dirty: false`, no errors shown
2. **User Interaction**: Field gets touched (`$dirty: true`)
3. **Validation Runs**: Validators check the value
4. **State Updates**: `$invalid`, `$error` update reactively
5. **UI Reflects**: Error messages appear based on `$error`

---

### `$dirty`, `$error`, `$invalid`

These are the three most important properties to understand:

| Property | Formula | Use Case |
|----------|---------|----------|
| `$dirty` | `touched === true` | Check if user interacted |
| `$invalid` | `any validator fails` | Check if value is invalid |
| `$error` | `$dirty && $invalid` | Show error messages |

**Example from our project:**
```html
<!-- Show error only when $error is true (touched + invalid) -->
<div class="invalid-feedback" v-if="$v.form.username.$error">
  <span v-if="!$v.form.username.required">Username is required</span>
</div>
```

> **Why use `$error` instead of `$invalid`?** Using `$error` ensures errors only show after the user has interacted with the field, providing better UX.

---

### `this.$v.$touch()` and `this.$v.$reset()`

#### `$touch()`
Marks fields as dirty, triggering error display.

**Used in our project for:**

1. **On blur (field level):**
```html
<input
  v-model="form.username"
  @blur="$v.form.username.$touch()"
/>
```

2. **On submit (form level):**
```javascript
submitForm() {
  // Touch all fields to show all errors
  this.$v.$touch()
  
  if (!this.$v.$invalid) {
    // Form is valid, proceed
  }
}
```

> **Why touch on blur?** This ensures validation errors appear only after the user leaves the field, not while typing.

> **Why touch on submit?** If user clicks submit without touching fields, `$touch()` forces all errors to display.

---

#### `$reset()`
Resets validation state (makes all fields `$dirty: false`).

**Used in our project after successful submission:**
```javascript
submitForm() {
  this.$v.$touch()
  
  if (!this.$v.$invalid) {
    // Show success message
    this.successMessage = 'Registration successful!'
    
    // Reset form data
    this.form = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      terms: false
    }
    
    // Reset validations - removes error states
    this.$v.$reset()
  }
}
```

> **Why reset after success?** Without `$reset()`, the empty fields would show "required" errors immediately after clearing.

---

## 2️⃣ Built-in Validators

Vuelidate provides several built-in validators. Import them from `vuelidate/lib/validators`.

```javascript
import { required, email, minLength, sameAs, numeric } from 'vuelidate/lib/validators'
```

### `required`

Checks that the field is not empty.

**Our usage:**
```javascript
validations: {
  form: {
    username: {
      required  // Username cannot be empty
    },
    email: {
      required  // Email cannot be empty
    },
    // Applied to all fields
  }
}
```

**Template:**
```html
<span v-if="!$v.form.username.required">Username is required</span>
```

---

### `minLength` and `maxLength`

Validates string length.

**Syntax:**
```javascript
import { minLength, maxLength } from 'vuelidate/lib/validators'

validations: {
  field: {
    minLength: minLength(4),  // At least 4 characters
    maxLength: maxLength(20)  // At most 20 characters
  }
}
```

**Our usage:**
```javascript
username: {
  required,
  minLength: minLength(4)  // Username must be at least 4 chars
},
password: {
  required,
  minLength: minLength(8)  // Password must be at least 8 chars
}
```

**Template:**
```html
<span v-else-if="!$v.form.username.minLength">
  Username must be at least 4 characters
</span>
```

> **Note:** We didn't use `maxLength` in this project, but it works the same way as `minLength`.

---

### `email`

Validates email format using regex.

**Our usage:**
```javascript
email: {
  required,
  email  // Must be valid email format
}
```

**Template:**
```html
<span v-if="!$v.form.email.required">Email is required</span>
<span v-else-if="!$v.form.email.email">Please enter a valid email</span>
```

---

### `numeric`

Checks that value contains only numbers.

**Our usage:**
```javascript
mobile: {
  required,
  numeric  // Only digits allowed
}
```

**Template:**
```html
<span v-else-if="!$v.form.mobile.numeric">
  Mobile number must contain only digits
</span>
```

---

### `sameAs`

Validates that a field matches another field's value.

**Syntax:**
```javascript
import { sameAs } from 'vuelidate/lib/validators'

confirmPassword: {
  sameAs: sameAs('password')  // Must match 'password' field
}
```

**Our usage:**
```javascript
confirmPassword: {
  required,
  sameAsPassword: sameAs('password')  // Named as sameAsPassword for clarity
}
```

**Template:**
```html
<span v-else-if="!$v.form.confirmPassword.sameAsPassword">
  Passwords must match
</span>
```

> **Why `sameAsPassword` instead of `sameAs`?** Naming it descriptively helps when accessing in templates: `$v.form.confirmPassword.sameAsPassword` is clearer than `$v.form.confirmPassword.sameAs`.

---

### Combining Multiple Validators

You can apply multiple validators to a single field. All must pass for the field to be valid.

**Our usage:**
```javascript
password: {
  required,           // Must not be empty
  minLength: minLength(8),  // At least 8 characters
  strongPassword      // Custom: uppercase, lowercase, number, special char
}
```

**Validator order in template matters:**
```html
<div class="invalid-feedback" v-if="$v.form.password.$error">
  <span v-if="!$v.form.password.required">Password is required</span>
  <span v-else-if="!$v.form.password.minLength">Password must be at least 8 characters</span>
  <span v-else-if="!$v.form.password.strongPassword">
    Password must contain uppercase, lowercase, number, and special character
  </span>
</div>
```

> **Why use `v-if` / `v-else-if`?** This shows only ONE error at a time, preventing multiple error messages from overwhelming the user.

---

## 3️⃣ Custom Validators

When built-in validators aren't enough, create custom ones!

### Creating Custom Validation Functions

A custom validator is simply a function that returns `true` (valid) or `false` (invalid).

**Basic syntax:**
```javascript
const myValidator = (value) => {
  // Return true if valid, false if invalid
  return someCondition
}
```

---

### Regex-based Validation

#### Username Validator (Alphanumeric Only)

**Our implementation:**
```javascript
// Custom validator: Only alphabets and numbers
const alphaNum = (value) => {
  if (!value) return true  // Let 'required' handle empty values
  return /^[a-zA-Z0-9]+$/.test(value)
}
```

**Usage:**
```javascript
username: {
  required,
  minLength: minLength(4),
  alphaNum  // Custom validator
}
```

**Template:**
```html
<span v-else-if="!$v.form.username.alphaNum">
  Username can only contain letters and numbers
</span>
```

> **Why `if (!value) return true`?** This pattern lets the `required` validator handle empty values. Without it, the custom validator would also fail on empty input, causing duplicate errors.

---

#### Password Validator (Strong Password)

**Our implementation:**
```javascript
// Custom validator: Strong password
const strongPassword = (value) => {
  if (!value) return true
  const hasUppercase = /[A-Z]/.test(value)
  const hasLowercase = /[a-z]/.test(value)
  const hasNumber = /[0-9]/.test(value)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value)
  return hasUppercase && hasLowercase && hasNumber && hasSpecial
}
```

**Usage:**
```javascript
password: {
  required,
  minLength: minLength(8),
  strongPassword  // Must have uppercase, lowercase, number, special char
}
```

> **Why separate checks?** Breaking down into individual regex tests makes the code readable and maintainable. You could also provide specific feedback for each missing requirement.

---

### Parameterized Custom Validators

Sometimes you need validators that accept parameters.

**Our implementation - Exact Length:**
```javascript
// Custom validator factory: Returns a validator function
const exactLength = (length) => (value) => {
  if (!value) return true
  return value.length === length
}
```

**Usage:**
```javascript
mobile: {
  required,
  numeric,
  exactLength: exactLength(10)  // Exactly 10 digits
}
```

> **Why a function returning a function?** This pattern (called a "validator factory") lets you create configurable validators. `exactLength(10)` returns a function that checks for exactly 10 characters.

---

### Conditional Validation

> **Not used in our project**, but here's how it works:

```javascript
// Only validate if another condition is true
const requiredIf = (condition) => (value) => {
  if (!condition) return true  // Skip validation if condition is false
  return !!value
}

// Usage
validations: {
  companyName: {
    requiredIf: requiredIf(this.isBusinessAccount)
  }
}
```

---

### Cross-field Validation (Password & Confirm Password)

Cross-field validation checks one field against another.

**Our implementation using `sameAs`:**
```javascript
confirmPassword: {
  required,
  sameAsPassword: sameAs('password')  // References 'password' field
}
```

**How `sameAs` works internally:**
- It receives the property name as a string
- Vuelidate looks up that property in the same validation group
- Compares the values

**Template:**
```html
<span v-else-if="!$v.form.confirmPassword.sameAsPassword">
  Passwords must match
</span>
```

---

## 4️⃣ Form Error Handling & UX

### Showing Error Messages Only After Touch

**Problem:** Showing errors immediately (before user types) is poor UX.

**Solution:** Use `$error` which is `true` only when `$dirty && $invalid`.

**Our implementation:**

1. **Trigger `$touch()` on blur:**
```html
<input
  v-model="form.username"
  @blur="$v.form.username.$touch()"
/>
```

2. **Show errors based on `$error`:**
```html
<div class="invalid-feedback" v-if="$v.form.username.$error">
  <!-- Error messages here -->
</div>
```

3. **Visual feedback with Bootstrap's `is-invalid` class:**
```html
<input
  :class="{ 'is-invalid': $v.form.username.$error }"
/>
```

---

### Field-level vs Form-level Validation

| Type | When to Use | Our Usage |
|------|-------------|-----------|
| **Field-level** | Real-time feedback as user types/leaves field | `@blur="$v.form.username.$touch()"` |
| **Form-level** | On submit, validate everything | `this.$v.$touch()` in `submitForm()` |

**Our form-level validation:**
```javascript
submitForm() {
  // Touch ALL fields at once
  this.$v.$touch()
  
  // Check entire form validity
  if (!this.$v.$invalid) {
    // All fields are valid
  }
}
```

---

### Disable Submit Button When Form is Invalid

**Our implementation:**
```html
<button
  type="submit"
  class="btn btn-primary btn-block"
  :disabled="$v.$invalid"
>
  Register
</button>
```

> **Why disable?** Prevents unnecessary form submissions and provides immediate visual feedback that the form isn't ready.

> **Alternative approach:** Keep button enabled but show all errors on click using `$touch()`.

---

### Success and Error Feedback

**Our success message implementation:**
```html
<!-- Success alert -->
<div v-if="successMessage" class="alert alert-success">
  {{ successMessage }}
</div>
```

```javascript
data() {
  return {
    successMessage: ''
  }
},
methods: {
  submitForm() {
    this.$v.$touch()
    
    if (!this.$v.$invalid) {
      // Show success message
      this.successMessage = 'Registration successful! Welcome, ' + this.form.username + '!'
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        this.successMessage = ''
      }, 3000)
    }
  }
}
```

**Error feedback is shown per field:**
```html
<div class="invalid-feedback" v-if="$v.form.email.$error">
  <span v-if="!$v.form.email.required">Email is required</span>
  <span v-else-if="!$v.form.email.email">Please enter a valid email</span>
</div>
```

> **Not used in this project:** Toast notifications. For a more polished UX, consider using a toast library like `vue-toastification`.

---

## 5️⃣ Validation for Real-World Forms

### Login Form Validation

> **Not implemented in this project**, but here's how it would look:

```javascript
// Login form would have simpler validation
validations: {
  loginForm: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  }
}
```

---

### Registration Form Validation

**This is our main implementation!**

**Complete validation schema:**
```javascript
validations: {
  form: {
    username: {
      required,
      minLength: minLength(4),
      alphaNum  // Custom: letters and numbers only
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      strongPassword  // Custom: complex password requirements
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    mobile: {
      required,
      numeric,
      exactLength: exactLength(10)  // Custom: exactly 10 digits
    },
    terms: {
      checked  // Custom: must be true
    }
  }
}
```

---

### Handling API Validation Errors (Mocked)

> **Not implemented in this project**, but here's how you would handle server-side validation errors:

```javascript
methods: {
  async submitForm() {
    this.$v.$touch()
    
    if (!this.$v.$invalid) {
      try {
        // Simulate API call
        const response = await this.registerUser(this.form)
        this.successMessage = 'Registration successful!'
      } catch (error) {
        // Handle API validation errors
        if (error.response && error.response.data.errors) {
          this.serverErrors = error.response.data.errors
          // Example: { email: 'Email already exists' }
        }
      }
    }
  }
}
```

```html
<!-- Show server errors alongside client errors -->
<div v-if="serverErrors.email" class="text-danger">
  {{ serverErrors.email }}
</div>
```

---

## Summary: What We Used vs What We Didn't

### ✅ Used in This Project

| Feature | Where Used |
|---------|------------|
| `required` | All fields |
| `minLength` | Username (4), Password (8) |
| `email` | Email field |
| `numeric` | Mobile number |
| `sameAs` | Confirm password |
| Custom `alphaNum` | Username |
| Custom `strongPassword` | Password |
| Custom `exactLength` | Mobile (10 digits) |
| Custom `checked` | Terms checkbox |
| `$v.$touch()` | On blur & submit |
| `$v.$reset()` | After successful submission |
| `$error` for conditional display | All error messages |
| Disabled submit button | When `$v.$invalid` |

### ❌ Not Used (But Available)

| Feature | Reason |
|---------|--------|
| `maxLength` | No maximum length requirements |
| `between` | No numeric range validation needed |
| `alpha` | Used custom `alphaNum` instead |
| `url` | No URL fields |
| Async validators | No server-side validation |
| `withParams` | Simple validators didn't need params metadata |
| `$pending` | No async validation |
| Toast notifications | Used simple alert instead |

---

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run serve

# Build for production
npm run build
```

---

## Project Structure

```
VueRegPage/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── RegistrationForm.vue  # Main form with all validations
│   ├── App.vue                   # Root component
│   └── main.js                   # Vuelidate configuration
├── package.json
├── vue.config.js
├── babel.config.js
├── .gitignore
└── README.md
```

---

## Quick Reference

```javascript
// Import validators
import { required, email, minLength, sameAs, numeric } from 'vuelidate/lib/validators'

// Define validations
validations: {
  fieldName: {
    required,
    validatorName: validatorFunction
  }
}

// Access in template
$v.fieldName.$error      // Show error?
$v.fieldName.$invalid    // Is invalid?
$v.fieldName.$dirty      // Was touched?
$v.fieldName.required    // Passes required?

// Methods
this.$v.$touch()         // Mark all dirty
this.$v.$reset()         // Reset all dirty states
this.$v.fieldName.$touch() // Mark single field dirty
```

---

Happy Coding! 🚀
