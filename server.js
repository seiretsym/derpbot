// dependencies
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");
const Discord = require("discord.js");
const db = require("./models");

// bot functions
const client = new Discord.Client();

// start the bot
function startBot(data) {
  // login with bot
  client.login(process.env.BOT_TOKEN)

  // event listener: bot is logged in
  client.once("ready", () => {
    data.forEach(async event => {
      const guild = await client.guilds.fetch(event.guild_id)
      const channel = await client.channels.fetch(event.channel_id)
      const message = await channel.messages.fetch(event.message_id)
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

      client.on("messageReactionAdd", handleAddReaction)
      client.on("messageReactionRemove", handleRemoveReaction)

      function handleAddReaction(reaction, user) {
        if (reaction.message.id === message.id) {
          if (reaction._emoji.id) {
            for (let i = 0; i < roles.length; i++) {
              if (reaction._emoji.id === reactions[i]) {
                guild.members.fetch(user.id).then(member => {
                  member.roles.add(roles[i]).catch(err => {
                    console.log("error");
                  });
                })
              }
            }
          } else {
            for (let i = 0; i < roles.length; i++) {
              if (reaction._emoji.name === reactions[i]) {
                guild.members.fetch(user.id).then(member => {
                  member.roles.add(roles[i]).catch(err => {
                    console.log("error");
                  });
                })
              }
            }
          }
        }
      }

      function handleRemoveReaction(reaction, user) {
        if (reaction.message.id === message.id) {
          if (reaction._emoji.id) {
            for (let i = 0; i < roles.length; i++) {
              if (reaction._emoji.id === reactions[i]) {
                guild.members.fetch(user.id).then(member => {
                  member.roles.remove(roles[i]).catch(err => {
                    console.log(err);
                  });
                })
              }
            }
          } else {
            for (let i = 0; i < roles.length; i++) {
              if (reaction._emoji.name === reactions[i]) {
                guild.members.fetch(user.id).then(member => {
                  member.roles.remove(roles[i]).catch(err => {
                    console.log(err);
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

// for heroku & react
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

// session config
app.use(session({ secret: "derp", resave: true, saveUninitialized: true }));

// routing
// bot routes
app.post("/api/bot/start", (req, res) => {
  db.Channel.find({}).then(data => {
    // start the damn bot
    startBot(data);
    res.json("bot starting")
  })
})
app.delete("/api/bot/restart", (req, res) => {
  client.destroy();
  db.Channel.find({}).then(data => {
    // start the damn bot
    startBot(data);
    res.json("bot restarting")
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
      startBot(data);
    })
});