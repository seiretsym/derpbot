require("dotenv").config();
const ytdl = require("ytdl-core");
const Discord = require("discord.js");
const client = new Discord.Client();
const PREFIX = "!";
const playlist = [];

const play = (connection, message) => {
  console.log(connection.speaking);
  if (connection.speaking.bitfield === 0 || !connection.speaking.bitfield) {
    const dispatcher = connection.play(ytdl(playlist[0], { filter: "audioonly" }), { type: "webm/opus" });

    // event listener to show which song is playing
    dispatcher.on("start", () => {
      message.channel.send("Now Playing: " + playlist[0]);
    })
    // event listener to disconnect bot from channel after no more songs
    dispatcher.on("finish", () => {
      playlist.shift();
      if (playlist[0]) {
        play(connection, message);
      } else {
        connection.disconnect();
      }
    })
  } else {
    message.channel.send(playlist[playlist.length - 1] + " added to playlist.");
  }
}

client.login(process.env.DISCORD_ID);

client.once("ready", () => {
  console.log("Discord Bot Ready");

  client.on("message", async message => {
    const args = message.content.substring(PREFIX.length).split(" ");
    if (message.content.slice(0, 1) === PREFIX) {
      switch (args[0]) {
        case 'p':
          // check for 2nd argument
          if (args[1]) {
            // check if user is in a voice channel
            if (message.member.voice.channel) {
              const connection = await message.member.voice.channel.join();

              // add song to playlist
              playlist.push(args[1]);

              // play song
              play(connection, message);
            } else {
              // send reply that user is not in a channel
              message.channel.send("Please join a voice channel before requesting music.")
            }
          } else {
            // let user know they're missing input arguments
            message.channel.send("Invalid search term or link. *(e.g. !p the derp song)*");
          }
          break;
        case 'playlist':
          let response = "Playlist:";
          for (let i = 0; i < playlist.length; i++) {
            if (i === 0) {
              response += `\n${i}. ${playlist[i]} (Playing)`
            } else {
              response += `\n${i}. ${playlist[i]}`
            }
          }
          message.channel.send(response);
          break;
        default:
          message.channel.send("Invalid command. Please use !help to get a list of commands.")
      }
    }
  })
})