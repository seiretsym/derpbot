const router = require("express").Router();
const api = require("./api")
const path = require("path")

// api routes
router.use("/api", api);

if (process.env.NODE_ENV === "production") {
  router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  })
}

module.exports = router;