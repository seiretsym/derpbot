const mongoose = require("mongoose");

// schema structure
const Schema = mongoose.Schema

// create schema
const ChannelSchema = new Schema({
  guild_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  channel_id: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  message_id: {
    type: String,
    required: true
  },
  reactions: [{
    type: String,
    required: true
  }],
  roles: [{
    type: String,
    required: true
  }]
})

// create model
const Channel = mongoose.model("Channel", ChannelSchema);

// export model
module.exports = Channel;