require("dotenv").config();
const path = require("path");
const router = require("express").Router();
const axios = require("axios");
const qs = require("querystring");

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
    }).then(response => {
      req.session.user = response.data;
      res.sendFile(path.join(__dirname, "../../../pages/redirect.html"));
    }).catch(err => {
      res.json(err);
    })
  })

router.route("/discord-botadd")
  .get((req, res) => {
    console.log("query: ", req.query);
    console.log("body: ", req.body);
    res.json(req);
  })

module.exports = router;