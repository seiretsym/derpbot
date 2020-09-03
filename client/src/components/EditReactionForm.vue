<template>
  <div class="bg-darker p-3 rounded d-block mb-3" :id="'edit-' + savedReaction._id">
    <form>
      <div class="form-group">
        <label for="channel" class="font-weight-bold">Channel</label>
        <div class="form-group bg-dark rounded p-3">
          #{{ this.savedReaction.name }}
        </div>
      </div>
      <div class="form-group message">
        <label for="message" class="font-weight-bold">Enter Message ( {{ newEvent.message.length }} / 1800 )</label>
        <textarea v-on:input="updateMessage" :id="'channelMessageInput-' + savedReaction._id" :value="newEvent.message" maxlength="1800" class="btn-dark bg-dark form-control" rows="5"/>
        <button v-on:click="toggleMessage" class="sticky-right">
          <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 6.477 17.522 2 12 2ZM16.293 6.293L17.707 7.706L16.414 9L17.707 10.293L16.293 11.706L13.586 9L16.293 6.293ZM6.293 7.707L7.707 6.294L10.414 9L7.707 11.707L6.293 10.294L7.586 9L6.293 7.707ZM12 19C9.609 19 7.412 17.868 6 16.043L7.559 14.486C8.555 15.92 10.196 16.831 12 16.831C13.809 16.831 15.447 15.92 16.443 14.481L18 16.04C16.59 17.867 14.396 19 12 19Z" fill="currentColor"></path>
          </svg>
        </button>
        <EmojiWidget :show="showMessageWidget" :guild="guild" :handleClick="handleMessageEmojiClick"/>
      </div>
      <div class="form-group reactions">
        <div class="d-flex">
          <label for="reactions" class="font-weight-bold mt-auto mb-0">Reactions &amp; Roles</label>
          <button v-on:click="toggleReaction" class="btn-dark border-0 text-light p-2 rounded ml-auto">Add Reaction</button>
          <EmojiWidget :show="showReactionWidget" :guild="guild" :handleClick="handleAddReaction"/>
        </div>
        <div class="form-group mt-3">
          <div v-for="(reaction, i) in selectedReactions" :key="reaction.name" class="reaction form-group d-flex bg-dark p-3 rounded">
            <img v-if="reaction.type === 'img'" :src="reaction.src" height="32" width="32"/>
            <div v-if="reaction.type === 'div'" :style="reaction.style"/>
            <select v-on:change="selectRole" :data-id="i" class="bg-darker ml-3 btn-dark p-1 text-light rounded">
              <!-- <option v-if="(newEvent.roles[i] !== ' ') && (roles.length > 0)" :value="newEvent.roles[i]" disabled selected>{{ roles[roles.findIndex(role => role.id === newEvent.roles[i])].name }}</option> -->
              <option :value="newEvent.roles[i]" disabled>Select a Role</option>
              <option v-for="role in roles" :key="role.id" :value="role.id" :selected="selected(i, role.id)">{{ role.name }}</option>
            </select>
            <p class="my-auto ml-3">Please make sure that Derp Bot's role is listed above the roles that are being assigned by Derp Bot.</p>
            <button v-on:click="removeReaction" :data-id="i" class="sticky-remove">&times;</button>
          </div>
        </div>
      </div>
      <div class="form-group mb-0">
        <hr class="bg-secondary">
        <button v-on:click="saveEvent" :id="'save-' + savedReaction._id" class="btn-dark border-0 text-light p-2 px-5 rounded ml-auto disabled">Save</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.disabled {
  pointer-events: none;
  background-color:rgb(32, 17, 19) !important;
}

.role-btn {
  border: 1px solid rgb(28, 31, 32);
  border-radius: 5px;
  width: 24px;
  height: 24px;
  padding: 5px;
  color: white;
  background-color: inherit;
  outline: none;
  text-align: center;
  line-height: 0px;
}

.bg-darker {
  background-color: rgb(28, 31, 32);
}

div.message,
div.reactions,
div.reaction {
  position: relative;
}

.sticky-right {
  background: transparent !important;
  border: none;
  outline: none;
  color: white;
  position: absolute;
  top: 35px;
  right: 0px;
  z-index: 2;
}

.sticky-remove {
  background: transparent !important;
  font-size: 20px;
  border: none;
  outline: none;
  color: white;
  position: absolute;
  top: -5px;
  right: 0px;
  z-index: 2;
}

button.sticky-right:hover,
button.sticky-remove:hover {
  color: green;
}

svg {
  pointer-events: none;
}

textarea {
  resize: none;
}

</style>


<script>
import api from "@/config/api.js";
import EmojiWidget from "@/components/Emoji.vue";
import { activities } from "@/emojis/activities.json";
import { flags } from "@/emojis/flags.json";
import { food } from "@/emojis/food.json";
import { nature } from "@/emojis/nature.json";
import { objects } from "@/emojis/objects.json";
import { people } from "@/emojis/people.json";
import { symbols } from "@/emojis/symbols.json";
import { travel } from "@/emojis/travel.json";

