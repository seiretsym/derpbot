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
      }).then(response => {
        console.log(response);
        res.json(response.data);
      })
    } else {
      // redirect, probably
      console.log("not authed")
      res.json("nope")
    }
  })

module.exports = router;