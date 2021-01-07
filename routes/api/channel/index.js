const router = require("express").Router();
const db = require("../../../models");
const axios = require("axios");
require("dotenv").config();
const headers = {
  headers: {
    "Authorization": `Bot ${process.env.BOT_TOKEN}`
  }
}

router.route("/getReactions/:id")
  .get((req, res) => {
    // get server's saved reactions from database
    db.Channel.find({
      guild_id: req.params.id
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log("##### get /api/channel/getReactions/:id");
        console.log(err);
        res.json("Error retrieving emojis from db");
      })
  })

// not being used at the moment
router.route("/editReaction/:id")
  .put((req, res) => {
    console.log(req.body)
    axios.patch(`https://discord.com/api/channels/${req.body.channel_id}/messages/${req.body.message_id}`, {
      content: req.body.message
    }, headers)
      .then(() => {
        // update db
        db.Channel.updateOne({
          message_id: req.body.message_id,
          guild_id: req.body.guild_id,
          channel_id: req.body.channel_id
        }, {
          $set: req.body
        }).then(() => {
          res.json("updated");
          axios.get(`https://discord.com/api/channels/${req.body.channel_id}/messages/${req.body.message_id}`, headers).then(({ data }) => {
            const existingReactions = data.reactions;
            const newReactions = req.body.reactions;
            console.log(existingReactions);
            console.log(newReactions);
            newReactions.forEach((reaction, i) => {
              if (existingReactions.findIndex(element => element.emoji.id === reaction) < 0) {
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
                }, 2000 * i)
              }
              if (existingReactions.length > newReactions.length) {
                existingReactions.forEach((reaction, j) => {
                  const rName = reaction.emoji.id || encodeURI(reaction.emoji.name);
                  let urlComponent = "";
                  if (!isNaN(rName)) {
                    urlComponent = "name:"
                  }
                  setTimeout(function () {
                    if (newReactions.indexOf(rName) < 0) {
                      axios.delete(`https://discord.com/api/channels/${req.body.channel_id}/messages/${req.body.message_id}/reactions/${urlComponent}${rName}`, headers)
                        .then(() => {
                          if (j === existingReactions.length - 1) {
                            res.redirect("/api/bot/restart");
                          }
                        })
                        .catch(err => {
                          console.log(err);
                          res.json("uh oh")
                        })
                    }
                  }, (2000 * j))
                })
              }
            })
          }).catch(err => {
            console.log(err);
            res.json(err)
          })

        }).catch(() => {
          console.log("something broke");
          res.json("qq")
        })

      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  })

// delete a reactrole set up on a server, doesn't delete the bot message, though.
router.route("/:id")
  .delete((req, res) => {
    // remove configuration from database,
    // so the bot stops service for that reactrole setup
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