<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">

    <!-- Brand -->
    <b-navbar-brand :to="{ name: 'Dashboard' }">
      Hire3X
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>

        <b-nav-item :to="{ name: 'Dashboard' }">
          Dashboard
        </b-nav-item>

        <b-nav-item :to="{ name: 'UsersList' }">
          Users
        </b-nav-item>

      </b-navbar-nav>

      <!-- Right side -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="logout">
          Logout
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavbarComponent',
  methods: {
    logout() {
      // TEMP: routing only
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(90deg, #0f0f1e 0%, #1a1a3f 50%, #0f0f1e 100%) !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  border: none;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
}

.navbar-brand {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: linear-gradient(135deg, #00d4ff, #0099ff, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.3));
}

.navbar-brand:hover {
  transform: scale(1.08) translateY(-2px);
  filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.5));
}

.nav-link {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 600;
  padding: 0.6rem 1.5rem !important;
  margin: 0 0.4rem;
  border-radius: 30px;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  position: relative;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 30px;
  background: linear-gradient(135deg, #00d4ff, #667eea);
  opacity: 0;
  z-index: -1;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
}

.nav-link:hover {
  color: #fff !important;
  transform: translateY(-3px);
}

.nav-link:hover::before {
  opacity: 0.15;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  transform: translateX(-50%);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
}

.nav-link:hover::after {
  width: 80%;
}

.navbar-toggler {
  border: 2px solid rgba(0, 212, 255, 0.5);
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.2);
  border-color: #00d4ff;
}
</style>
