<template>
  <div class="users-wrapper">
    <div class="container-fluid px-5 py-5">
      
      <div class="users-header">
        <div class="header-content">
          <h1 class="page-title">Team Members</h1>
          <p class="page-subtitle">Manage and view your team</p>
        </div>
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search by name or email..."
          v-model="searchQuery"
        />
      </div>

      <div class="users-table-wrapper">
        <div class="users-table-header">
          <div class="col col-avatar">Avatar</div>
          <div class="col col-info">Name</div>
          <div class="col col-email">Email</div>
          <div class="col col-status">Status</div>
          <div class="col col-action">Action</div>
        </div>

        <div class="users-table-body">
          <div
            v-for="user in filteredUsers"
            :key="user.id"
            class="users-table-row"
          >
            <div class="col col-avatar">
              <div class="avatar">{{ user.name.charAt(0) }}</div>
            </div>
            <div class="col col-info">
              <div class="user-name">{{ user.name }}</div>
            </div>
            <div class="col col-email">
              <div class="user-email">{{ user.email }}</div>
            </div>
            <div class="col col-status">
              <span class="status-badge" :class="user.status">{{ user.status }}</span>
            </div>
            <div class="col col-action">
              <router-link
                :to="{ name: 'UserDetailsPage', params: { id: user.id } }"
                class="btn-view"
              >
                View
              </router-link>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersListPage',
  data() {
    return {
      searchQuery: '',
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'inactive' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'active' },
        { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', status: 'active' }
      ]
    }
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) return this.users
      return this.users.filter(user => 
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  }
}
</script>

<style scoped>
.users-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #111838 50%, #0a0e27 100%);
  padding-top: 2rem;
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  gap: 2rem;
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.5px;
}

.page-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.05rem;
  margin: 0;
  font-weight: 400;
}

.search-input {
  background: rgba(20, 30, 60, 0.4);
  border: 1.5px solid rgba(0, 212, 255, 0.2);
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  color: #fff;
  font-size: 0.95rem;
  width: 300px;
  transition: all 0.3s;
  font-family: inherit;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.search-input:focus {
  outline: none;
  border-color: #00d4ff;
  background: rgba(0, 212, 255, 0.08);
  box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.12);
}

.users-table-wrapper {
  background: rgba(20, 30, 60, 0.3);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.users-table-header {
  display: grid;
  grid-template-columns: 70px 1fr 1fr 120px 100px;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(0, 212, 255, 0.1);
  background: rgba(0, 212, 255, 0.05);
}

.users-table-header .col {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.users-table-body {
  display: flex;
  flex-direction: column;
}

.users-table-row {
  display: grid;
  grid-template-columns: 70px 1fr 1fr 120px 100px;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  align-items: center;
  border-bottom: 1px solid rgba(0, 212, 255, 0.08);
  transition: all 0.3s;
  animation: fadeInUp 0.6s ease-out both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.users-table-row:nth-child(1) { animation-delay: 0.05s; }
.users-table-row:nth-child(2) { animation-delay: 0.1s; }
.users-table-row:nth-child(3) { animation-delay: 0.15s; }
.users-table-row:nth-child(4) { animation-delay: 0.2s; }
.users-table-row:nth-child(5) { animation-delay: 0.25s; }

.users-table-row:hover {
  background: rgba(0, 212, 255, 0.08);
  border-color: rgba(0, 212, 255, 0.2);
}

.col {
  display: flex;
  align-items: center;
}

.col-avatar {
  justify-content: center;
}

.col-info { min-width: 0; }
.col-email { min-width: 0; }
.col-status { justify-content: center; }
.col-action { justify-content: center; }

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #00d4ff, #667eea);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 8px 20px rgba(0, 212, 255, 0.15);
  transition: all 0.3s;
}

.users-table-row:hover .avatar {
  transform: scale(1.1);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.25);
}

.user-name {
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
}

.user-email {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  letter-spacing: 0.2px;
}

.status-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}

.status-badge.active {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 208, 132, 0.2));
  color: #00ff88;
  border: 1px solid rgba(0, 255, 136, 0.3);
}

.status-badge.inactive {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 142, 114, 0.2));
  color: #ff8e72;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.btn-view {
  background: linear-gradient(135deg, #00d4ff, #0099ff);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  color: #0a0e27;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 6px 20px rgba(0, 212, 255, 0.2);
  text-decoration: none;
  display: inline-block;
}

.btn-view:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
}

.list-group-item {
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
}
</style>
