<template>
  <li class="user-item" v-bind:class="{ 'highlight': user.age > 40 }">
    
    <span>{{ user.name }} - {{ user.email }} (Age: {{ user.age }})</span>
    
    <button v-on:click="$emit('delete-user', index)">Delete</button>
  </li>
</template>

<script>
export default 
{
  name: 'UserItem',
  
  props: 
  {
    user: {
      type: Object,   
      required: true,
    },
    index: {
      type: Number,   
      required: true,
    },
  },
}
</script>

<style scoped>
/* scoped: styles only apply to this component */

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

button {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #cc0000;
}

.highlight {
  background-color: #fff3cd;
  border: 2px solid #ffc107;
}
/* highlight class applied when user.age > 40 */
</style>
