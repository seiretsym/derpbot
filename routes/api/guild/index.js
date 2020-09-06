const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();
let categoryCount = 0;

router.route("/getChannels/:id")
  .get((req, res) => {
    // check if session is still valid
    if (req.session.user) {
      // request to discord api for retrieving channels from a discord server
      axios.get(`https://discord.com/api/guilds/${req.params.id}/channels`, {
        headers: {
          "Authorization": `Bot ${process.env.BOT_TOKEN}`
        }
      })
        .then(({ data }) => {
          // filter out non-text channels
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
      // request to discord api for retrieving server emojis
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
      categoryCount++;
      // set a timer per request based on categoryCount to
      // avoid hitting discord api's rate limit of 50 requests/min
      setTimeout(() => {
        // request to discord api for retrieving category name
        axios.get(`https://discord.com/api/channels/${req.params.id}`, {
          headers: {
            "Authorization": `Bot ${process.env.BOT_TOKEN}`
          }
        })
          .then(({ data }) => {
            // reduce count after request has been sent
            categoryCount--;
            res.json(data.name);
          })
          .catch(err => {
            // reduce count after request has been sent
            categoryCount--;
            console.log("##### get /api/channel/:id");
            console.log(err);
            res.json("Error retrieving Channel Info");
          })
      }, categoryCount * 30)
    } else {
      res.json("nope")
    }
  })

router.route("/getRoles/:id")
  .get((req, res) => {
    if (req.session.user) {
      // request to discord api to retrieve server roles
      axios.get(`https://discord.com/api/guilds/${req.params.id}/roles`, {
        headers: {
          "Authorization": `Bot ${process.env.BOT_TOKEN}`
        }
      })
        .then(({ data }) => {
          // filter out @everyone and bot integrated roles
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