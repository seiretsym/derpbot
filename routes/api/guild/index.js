const router = require("express").Router();
const axios = require("axios");
const db = require("../../../models");
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
          console.log(err);
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
          console.log(err);
          res.json(err);
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
          res.json(err);
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
          res.json(data.filter(role => role.name !== "@everyone"))
        })
        .catch(err => {
          res.json(err);
        })
    } else {
      res.json("nope")
    }
  })

module.exports = router;