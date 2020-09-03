<template>
  <div>
    <div class="container">
      <div class="jumbotron bg-dark text-center">
        <h3>Add Derp Bot to your Discord Server now!</h3>
        <p>Do it. It's derptastic. Do it. Do it. DERP IT!</p>
        <a class="btn btn-dark border-light rounded pt-2 px-3"
          target="_new"
          href="https://discord.com/api/oauth2/authorize?client_id=748393009292378142&redirect_uri=https%3A%2F%2Fdiscord-derpapp.herokuapp.com%2Fapi%2Foauth2%2Fdiscord-callback&response_type=code&scope=identify%20email%20guilds"
          onclick="window.open(this.href,'popUpWindow','height=800,width=600,left=10,top=10,,scrollbars=yes,menubar=no'); return false;"><h5>Add to Discord</h5></a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Main',
}
</script>