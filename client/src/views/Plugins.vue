<template>
  <div>
    <div class="container">
      <section class="d-flex">
        <div v-if="display==='default'" class="w-100">
          <h3 class="text-center d-flex">Select a Plugin<a href="/dashboard" class="btn btn-info ml-auto py-0 px-3 my-auto btn btn-info">Back</a></h3>
          <div class="row">
            <div class="col-sm-4">
              <Card v-on:click.native="changeView('react')" title="Reaction Roles" subtitle="Role Management made Derpy" description="Configure Derp Bot for reaction roles in your specified channels." />
            </div>
            <div class="col-sm-4 disabled">
              <Card v-on:click.native="changeView('music')" title="Music Player" subtitle="Under Development" description="Setup the music player feature of Derp Bot." />
            </div>
          </div>
        </div>
        <div v-else-if="display==='music'" class="w-100">
          <h3 class="text-center">Music Player</h3>
          <p>Work in progress. Check back later.</p>
        </div>
        <div v-else-if="display==='react'" class="w-100">
          <ReactRoles :guild_id="this.$route.query.guild" :back="changeView"/>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.disabled {
  pointer-events: none;
}
</style>

<script>
import Card from "@/components/Card.vue"
import ReactRoles from "@/views/ReactRoles.vue"

export default {
  name: 'Plugins',
  components: {
    Card,
    ReactRoles
  },
  data: function () {
    return {
      showWidget: false,
      display: "default",
    }
  },
  methods: {
    toggle: function() {
      this.showWidget = !this.showWidget;
    },
    changeView: function(view) {
      this.display = view;
    }
  },
}
</script>