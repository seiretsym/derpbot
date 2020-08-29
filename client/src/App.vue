<template>
  <div id="app">
    <Header title="Derp Bot" />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>