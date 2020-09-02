require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

const introMessage = "Welcome. Blah blah blah. Please react to this message with the roles you want."
const introMessage2 = "Welcome. React for roles."
const roles = [{ emoji: "721260201520660501", role: "721258378017374208" }, { emoji: "721261843586482207", role: "721260440331485197" }, { emoji: "💜", role: "596740789392900097" }];
const guildId = "408504597880111114";
const reactChannel = "react-roles";
const channelId = "721258848119160833";
const messageId = "750479890930860062";

client.login(process.env.BOT_TOKEN);

client.once("ready", async () => {

  const guild = await client.guilds.fetch(guildId);
  const channel = await client.channels.fetch(channelId);
  const message = await channel.messages.fetch(messageId);

  client.guilds.fetch(guildId).then(guild => {
    client.channels.fetch(channelId).then(channel => {
      channel.messages.fetch(messageId).then(message => {
        client.on("messageReactionAdd", (reaction, user) => {
          if (reaction.message.id === message.id) {
            if (reaction._emoji.id) {
              for (let i = 0; i < roles.length; i++) {
                if (reaction._emoji.id === roles[i].emoji) {
                  guild.members.fetch(user.id).then(member => {
                    member.roles.add(roles[i].role).catch(err => {
                      console.log(err);
                    });
                  })
                }
              }
            } else {
              for (let i = 0; i < roles.length; i++) {
                if (reaction._emoji.name === roles[i].emoji) {
                  guild.members.fetch(user.id).then(member => {
                    member.roles.add(roles[i].role).catch(err => {
                      console.log(err);
                    });
                  })
                }
              }
            }
          }
        })
        client.on("messageReactionRemove", (reaction, user) => {
          if (reaction.message.id === message.id) {
            if (reaction._emoji.id) {
              for (let i = 0; i < roles.length; i++) {
                if (reaction._emoji.id === roles[i].emoji) {
                  guild.members.fetch(user.id).then(member => {
                    member.roles.remove(roles[i].role).catch(err => {
                      console.log(err);
                    });
                  })
                }
              }
            } else {
              for (let i = 0; i < roles.length; i++) {
                if (reaction._emoji.name === roles[i].emoji) {
                  guild.members.fetch(user.id).then(member => {
                    member.roles.remove(roles[i].role).catch(err => {
                      console.log(err);
                    });
                  })
                }
              }
            }
          }
        })
      })
    })
  })

  client.on("message", message => {
    if (message.content === introMessage) {
      roles.forEach(role => {
        message.react(role.emoji);
      })
    }
  })
});