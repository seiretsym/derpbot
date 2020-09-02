const router = require("express").Router();
const oauth2 = require("./oauth2");
const user = require("./user");
const guild = require("./guild");
const bot = require("./bot");
const channel = require("./channel");

// route to specific apis
router.use("/oauth2", oauth2);
router.use("/user", user);
router.use("/guild", guild);
router.use("/bot", bot);
router.use("/channel", channel);

module.exports = router;