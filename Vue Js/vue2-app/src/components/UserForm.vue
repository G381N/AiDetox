<template>
  <form @submit.prevent="submit" class="form">
    <label>
      Name
      <input v-model.trim="form.name" type="text" required />
    </label>

    <label>
      Email
      <input v-model.trim="form.email" type="email" required />
    </label>

    <label>
      Age
      <input v-model.number="form.age" type="number" required min="1" />
    </label>

    <button :disabled="isInvalid" type="submit">Add User</button>
  </form>
</template>

<script>
export default {
  name: "UserForm",
  data: () => ({ form: { name: "", email: "", age: null } }),
  computed: {
    isInvalid() {
      return !this.form.name || !this.form.email || !this.form.age || this.form.age <= 0;
    },
  },
  methods: {
    submit() {
      if (this.isInvalid) return;
      this.$emit("add-user", {
        name: this.form.name,
        email: this.form.email,
        age: this.form.age,
      });
      this.form.name = "";
      this.form.email = "";
      this.form.age = null;
    },
  },
};
</script>

<style scoped>
.form {
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
}
.form label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
input {
  padding: 6px;
  width: 100%;
  box-sizing: border-box;
}
button[disabled] {
  opacity: 0.5;
}
</style>
