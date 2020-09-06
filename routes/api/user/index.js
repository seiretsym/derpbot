const router = require("express").Router();
const axios = require("axios");
const db = require("../../../models");

// route for getting an authenticated user's servers
router.route("/getGuilds")
  .get((req, res) => {
    if (req.session.user) {
      // use discord api to retrieve info
      axios.get("https://discord.com/api/users/@me/guilds", {
        headers: {
          "Authorization": `${req.session.user.token_type} ${req.session.user.access_token}`
        }
      }).then(async ({ data }) => {
        // filter data by server permissions, so only servers where the user
        // has admin/manager server permissions are stored
        data = data.filter(guild => (((guild.permissions & 0x8) === 8) || ((guild.permissions & 0x20) === 32)))

        // check if derp bot has already been added to server
        Promise.all(data.map(async guild => {
          const data = Object.assign({}, guild);
          const match = await db.Guild.find({ guild_id: guild.id })
          if (match.length > 0) {
            // set flag to true if it has been added
            data.added = true;
          }
          return Promise.resolve(data);
        }))
          .then(data => {
            res.json(data);
          })
      }).catch(err => {
        console.log("##### get discord/api/users/@me/guilds");
        console.log(err);
        res.json("Error retrieving user's servers");
      })
    } else {
      res.json("nope")
    }
  })

module.exports = router;