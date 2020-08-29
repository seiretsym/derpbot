const router = require("express").Router();
const api = require("./api")

// api routes
router.use("/api", api);

module.exports = router;