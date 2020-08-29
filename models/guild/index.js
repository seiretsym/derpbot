const mongoose = require("mongoose");

// schema structure
const Schema = mongoose.Schema

// create schema
const GuildSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  id: {
    type: String,
    required: true,
  },
  channels: [{
    type: Number,
    required: true,
  }],
})

// create model
const Guild = mongoose.model("Guild", GuildSchema);

// export model
module.exports = Guild;