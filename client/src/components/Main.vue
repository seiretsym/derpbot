<template>
  <div>
    <Nav title="DERP BOT"/>
    <div class="container">
      <div class="jumbotron bg-dark text-center">
        <h3>Add Derp Bot to your Discord Server now!</h3>
        <p>Features music, react roles, and that's it. Derp.</p>
        <a class="btn btn-dark border-light rounded pt-2 px-3"
          target="_new"
          href="https://discord.com/api/oauth2/authorize?client_id=748393009292378142&redirect_uri=http%3A%2F%2Flocalhost%3A3377%2Fapi%2Foauth2%2Fdiscord-callback&response_type=code&scope=identify%20email%20guilds"><h5>Add to Discord</h5></a>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav"

export default {
  name: 'Main',
  components: {
    Nav
  }
}
</script>