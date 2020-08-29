const mongoose = require("mongoose");

// schema structure
const Schema = mongoose.Schema

// create schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  userid: {
    type: Number,
    required: true,
  },
  guilds: [{
    type: Schema.Types.ObjectId,
    ref: "Guild"
  }]
})

// create model
const User = mongoose.model("User", UserSchema);

// export model
module.exports = User;