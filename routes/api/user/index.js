const router = require("express").Router();
const axios = require("axios");
const db = require("../../../models");

router.route("/getGuilds")
  .get((req, res) => {
    if (req.session.user) {
      axios.get("https://discord.com/api/users/@me/guilds", {
        headers: {
          "Authorization": `${req.session.user.token_type} ${req.session.user.access_token}`
        }
      }).then(async ({ data }) => {
        data = data.filter(guild => (((guild.permissions & 0x8) === 8) || ((guild.permissions & 0x20) === 32)))
        const newdata = Promise.all(data.map(async guild => {
          const data = Object.assign({}, guild);
          const match = await db.Guild.find({ guild_id: guild.id })
          if (match.length > 0) {
            data.added = true;
          }
          return Promise.resolve(data);
        }))
          .then(data => {
            res.json(data);
          })
      })
    } else {
      console.log("not authed")
      res.json("nope")
    }
  })

module.exports = router;