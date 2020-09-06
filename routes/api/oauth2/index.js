require("dotenv").config();
const path = require("path");
const router = require("express").Router();
const axios = require("axios");
const qs = require("querystring");
const db = require("../../../models");

// Matches with "/api/oauth2/discord-callback"
router.route("/discord-callback")
  .get((req, res) => {
    const data = {
      'client_id': process.env.CLIENT_ID,
      'client_secret': process.env.CLIENT_SECRET,
      'grant_type': 'authorization_code',
      'code': req.query.code,
      'redirect_uri': process.env.REDIRECT_URI,
      'scope': 'identify email guilds'
    }
    axios.post("https://discord.com/api/oauth2/token", qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(({ data }) => {
      req.session.user = data;
      axios.get("https://discord.com/api/users/@me", {
        headers: {
          "Authorization": `${req.session.user.token_type} ${req.session.user.access_token}`
        }
      }).then(({ data }) => {
        req.session.user.id = data.id;
        res.sendFile(path.join(__dirname, "../../../pages/redirect.html"));
      }).catch(err => {
        console.log("##### get discord/api/users/@me");
        console.log(err);
        res.json("Error retrieving user info");
      })
    }).catch(err => {
      console.log("##### get /api/oauth2/discord-callback");
      console.log(err);
      res.json("Error authenticating");
    })
  })

router.route("/discord-botadd")
  .get((req, res) => {
    const { guild_id } = req.query;
    req.session.guild = guild_id;
    axios.get(`https://discord.com/api/guilds/${guild_id}`, {
      headers: {
        "Authorization": `Bot ${process.env.BOT_TOKEN}`,
      }
    })
      .then(({ data }) => {
        const guild = {
          user_id: req.session.user.id,
          name: data.name,
          guild_id: guild_id
        }
        db.Guild
          .create(guild)
          .then(data => {
            console.log("Guild added: ", data);
            res.sendFile(path.join(__dirname, "../../../pages/redirect.html"))
          })
          .catch(err => {
            console.log("##### db.Guild.create");
            console.log(err);
            res.json("Error saving discord server info");
          })
      }).catch(err => {
        console.log(`##### get discord/api/guilds/${guild_id}`);
        console.log(err);
        res.json("Error retrieving discord server info");
      });
  })

module.exports = router;