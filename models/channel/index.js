const mongoose = require("mongoose");

// schema structure
const Schema = mongoose.Schema

// create schema
const ChannelSchema = new Schema({
  guild_id: {
    type: Schema.Types.ObjectId,
    ref: "Guild",
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  channel_id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  reactions: [{
    type: Number
  }],
  roles: [{
    type: Number
  }]
})

// create model
const Channel = mongoose.model("Channel", ChannelSchema);

// export model
module.exports = Channel;