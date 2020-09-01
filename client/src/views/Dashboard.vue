<template>
  <div>
    <div class="container text-center">
      <h3>SELECT A SERVER</h3>
      <ul class="list-group">
          <li v-for="guild in guilds" :key="guild.id" class="d-flex my-2 w-50 rounded btn btn-dark list-group-item bg-dark mx-auto border border-secondary p-3">
            <img v-if="guild.icon !== null" :src="'https://cdn.discordapp.com/icons/'+guild.id+'/'+guild.icon+'.png'" height="32" width="32">
            <div v-else height="40" width="40" class="border border-secondary px-3" style="border-radius: 25px"></div>
            <div class="my-auto ml-3">{{ guild.name }}</div>
            <div v-if="guild.added" class="ml-auto">
              <a class="btn btn-info border border-info" :href="'/plugins?guild='+guild.id">
              Configure
              </a>
            </div>
            <div v-else class="ml-auto">
              <a class="btn btn-info border border-info" :href="link+'&guild_id='+guild.id" target="_new" onclick="window.open(this.href,'popUpWindow','height=800,width=600,left=10,top=10,,scrollbars=yes,menubar=no'); return false;">
              Add Derp
              </a>
            </div>
          </li>
      </ul>
      </div>
  </div>
</template>

<style scoped>
.btn:hover {
  background-color: #202427 !important;
}

a {
  text-decoration: none !important;
}
</style>

<script>
import api from "@/config/api.js"

export default {
  name: 'Dashboard',
  data: function() {
    return {
      guilds: Array,
      link: process.env.VUE_APP_BOT_OAUTH2,

    }
  },
  mounted() {
    api.getUserGuilds().then(({data}) => {
      if (data === "nope") {
        window.location.replace("/");
      } else {
        return this.guilds = data
      }
    })
  }
}
</script>