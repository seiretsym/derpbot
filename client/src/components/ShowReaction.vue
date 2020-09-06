<template>
  <div class="d-none" :id="'div-'+savedReaction._id">
    <div class="bg-darker rounded form-group mt-3">
      <label for="message" class="font-weight-bold">Message</label>
      <textarea :value="savedReaction.message" class="btn-dark bg-dark form-control" rows="5" disabled/>
    </div>
    <div class="bg-darker rounded form-group">
      <label for="reactions" class="font-weight-bold">Reactions &amp; Roles</label>
      <div v-for="(reaction, i) in selectedReactions" :key="reaction.name" class="reaction form-group d-flex bg-dark p-3 rounded">
        <img v-if="reaction.type === 'img'" :src="reaction.src" height="32" width="32"/>
        <div v-if="reaction.type === 'div'" :style="reaction.style"/>
        <span class="my-auto ml-3 bg-darker px-2 py-1 rounded w-25">
          {{ roles[roles.findIndex(role => role.id === savedReaction.roles[i])].name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-darker {
  background-color: rgb(28, 31, 32);
}

textarea {
  resize: none;
}

</style>

<script>
import api from "@/config/api.js";
import { activities } from "@/emojis/activities.json";
import { flags } from "@/emojis/flags.json";
import { food } from "@/emojis/food.json";
import { nature } from "@/emojis/nature.json";
import { objects } from "@/emojis/objects.json";
import { people } from "@/emojis/people.json";
import { symbols } from "@/emojis/symbols.json";
import { travel } from "@/emojis/travel.json";

export default {
  name: 'ShowReaction',
  props: {
    show: Boolean,
    savedReaction: Object,
  },
  data: function() {
    return {
      selectedReactions: [],
      guild: Object,
      roles: []
    }
  },
  watch: {
    show: function(event) {
      if (event) {
        document.querySelector(`#div-${this.savedReaction._id}`).classList.remove("d-none")
      } else {
        document.querySelector(`#div-${this.savedReaction._id}`).classList.add("d-none")
      }
    }
  },
  mounted() {
    api.getGuildRoles(this.$route.query.guild).then(({ data }) => {
      if (data === "nope") {
        window.location.replace("/");
      } else {
        api.getGuildEmojis(this.$route.query.guild).then(({ data }) => {
          if (data === "nope") {
            window.location.replace("/");
          } else {
            const guildInfo = {
              name: data.name,
              emojis: data.emojis
            }
            this.emojis = [...activities, ...flags, ...food, ...nature, ...objects, ...people, ...symbols, ...travel, ...data.emojis]
            this.savedReaction.reactions.forEach(reaction => {
              const newReaction = {};
              if (isNaN(reaction)) {
                const reactionInfo = this.emojis.find(emoji => emoji.unicode === decodeURIComponent(reaction))
                newReaction.type = "div",
                newReaction.style = `background-image: url('https://discord.com${reactionInfo.url}'); background-position: ${reactionInfo.backgroundPosition}; background-size: ${reactionInfo.backgroundSize}; width: 32px; height: 32px;`
              } else {
                const reactionInfo = this.emojis.find(emoji => emoji.id === reaction)
                newReaction.type = "img"
                if (reactionInfo.animated) {
                  newReaction.src = "https://cdn.discordapp.com/emojis/" + reactionInfo.id + ".gif?v=1"
                } else {
                  newReaction.src = "https://cdn.discordapp.com/emojis/" + reactionInfo.id + ".png?v=1"
                }
              }
              this.selectedReactions.push(newReaction);
            })
            return (this.guild = guildInfo);
          }
        }).catch(err=>{
        console.log(err)
      })
        return (this.roles = data);
      }
    }).catch(err=>{
      console.log(err);
    })
  }
}
</script>