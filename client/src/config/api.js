import axios from "axios";

export default {
  getUserGuilds: function () {
    return axios.get("/api/user/guilds")
  }
}