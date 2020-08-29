<template>
  <nav class="nav mt-3">
    <h3 class="nav-link mx-auto mt-auto">{{ title }}</h3>
    <a class="nav-link disabled mt-auto" href="#" tabindex="-1" aria-disabled="true">Log In</a>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    title: String
  }
}
</script>