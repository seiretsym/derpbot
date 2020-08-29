// dependencies
const express = require("express");
const session = require("express-session");
// const mongoose = require("mongoose");
const routes = require("./routes");

// middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// passport config
app.use(session({ secret: "derp", resave: true, saveUninitialized: true }));

// routing
app.use(routes);

// dev public asset
app.use(express.static("client/public"))

// mongoose db
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/derpbot";
// const configs = {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }
// mongoose.connect(MONGODB_URI, configs);

// start server
const PORT = process.env.PORT || 3377;
app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});