<template>
  <div>
    <h3 class="text-center">Reaction Roles</h3>
    <div class="container bg-darker p-3 rounded">
      <form>
        <div class="form-group">
        <label for="channel" class="font-weight-bold">Select a Channel</label>
        <select v-on:change="selectChannel" class="bg-dark btn-dark text-light form-control">
          <option value="none" disabled selected>Choose...</option>
          <option v-for="channel in channels" :key="channel.id" :value="channel.id">
            #{{ channel.name }} in {{ channel.category }}
          </option>
        </select>
        </div>
        <div class="form-group message">
          <label for="message" class="font-weight-bold">Enter Message ( {{ newEvent.message.length }} / 1800 )</label>
          <textarea v-on:input="updateMessage" id="channelMessageInput" maxlength="1800" class="btn-dark bg-dark form-control" rows="5"/>
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
            <div v-for="reaction in selectedReactions" :key="reaction.name" class="form-group bg-dark p-3 rounded">
              <img v-if="reaction.type === 'img'" :src="reaction.src" height="32" width="32"/>
              <div v-if="reaction.type === 'div'" :style="reaction.style"/>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.bg-darker {
  background-color: rgb(28, 31, 32);
}

div.message,
div.reactions {
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

button.sticky-right:hover {
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

export default {
  name: 'ReactRoles',
  components: {
    EmojiWidget
  },
  data: function() {
    return {
      showMessageWidget: false,
      showReactionWidget: false,
      selectedReactions: [],
      guild: {},
      channels: Array,
      newEvent: {
        channel: String,
        message: "",
        reactions: Array,
        roles: Array
      }
    }
  },
  props: {
    guild_id: String
  },
  methods: {
    selectChannel: function(event) {
      return (this.newEvent.channel = event.target.value);
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
      this.showReactionWidget = false;
    },
    handleMessageEmojiClick: function(event) {
      event.preventDefault();
      const button = event.target;
      const shortcut = button.getAttribute("aria-label");
      const textBox = document.querySelector("#channelMessageInput");
      textBox.value += `${shortcut}`;
      this.newEvent.message += `${shortcut}`;
      this.showMessageWidget = false;
    }
  },
  mounted() {
    api.getGuildChannels(this.$route.query.guild).then(({ data }) => {
      if (data === "nope") {
        window.location.replace("/");
      } else {
        Promise.all(data.map(async channel => {
          const name = await api.getCategoryName(channel.parent_id);
          const temp = {...channel};
          temp.category = name.data;
          return Promise.resolve(temp);
        })).then(data => {
          return (this.channels = data);
        })
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
        return (this.guild = guildInfo);
      }
    })
  }
}
</script>