export default {
  name: 'EditReactionForm',
  components: {
    EmojiWidget
  },
  data: function() {
    return {
      showMessageWidget: false,
      showReactionWidget: false,
      selectedReactions: [],
      emojis: Array,
      guild: {},
      roles: Array,
      newEvent: {
        channel: String,
        message: "",
        reactions: [],
        roles: []
      },
      selected: function(i, id) {
      if (this.newEvent.roles[i] === id) {
        return "selected"
      } else {
        return false
      }
      }
    }
  },
  props: {
    show: Boolean,
    savedReaction: Object,
  },
  watch: {
    newEvent: {
      handler(event) {
        if (event.channel !== "" && event.message !== "" && event.roles.find(role => role === " ") === undefined && event.reactions.length > 0) {
            document.querySelector(`#save-${this.savedReaction._id}`).classList.remove("disabled");
        } else {
            document.querySelector(`#save-${this.savedReaction._id}`).classList.add("disabled");
        }
      },
      deep: true
    },
    show: function(event) {
      if (event) {
        document.querySelector(`#edit-${this.savedReaction._id}`).classList.replace("d-none", "d-block")
      } else {
        document.querySelector(`#edit-${this.savedReaction._id}`).classList.replace("d-block", "d-none")
      }
    } 
  },
  methods: {
    removeReaction: function(event) {
      event.preventDefault();
      let index = parseInt(event.target.getAttribute("data-id"));
      const newArray = [];
      const newEventRoles = [];
      const newEventReactions = [];
      for (let i = 0; i < this.selectedReactions.length; i++) {
        if (i !== index) {
          newArray.push(this.selectedReactions[i])
          newEventRoles.push(this.newEvent.roles[i])
          newEventReactions.push(this.newEvent.reactions[i])
        }
      }
      this.newEvent.roles = newEventRoles;
      this.newEvent.reactions = newEventReactions;
      return (this.selectedReactions = newArray);
    },
    saveEvent: function(event) {
      event.preventDefault();
      const data = {
        guild_id: this.$route.query.guild,
        name: this.savedReaction.name,
        channel_id: this.newEvent.channel,
        message:  this.newEvent.message,
        message_id: this.savedReaction.message_id,
        reactions: [...this.newEvent.reactions],
        roles: [...this.newEvent.roles]
      }
      api.editReaction(this.savedReaction._id, data)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
    },
    selectChannel: function(event) {
      return (this.newEvent.channel = event.target.value);
    },
    selectRole: function(event) {
      let index = parseInt(event.target.getAttribute("data-id"));
      let id = event.target.value;
      let newEventRoles = [...this.newEvent.roles];
      newEventRoles[index] = id;
      return (this.newEvent.roles = newEventRoles);
    },
    updateMessage: function(event) {
      return (this.newEvent.message = event.target.value);
    },
    toggleMessage: function(event) {
      event.preventDefault();
      return (this.showMessageWidget = !this.showMessageWidget);
    },
    toggleReaction: function(event) {
      event.preventDefault();
      return (this.showReactionWidget = !this.showReactionWidget)
    },
    handleAddReaction: function(event) {
      event.preventDefault();
      const button = event.target;
      const child = button.children[0];
      const element = {}
      if (child.getAttribute("src")) {
        element.src = child.getAttribute("src");
        element.type = "img";
      } else {
        element.style = child.getAttribute("style");
        element.type = "div";
      }
      this.selectedReactions.push(element);
      this.newEvent.reactions.push(button.getAttribute("data-id"));
      this.newEvent.roles.push(" ");
      this.showReactionWidget = false;
    },
    handleMessageEmojiClick: function(event) {
      event.preventDefault();
      const button = event.target;
      const shortcut = button.getAttribute("aria-label");
      const textBox = document.querySelector(`#channelMessageInput-${this.savedReaction._id}`);
      const src = button.children[0].getAttribute("src")
      const id = button.getAttribute("data-id")
      if (src) {
        const type = src.slice(src.length-7, src.length-4)
        if (type === "gif") {
          textBox.value += `<a${shortcut}${id}>`;
          this.newEvent.message += `<a${shortcut}${id}>`;
        } else {
          textBox.value += `<${shortcut}${id}>`;
          this.newEvent.message += `<${shortcut}${id}>`;
        }
      } else {
        textBox.value += shortcut;
        this.newEvent.message += shortcut;
      }
      this.showMessageWidget = false;
    }
  },
  mounted() {
    api.getGuildEmojis(this.$route.query.guild).then(({ data }) => {
      if (data === "nope") {
        window.location.replace("/");
      } else {
        const guildInfo = {
          name: data.name,
          emojis: data.emojis
        }
        this.emojis = [...activities, ...flags, ...food, ...nature, ...objects, ...people, ...symbols, ...travel, ...data.emojis]
        this.newEvent.message = this.savedReaction.message;
        this.newEvent.reactions = this.savedReaction.reactions;
        this.newEvent.roles = this.savedReaction.roles;
        this.newEvent.channel = this.savedReaction.channel_id;
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
    })

    api.getGuildRoles(this.$route.query.guild).then(({ data }) => {
      if (data === "nope") {
        window.location.replace("/");
      } else {
        return (this.roles = data);
      }
    })
  }
}
</script>