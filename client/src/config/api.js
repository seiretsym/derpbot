import axios from "axios";

export default {
  getUserGuilds: function () {
    return axios.get("/api/user/getGuilds")
  },
  getGuildChannels: function (guild_id) {
    return axios.get(`/api/guild/getChannels/${guild_id}`)
  },
  getGuildEmojis: function (guild_id) {
    return axios.get(`/api/guild/getEmojis/${guild_id}`);
  },
  getCategoryName: function (channel_id) {
    return axios.get(`/api/guild/getChannelCategory/${channel_id}`)
  }
}