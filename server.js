// dependencies
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");
const { Client, GatewayIntentBits } = require("discord.js");
const db = require("./models");

// bot functions
let client = "";

// start the bot
function startBot(data) {
  // create a new client to listen on
  // should probably handle this per server (work to do)
  client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers]
  });
  // login with bot
  client.login(process.env.BOT_TOKEN)
  // event listener: bot is logged in
  client.on("ready", () => {
    console.log(`Derp Bot servicing ${data.length} channels`)
    data.forEach(async event => {
      // grab specific guild, channel, and message via IDs
      // chain of tests in-case users delete discord server, channel, or message where react role is servicing
      let guild, channel, message;
      try {
        guild = await client.guilds.fetch(event.guild_id);
        try {
          channel = await client.channels.fetch(event.channel_id);
          try {
            message = await channel.messages.fetch(event.message_id);
          } catch (err) {
            // stop service and remove from database if any of the tests above fail
            console.log("Discord Channel Message not found. Removing service...");
            db.Channel.deleteOne({ _id: event._id })
              .then(() => console.log(`Service Removed: ${event._id}`));
          }
        } catch (err) {
          console.log("Discord Channel not found. Removing service...");
          db.Channel.deleteOne({ _id: event._id })
            .then(() => console.log(`Service Removed: ${event._id}`));
        }
      } catch (err) {
        console.log("Discord Server not found. Removing service...");
        db.Channel.deleteOne({ _id: event._id })
          .then(() => console.log(`Service Removed: ${event._id}`));
      }
      let reactions = event.reactions;
      const roles = event.roles;

      // decode URIs in reactions
      reactions = reactions.map(emoji => {
        if (isNaN(emoji)) {
          return decodeURIComponent(emoji)
        } else {
          return emoji
        }
      })

      // create event listeners for reactions
      client.on("messageReactionAdd", handleAddReaction)
      client.on("messageReactionRemove", handleRemoveReaction)

      // function for adding user role
      function handleAddReaction(reaction, user) {
        // check if reaction was for message sent by derp bot
        if (reaction.message.id === message.id) {
          // check if reaction is a custom emoji
          if (reaction._emoji.id) {
            for (let i = 0; i < roles.length; i++) {
              if (reaction._emoji.id === reactions[i]) {
                // if all checks out, grab user that reacted
                guild.members.fetch(user.id).then(member => {
                  // and set user's role
                  member.roles.add(roles[i]).catch(err => {
                    console.log("error adding user role for custom emoji");
                  });
                })
              }
            }
          } else {
            for (let i = 0; i < roles.length; i++) {
              if (reaction._emoji.name === reactions[i]) {
                guild.members.fetch(user.id).then(member => {
                  member.roles.add(roles[i]).catch(err => {
                    console.log("error adding user role for default emoji");
                  });
                })
              }
            }
          }
        }
      }

      // does the samething as handleAddReaction, but removing roles
      function handleRemoveReaction(reaction, user) {
        if (reaction.message.id === message.id) {
          if (reaction._emoji.id) {
            for (let i = 0; i < roles.length; i++) {
              if (reaction._emoji.id === reactions[i]) {
                guild.members.fetch(user.id).then(member => {
                  member.roles.remove(roles[i]).catch(err => {
                    console.log("Error removing user role for custom emoji");
                  });
                })
              }
            }
          } else {
            for (let i = 0; i < roles.length; i++) {
              if (reaction._emoji.name === reactions[i]) {
                guild.members.fetch(user.id).then(member => {
                  member.roles.remove(roles[i]).catch(err => {
                    console.log("Error removing user role for default emoji");
                  });
                })
              }
            }
          }
        }
      }
    })
  })
}

// middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for heroku & vue
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

// session config
app.use(session({ secret: "derp", resave: true, saveUninitialized: true }));

// routing
// bot routes
app.get("/api/bot/start", (req, res) => {
  // destroy old client
  if (client != "") {
    client.destroy();
  }
  db.Channel.find({}).then(data => {
    if (data.length > 0) {
      // start the damn bot
      startBot(data);
      console.log("Starting Bot")
      res.json("bot starting")
    } else {
      console.log("Cannot start bot without any channels to service.")
    }
  })
})
app.put("/api/bot/restart", (req, res) => {
  // destroy old client
  client.destroy();
  db.Channel.find({}).then(data => {
    if (data.length > 0) {
      // start the damn bot
      startBot(data);
      console.log("Restarting Bot")
      res.json("bot restarting")
    } else {
      console.log("Cannot start bot without any channels to service.")
    }
  })
})
app.use(routes);

// mongoose db
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/derpbot";
const configs = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(MONGODB_URI, configs);

// start server
const PORT = process.env.PORT || 3377;
app.listen(PORT, function () {
  console.log("App running on port " + PORT);
  // grab info from db for bot
  db.Channel
    .find({})
    .then(data => {
      // check if there are actually any channels to serve before starting bot
      if (data.length > 0) {
        startBot(data);
      } else {
        console.log("No bot services found.")
      }
    })
});