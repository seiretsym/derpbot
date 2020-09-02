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

router.route("/:id")
  .delete((req, res) => {
    db.Channel
      .deleteOne({ _id: req.params.id })
      .then(() => {
        res.json("deleted");
      })
      .catch(err => {
        res.json(err);
      })
  })

module.exports = router;