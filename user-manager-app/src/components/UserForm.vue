<template>
  <form v-on:submit.prevent="submitForm">
    <input type="text" placeholder="Name" v-model="name" />


    <input type="email" placeholder="Email" v-model="email" />

    <input type="number" placeholder="Age" v-model.number="age" />

    <button v-bind:disabled="isDisabled">
      Add User
    </button>
  </form>
</template>

<script>
export default 
{
  name: "UserForm",
  
  data() 
  {
    return {
      name: "",   
      email: "",  
      age: null, 
    };
  },
  
  computed: 
  {
    isDisabled() // Returns true if form is incomplete
    {
      return (
        !this.name ||
        !this.email ||
        !this.age ||
        this.age <= 0
      );
    },
  },
  
  methods: 
  {
    submitForm() // Called when form is submitted
    {
      const newUser = {
        name: this.name,
        email: this.email,
        age: this.age,
      };

      this.$emit("add-user", newUser);
      // event add-user is emitted with newUser object as payload

      this.name = "";
      this.email = "";
      this.age = null;
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 6px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
