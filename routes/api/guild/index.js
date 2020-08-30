const router = require("express").Router();
const axios = require("axios");
const guildController = require("../../../controllers/guildController");
require("dotenv").config();

router.route("/getChannels/:id")
  .get((req, res) => {
    axios.get(`https://discord.com/api/guilds/${req.params.id}/channels`, {
      headers: {
        "Authorization": `Bot ${process.env.BOT_TOKEN}`
      }
    })
      .then(({ data }) => {
        res.json(data.filter(channel => channel.type === 0))
      })
      .catch(err => {
        console.log(err);
      })
  })

module.exports = router;