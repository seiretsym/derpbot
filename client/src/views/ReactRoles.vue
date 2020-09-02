<template>
  <div>
    <h3 class="d-flex text-center">Reaction Roles<button v-on:click="back('default')" class="ml-auto py-0 px-3 my-auto btn btn-info">Back</button></h3>
    
    <button v-on:click="toggleReactionForm">Toggle</button>
    <ReactionForm :show="showForm"/>
  </div>
</template>


<script>
import api from "@/config/api.js";
import ReactionForm from "@/components/ReactionForm.vue";

export default {
  name: 'ReactRoles',
  props: {
    back: Function,
  },
  components: {
    ReactionForm,
  },
  data: function() {
    return {
      showForm: false,
      savedReactions: Array,
    }
  },
  methods: {
    toggleReactionForm: function() {
      this.showForm = !this.showForm;
    }
  },
  mounted() {
    api.getChannelReactions(this.$route.query.guild).then(({data}) => {
      return (this.savedReactions = data);
    })
  }
}
</script>