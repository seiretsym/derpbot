<template>
  <div>
    <div class="container">
      <h3>Configure Page</h3>
      <Emoji />
    </div>
  </div>
</template>

<script>
import api from "@/config/api.js"
import Emoji from "@/components/Emoji.vue"

export default {
  name: 'Configure',
  components: {
    Emoji,
  },
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