<template>
  <div class="btn m-3 p-2 card text-light border-secondary" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title text-center">{{ title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted text-center">{{ subtitle }}</h6>
      <p class="card-text text-left">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #343a40;
}

.card:hover {
  background-color: rgb(28, 31, 32);
}
</style>

<script>
export default {
  name: 'Header',
  props: {
    title: String,
    subtitle: String,
    description: String
  }
}
</script>