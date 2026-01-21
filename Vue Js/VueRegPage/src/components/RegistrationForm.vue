<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow mt-4">
          <div class="card-header bg-primary text-white text-center">
            <h3>User Registration</h3>
          </div>
          <div class="card-body">


            <!-- Success Message Div -->
            <div v-if="successMessage" class="alert alert-success">
              {{ successMessage }}
            </div>
            
          
          
            <form @submit.prevent="submitForm">
            <!-- basically overriding normal Submit to use Vue's submitForm method -->

              <!-- Username Field -->
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  :class="{ 'is-invalid': $v.form.username.$error }"
                  v-model="form.username"
                  @blur="$v.form.username.$touch()"
                  placeholder="Enter username"
                />
                <div class="invalid-feedback" v-if="$v.form.username.$error">
                  <span v-if="!$v.form.username.required">Username is required</span>
                  <span v-else-if="!$v.form.username.minLength">Username must be at least 4 characters</span>
                  <span v-else-if="!$v.form.username.alphaNum">Username can only contain letters and numbers</span>
                </div>
              </div>

              <!-- Email Field -->
              <!-- prop: :class, v-model | event: @blur -->
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  :class="{ 'is-invalid': $v.form.email.$error }"
                  v-model="form.email"
                  @blur="$v.form.email.$touch()"
                  placeholder="Enter email"
                />
                <div class="invalid-feedback" v-if="$v.form.email.$error">
                  <span v-if="!$v.form.email.required">Email is required</span>
                  <span v-else-if="!$v.form.email.email">Please enter a valid email</span>
                </div>
              </div>

              <!-- Password Field -->
              <!-- prop: :class, v-model | event: @blur -->
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  :class="{ 'is-invalid': $v.form.password.$error }"
                  v-model="form.password"
                  @blur="$v.form.password.$touch()"
                  placeholder="Enter password"
                />
                <div class="invalid-feedback" v-if="$v.form.password.$error">
                  <span v-if="!$v.form.password.required">Password is required</span>
                  <span v-else-if="!$v.form.password.minLength">Password must be at least 8 characters</span>
                  <span v-else-if="!$v.form.password.strongPassword">
                    Password must contain uppercase, lowercase, number, and special character
                  </span>
                </div>
              </div>

              <!-- Confirm Password Field -->
              <!-- prop: :class, v-model | event: @blur -->
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  class="form-control"
                  :class="{ 'is-invalid': $v.form.confirmPassword.$error }"
                  v-model="form.confirmPassword"
                  @blur="$v.form.confirmPassword.$touch()"
                  placeholder="Confirm password"
                />
                <div class="invalid-feedback" v-if="$v.form.confirmPassword.$error">
                  <span v-if="!$v.form.confirmPassword.required">Confirm password is required</span>
                  <span v-else-if="!$v.form.confirmPassword.sameAsPassword">Passwords must match</span>
                </div>
              </div>

              <!-- Mobile Number Field -->
              <div class="form-group">
                <label for="mobile">Mobile Number</label>
                <input
                  type="text"
                  id="mobile"
                  class="form-control"
                  :class="{ 'is-invalid': $v.form.mobile.$error }"
                  v-model="form.mobile"
                  @blur="$v.form.mobile.$touch()"
                  placeholder="Enter 10-digit mobile number"
                />
                <div class="invalid-feedback" v-if="$v.form.mobile.$error">
                  <span v-if="!$v.form.mobile.required">Mobile number is required</span>
                  <span v-else-if="!$v.form.mobile.numeric">Mobile number must contain only digits</span>
                  <span v-else-if="!$v.form.mobile.exactLength">Mobile number must be exactly 10 digits</span>
                </div>
              </div>

              <!-- Terms & Conditions Checkbox -->
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  id="terms"
                  class="form-check-input"
                  :class="{ 'is-invalid': $v.form.terms.$error }"
                  v-model="form.terms"
                  @change="$v.form.terms.$touch()"
                />
                <label class="form-check-label" for="terms">
                  I accept the Terms & Conditions
                </label>
                <div class="invalid-feedback" v-if="$v.form.terms.$error">
                  <span v-if="!$v.form.terms.checked">You must accept the terms and conditions</span>
                </div>
              </div>

              <!-- Submit Button -->
              <!-- prop: :disabled -->
              <button
                type="submit"
                class="btn btn-primary btn-block mt-4"
                :disabled="$v.$invalid"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs, numeric } from 'vuelidate/lib/validators'

// Custom validator: Only alphabets and numbers
const alphaNum = (value) => {
  if (!value) return true
  return /^[a-zA-Z0-9]+$/.test(value)
}

// Custom validator: Strong password (uppercase, lowercase, number, special char)
const strongPassword = (value) => {
  if (!value) return true
  const hasUppercase = /[A-Z]/.test(value)
  const hasLowercase = /[a-z]/.test(value)
  const hasNumber = /[0-9]/.test(value)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value)
  return hasUppercase && hasLowercase && hasNumber && hasSpecial
}

// Custom validator: Exact length
const exactLength = (length) => (value) => {
  if (!value) return true
  return value.length === length
}

// Custom validator: Terms must be checked
const checked = (value) => value === true

export default {
  name: 'RegistrationForm',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        terms: false
      },
      successMessage: ''
    }
  },
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
      password: {
        required,
        minLength: minLength(8),
        strongPassword
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      },
      mobile: {
        required,
        numeric,
        exactLength: exactLength(10)
      },
      terms: {
        checked
      }
    }
  },
  methods: {
    submitForm() {
      // Touch all fields to trigger validation
      this.$v.$touch()

      // Check if form is valid
      if (!this.$v.$invalid) {
        // Log submitted data to console
        console.log('Form Submitted Successfully!')
        console.log('Submitted Data:', {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          mobile: this.form.mobile,
          terms: this.form.terms
        })

        // Show success message
        this.successMessage = 'Registration successful! Welcome, ' + this.form.username + '!'

        // Reset form data
        this.form = {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          mobile: '',
          terms: false
        }

        // Reset validations
        this.$v.$reset()

        setTimeout(() => {
          this.successMessage = ''
        }, 3000)
      }
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.card-header {
  border-radius: 10px 10px 0 0 !important;
}

.form-group {
  margin-bottom: 1rem;
}

.invalid-feedback {
  display: block;
}

.btn-block {
  width: 100%;
}

.form-check-input.is-invalid ~ .form-check-label {
  color: #dc3545;
}
</style>
