const router = require("express").Router();
import db from "../../../models";

router.route("/getReactions/:id")
  .get((req, res) => {
    db.Channel.find({
      guild_id: req.params.id
    })
      .then(({ data }) => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  })