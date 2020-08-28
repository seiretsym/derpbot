// dependencies
const express = require("express");
// const mongoose = require("mongoose");
// const routes = require("./routes");

// middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for heroku & react
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// routing
// app.use(routes);

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