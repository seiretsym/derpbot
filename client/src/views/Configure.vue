<template>
  <div>
    <div class="container">
      <h3>Configure Page</h3>
    </div>
  </div>
</template>

<script>
import api from "@/config/api.js"

export default {
  name: 'Configure',
  data: function () {
    return {
      channels: Array,
    }
  },
  mounted() {
    api.getGuildChannels(this.$route.query.guild).then(({data}) => {
      if (data === "nope") {
        window.location.replace("/");
      } else {
        return this.channels = data
      }
    })
  }
}
</script>