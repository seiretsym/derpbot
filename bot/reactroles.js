require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const EventEmitter = require("events");

const events = [];
const roles = ["748994178788229191"];
let reactions = ["%F0%9F%98%83"];
const guildId = "748775509856485438";
const channelId = "748994479704375318";
const messageId = "750963894171992064";
reactions = reactions.map(reaction => decodeURIComponent(reaction));
client.login(process.env.BOT_TOKEN);

client.once("ready", async () => {
  const guild = await client.guilds.fetch(guildId);
  const channel = await client.channels.fetch(channelId);
  const message = await channel.messages.fetch(messageId);

  console.log(guild);

  function startReactionRemoveBot(reaction, user) {
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

  function startReactionAddBot(reaction, user) {
    if (reaction.message.id === message.id) {
      if (reaction._emoji.id) {
        for (let i = 0; i < roles.length; i++) {
          if (reaction._emoji.id === reactions[i]) {
            guild.members.fetch(user.id).then(member => {
              member.roles.add(roles[i]).catch(err => {
                console.log(err);
              });
            })
          }
        }
      } else {
        for (let i = 0; i < roles.length; i++) {
          if (reaction._emoji.name === reactions[i]) {
            guild.members.fetch(user.id).then(member => {
              member.roles.add(roles[i]).catch(err => {
                console.log(err);
              });
            })
          }
        }
      }
    }
  }

  events.push(() => client.on("messageReactionAdd", startReactionAddBot))
  events.push(() => client.on("messageReactionRemove", startReactionRemoveBot))
  events.forEach(event => event())
  console.log(EventEmitter.on())
  client.off("messageReactionRemove", startReactionRemoveBot)
});