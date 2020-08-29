<template>
  <header class="nav mt-3">
    <h1 class="nav-link mx-auto mt-auto">{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
}
</script>