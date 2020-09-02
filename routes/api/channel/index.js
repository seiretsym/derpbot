const router = require("express").Router();
const db = require("../../../models");

router.route("/getReactions/:id")
  .get((req, res) => {
    db.Channel.find({
      guild_id: req.params.id
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      })
  })

module.exports = router;