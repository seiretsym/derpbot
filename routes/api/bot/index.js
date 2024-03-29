const router = require("express").Router();
const axios = require("axios");
const db = require("../../../models");
require("dotenv").config();
const headers = {
  headers: {
    "Authorization": `Bot ${process.env.BOT_TOKEN}`
  }
}

router.route("/createReaction")
  .post(async (req, res) => {
    // api call to create message, then retrieve message id for saving into db
    axios.post(`https://discord.com/api/channels/${req.body.channel_id}/messages`, {
      content: req.body.message
    }, headers)
      .then(async ({ data }) => {
        // add reactions to message
        req.body.reactions.map((reaction, i) => {
          setTimeout(function () {
            if (isNaN(reaction)) {
              console.log("encoded", encoded)
              axios.put(`https://discord.com/api/channels/${req.body.channel_id}/messages/${data.id}/reactions/${encoded}/@me`, {}, headers)
                .catch(err => {
                  console.log(err)
                })
            } else {
              axios.put(`https://discord.com/api/channels/${req.body.channel_id}/messages/${data.id}/reactions/name:${reaction}/@me`, {}, headers)
                .catch(err => {
                  console.log(err)
                })
            }
          }, 2000 * i)
        })
        // convert emojis if necessary
        const newData = { ...req.body }
        newData.reactions = newData.reactions.map(reaction => {
          if (isNaN(reaction)) {
            return encodeURIComponent(reaction);
          } else {
            return reaction;
          }
        })
        // save data to db
        db.Channel.create({
          message_id: data.id,
          ...newData
        })
          .then(() => {
            res.redirect("/api/bot/start")
          })
          .catch(err => {
            console.log(err);
            res.json(err);
          })
      })
      .catch(err => {
        console.log("##### /createReaction error")
        console.log(err);
        res.json("Cannot Create Reaction")
      })
  })

module.exports = router;