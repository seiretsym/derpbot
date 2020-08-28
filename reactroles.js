require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

const introMessage = "Welcome. Blah blah blah. Please react to this message with the roles you want."
const introMessage2 = "Welcome. React for roles."
const roles = [{ emoji: "❤️", role: "748994228570423297" }, { emoji: "💚", role: "748994178788229191" }, { emoji: "💜", role: "748994262896738364" }];
const guildId = "748775509856485438";
const reactChannel = "react-roles";

client.login(process.env.DISCORD_ID);

client.once("ready", () => {
  client.channels.cache.map(channel => {
    if (channel.name === reactChannel) {
      channel.messages.fetch().then(messages => {
        let counter = 0;
        let messageId;
        messages.map(message => {
          if (!message.deleted && message.author.bot) {
            counter++;
            messageId = message.id;
          }
        })
        if (counter === 0) {
          channel.send(introMessage);
        }
      })
    }
  })

  client.on("message", message => {
    if (message.content === introMessage) {
      roles.forEach(role => {
        message.react(role.emoji);
      })
    }
  })
});