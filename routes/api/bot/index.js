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
    console.log(req.body);
    // api call to create message, then retrieve message id for saving into db
    axios.post(`https://discord.com/api/channels/${req.body.channel_id}/messages`, {
      content: req.body.message
    }, headers)
      .then(async ({ data }) => {
        // add reactions to message
        req.body.reactions.map((reaction, i) => {
          setTimeout(function () {
            if (isNaN(reaction)) {
              const encoded = encodeURIComponent(reaction)
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
          }, 1000 * i)
        })
        // save data to db
        db.Channel.create({
          message_id: data.id,
          ...req.body
        })
          .then(data => {
            console.log(data)
            res.json(data);
          })
      })
  })

module.exports = router;