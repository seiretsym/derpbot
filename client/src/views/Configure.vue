<template>
  <div>
    <div class="container">
      <h3>Configure Page</h3>
      <Emoji :guild="guild"/>
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
      channels: [],
      guild: {},
    }
  },
  mounted() {
    api.getGuildChannels(this.$route.query.guild).then(({ data }) => {
      if (data === "nope") {
        window.location.replace("/");
      } else {
        return (this.channels = data);
      }
    })
    api.getGuildEmojis(this.$route.query.guild).then(({ data }) => {
      if (data === "nope") {
        window.location.replace("/");
      } else {
        const guildInfo = {
          name: data.name,
          emojis: data.emojis
        }
        console.log(data.emojis[0])
        return (this.guild = guildInfo);
      }
    })
  }
}
</script>