const router = require("express").Router();
const db = require("../../../models");
const axios = require("axios");
require("dotenv").config();

router.route("/getReactions/:id")
  .get((req, res) => {
    db.Channel.find({
      guild_id: req.params.id
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log("##### get /api/channel/getReactions/:id");
        console.log(err);
        res.json("Error retrieving emojis");
      })
  })

router.route("/editReaction/:id")
  .put((req, res) => {
    console.log(req.body)
    axios.patch(`https://discord.com/api/channels/${req.body.channel_id}/messages/${req.body.message_id}`, {
      content: req.body.message
    }, {
      headers: {
        "Authorization": `Bot ${process.env.BOT_TOKEN}`
      }
    })
      .then(() => {
        req.body.reactions.map((reaction, i) => {
          setTimeout(function () {
            if (isNaN(reaction)) {
              if (reaction[0] === "%") {
                console.log(reaction)
                axios.put(`https://discord.com/api/channels/${req.body.channel_id}/messages/${req.body.message_id}/reactions/${reaction}/@me`, {}, {
                  headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`
                  }
                })
                  .catch(err => {
                    console.log(err)
                  })
              } else {
                const encoded = encodeURIComponent(reaction)
                axios.put(`https://discord.com/api/channels/${req.body.channel_id}/messages/${req.body.message_id}/reactions/${encoded}/@me`, {}, {
                  headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`
                  }
                })
                  .catch(err => {
                    console.log(err)
                  })
              }
            } else {
              axios.put(`https://discord.com/api/channels/${req.body.channel_id}/messages/${req.body.message_id}/reactions/name:${reaction}/@me`, {}, {
                headers: {
                  Authorization: `Bot ${process.env.BOT_TOKEN}`
                }
              })
                .catch(err => {
                  console.log(err)
                })
            }
          }, 1000 * i)
        })
        // convert emojis if necessary
        const newData = { ...req.body }
        newData.reactions = newData.reactions.map(reaction => {
          if (isNaN(reaction) && reaction[0] !== "%") {
            return encodeURIComponent(reaction);
          } else {
            return reaction;
          }
        })
        db.Channel
          .findOneAndUpdate({ _id: req.body._id }, { $set: newData }, { new: true })
          .then(data => {
            res.json(data);
          })
          .catch(err => {
            console.log(err);
            res.json(err);
          })
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
    res.json("still testing")
  })

router.route("/:id")
  .delete((req, res) => {
    db.Channel
      .deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("../bot/restart")
      })
      .catch(err => {
        console.log("##### delete /api/channel/:id");
        console.log(err);
        res.json("Error deleting message");
      })
  })

module.exports = router;