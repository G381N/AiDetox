<template>
  <b-container class="mt-5 text-center">
    <b-row align-h="center">
      <b-col cols="12" md="6">

        <b class="d-block mb-2">
          404 – Page Not Found
        </b>

        <p class="text-muted">
          The page you are trying to access does not exist.
        </p>

        <b-button
          variant="primary"
          class="mt-3"
          :to="{ name: 'Login' }"
        >
          Go to Login
        </b-button>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>

<style scoped>
/* Keep empty for now */
</style>
