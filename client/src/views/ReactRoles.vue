<template>
  <div>
    <h3 class="d-flex text-center">Reaction Roles<button v-on:click="back('default')" class="ml-auto py-0 px-3 my-auto btn btn-info">Back</button></h3>
    <div class="container">
      <div v-for="(message, i) in savedReactions" :key="message._id">
        <div :data-id="message._id" class="form-group bg-darker p-3 rounded">
          <div class="d-flex">
            <div class="my-auto">#{{ message.name }}</div>
            <button v-on:click="(event) => toggleShowInfo(event, i)" class="btn ml-auto btn-dark px-4">Show</button>
            <button class="btn btn-danger px-3 ml-3" v-on:click="deleteChannelReactions" :data-i="i">Delete</button>
          </div>
          <ShowReaction :savedReaction="message" :show="message.show" />
        </div>
      </div>
      <button v-on:click="toggleReactionForm" class="w-100 btn btn-info px-3" id="addReactRoles">Create New React Roles</button>
      <ReactionForm :show="showForm" :cancelBtn="toggleReactionForm" />
    </div>
  </div>
</template>

<style scoped>
  .bg-darker {
    background-color: rgb(28, 31, 32);
  }
</style>

<script>
import api from "@/config/api.js";
import ReactionForm from "@/components/ReactionForm.vue";
import ShowReaction from "@/components/ShowReaction.vue";

export default {
  name: 'ReactRoles',
  props: {
    back: Function,
  },
  components: {
    ReactionForm,
    ShowReaction
  },
  data: function() {
    return {
      showForm: false,
      savedReactions: Array,
    }
  },
  methods: {
    toggleShowInfo: function(event, i) {
      if (event.target.textContent === "Show") {
        event.target.textContent = "Hide"
      } else {
        event.target.textContent = "Show"
      }
      this.savedReactions[i].show = !this.savedReactions[i].show;
    },
    toggleReactionForm: function(event) {
      event.preventDefault();
      this.showForm = !this.showForm;
    },
    deleteChannelReactions: function(event) {
      event.preventDefault();
      const index = parseInt(event.target.getAttribute("data-i"));
      api
        .deleteChannelReactions(this.savedReactions[index]._id)
        .then(() => {
          console.log("delete.then")
          const newData = [];
          for (let i = 0; i < this.savedReactions.length; i++) {
            if (i !== index) {
              newData.push(this.savedReactions[i]);
            }
          }
          console.log("newData: ", newData)
          // event.target.parentElement.parentElement.remove();
          return (this.savedReactions = [...newData]);
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  watch: {
    showForm: function(event) {
      if (event) {
        document.querySelector("#addReactRoles").classList.add("d-none");
      } else {
        document.querySelector("#addReactRoles").classList.remove("d-none");
      }
    }
  },
  mounted() {
    api.getChannelReactions(this.$route.query.guild).then(({data}) => {
      data = data.map(reaction => {
        const temp = {...reaction}
        temp.show = false;
        return temp;
      })
      return (this.savedReactions = data);
    })
  }
}
</script>