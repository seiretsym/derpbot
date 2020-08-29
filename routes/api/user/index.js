const router = require("express").Router();
const axios = require("axios");

router.route("/")
  .get((req, res) => {
    console.log(req.session);
    if (req.session.user) {
      axios.get("https://discord.com/api/users/@me", {
        headers: {
          "Authorization": `${req.session.user.token_type} ${req.session.user.access_token}`
        }
      }).then(({ data }) => {
        console.log(data);
        res.json(data);
      })
    } else {
      // redirect, probably
      console.log("not authed")
      res.json("nope")
    }
  })

router.route("/guilds")
  .get((req, res) => {
    if (req.session.user) {
      axios.get("https://discord.com/api/users/@me/guilds", {
        headers: {
          "Authorization": `${req.session.user.token_type} ${req.session.user.access_token}`
        }
      }).then(({ data }) => {
        res.json(data.filter(guild => (((guild.permissions & 0x8) === 8) || ((guild.permissions & 0x20) === 32))))
      })
    } else {
      console.log("not authed")
      res.json("nope")
    }
  })

router.route("/guilds/:id/members")
  .get((req, res) => {
    axios.get(`https://discord.com/api/guilds/${req.params.id}/members`, {
      headers: {
        "Authorization": `Bot ${process.env.BOT_TOKEN}`
      }
    }).then(({ data }) => {
      res.json(data);
    }).catch(err => {
      res.json(err);
    })
  })

router.route("/:arg1/:arg2/:arg3")
  .get((req, res) => {
    axios.get(`https://discord.com/api/${req.params.arg1}/${req.params.arg2}/${req.params.arg3}`, {
      headers: {
        "Authorization": `Bot ${process.env.BOT_TOKEN}`
      }
    }).then(({ data }) => {
      res.json(data)
    }).catch(err => {
      res.json(err)
    })
  })

module.exports = router;