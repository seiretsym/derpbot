const mongoose = require("mongoose");

// schema structure
const Schema = mongoose.Schema

// create schema
const GuildSchema = new Schema({
  user_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  guild_id: {
    type: String,
    required: true,
  }
})

// create model
const Guild = mongoose.model("Guild", GuildSchema);

// export model
module.exports = Guild;