const db = require("../models");

// defining methods used for guild queries
module.exports = {
  addGuild: (req, res) => {
    db.Guild
      .create(req.body)
      .then(data => {
        console.log("Guild added: ", data);
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      })
  }
};