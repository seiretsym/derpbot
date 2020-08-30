<template>
  <div>
    <div class="container">
      <div class="jumbotron bg-dark text-center">
      <h3>SELECT A SERVER</h3>
      <ul class="list-group">
        <a v-for="guild in guilds" :key="guild.id" class="" :href="link+'&guild_id='+guild.id" target="_new" onclick="window.open(this.href,'popUpWindow','height=800,width=600,left=10,top=10,,scrollbars=yes,menubar=no'); return false;">
          <li :key="guild.id" class="d-flex rounded btn btn-dark w-50 list-group-item bg-dark my-1 mx-auto border border-secondary p-3">
            <img v-if="guild.icon !== null" :src="'https://cdn.discordapp.com/icons/'+guild.id+'/'+guild.icon+'.png'" height="32" width="32">
            <div v-else height="40" width="40" class="border border-secondary p-3" style="border-radius: 25px"></div>
            <div class="my-auto ml-3">{{ guild.name }}</div>
            <button class="ml-auto btn btn-info">Configure</button>
          </li>
        </a>
      </ul>
      </div>
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
      link: process.env.VUE_APP_BOT_OAUTH2
    }
  },
  mounted() {
    api.getUserGuilds().then(({data}) => {this.guilds = data})
  }
}
</script>