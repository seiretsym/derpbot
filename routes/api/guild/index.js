const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

router.route("/getChannels/:id")
  .get((req, res) => {
    if (req.session.user) {
      axios.get(`https://discord.com/api/guilds/${req.params.id}/channels`, {
        headers: {
          "Authorization": `Bot ${process.env.BOT_TOKEN}`
        }
      })
        .then(({ data }) => {
          res.json(data.filter(channel => channel.type === 0))
        })
        .catch(err => {
          console.log("##### get /api/channel/getChannels/:id");
          console.log(err);
          res.json("Error retrieving server channels");
        })
    } else {
      res.json("nope")
    }
  })

router.route("/getEmojis/:id")
  .get((req, res) => {
    if (req.session.user) {
      axios.get(`https://discord.com/api/guilds/${req.params.id}`, {
        headers: {
          "Authorization": `Bot ${process.env.BOT_TOKEN}`
        }
      })
        .then(({ data }) => {
          res.json(data);
        })
        .catch(err => {
          console.log("##### get /api/channel/getEmojis/:id");
          console.log(err);
          res.json("Error retrieving emojis");
        })
    } else {
      res.json("nope");
    }
  })

router.route("/getChannelCategory/:id")
  .get((req, res) => {
    if (req.session.user) {
      axios.get(`https://discord.com/api/channels/${req.params.id}`, {
        headers: {
          "Authorization": `Bot ${process.env.BOT_TOKEN}`
        }
      })
        .then(({ data }) => {
          res.json(data.name);
        })
        .catch(err => {
          console.log("##### get /api/channel/:id");
          console.log(err);
          res.json("Error retrieving Channel Info");
        })
    } else {
      res.json("nope")
    }
  })

router.route("/getRoles/:id")
  .get((req, res) => {
    if (req.session.user) {
      axios.get(`https://discord.com/api/guilds/${req.params.id}/roles`, {
        headers: {
          "Authorization": `Bot ${process.env.BOT_TOKEN}`
        }
      })
        .then(({ data }) => {
          res.json(data.filter(role => (role.name !== "@everyone" && !role.managed)))
        })
        .catch(err => {
          console.log(`##### get discord.com/api/guilds/${req.params.id}/roles`);
          console.log(err);
          res.json("Error retrieving Discord Server Roles");
        })
    } else {
      res.json("nope")
    }
  })

module.exports = router;