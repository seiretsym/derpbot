const router = require("express").Router();
const oauth2 = require("./oauth2");
const user = require("./user");

// route to specific apis
router.use("/oauth2", oauth2);
router.use("/user", user);

module.exports = router;