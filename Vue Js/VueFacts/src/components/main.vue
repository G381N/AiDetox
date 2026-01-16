<script setup>
import { ref } from "vue";
const Features[] = ref([
  {
    title: "Lightweight",
    description:
      "I am incredibly small and fast! My core library is only around 30KB, so I won't slow you down.",
  },
  {
    title: "Approachable",
    description:
      "Easy to learn and use, even for beginners. I have a gentle learning curve, clear documentation, and a supportive community.",
  },
  {
    title: "Versatile",
    description:
      "I can handle everything from simple interactive elements to complex single-page applications. I'm great for small projects and large-scale applications alike.",
  },
]);
</script>

<template>
  <main>
    <section>
      <h2>I'm <span class="highlight">{{Features[0].title}}</span></h2>
      <p>
        {{Features[0].description}}
      </p>
    </section>
    <section>
      <h2>I'm <span class="highlight">{{Features[1].title}}</span></h2>
      <p>
        {{Features[1].description}}
      </p>
    </section>
    <section>
      <h2>I'm <span class="highlight">{{Features[2].title}}</span></h2>
      <p>
        {{Features[2].description}}
      </p>
    </section>
  </main>
</template>

<style scoped>
main {
  margin-top: 15px;
}

main section {
  margin-top: 25px;
}

main h2 {
  font-size: 1.3rem;
  color: #34495e;
  margin-bottom: 3px;
}

main p {
  font-size: 0.9rem;
  color: #555;
}
</style>
