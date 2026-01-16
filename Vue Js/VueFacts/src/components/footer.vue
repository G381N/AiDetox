<script setup>
import { ref } from "vue";
const name = ref("Gebin George");
const year = ref("2026");
</script>

<template>
  <footer>
    <p>
      Learn more about me at <a target="_blank" href="https://vuejs.org/">vuejs.org</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 35px;
  font-size: 0.8rem;
}

footer a {
  color: #40b883;
}
</style>
