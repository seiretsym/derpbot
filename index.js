require("dotenv").config();
const ytdl = require("ytdl-core");
const Discord = require("discord.js");
const client = new Discord.Client();
const playlist = [];

const play = (connection, message) => {
  if (connection.speaking.bitfield === 0) {
    const dispatcher = connection.play(ytdl(playlist[0], { filter: "audioonly" }), { type: "webm/opus" });
    const current = playlist.shift();

    // event listener to show which song is playing
    dispatcher.on("start", () => {
      message.channel.send("Now Playing: " + current);
    })
    // event listener to disconnect bot from channel after no more songs
    dispatcher.on("finish", () => {
      if (playlist[0]) {
        play(playlist[0], connection)
      }
      connection.disconnect();
    })
  } else {
    message.channel.send(playlist[playlist.length - 1] + " added to playlist.");
  }
}

client.login(process.env.DISCORD_ID);

client.once("ready", () => {
  console.log("Discord Bot Ready");

  client.on("message", async message => {
    if (message.content.slice(0, 1) === "!") {
      switch (message.content.slice(1, 2).toLowerCase()) {
        case 'p':
          // check if user is in a voice channel
          if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            // get audio path
            const path = message.content.slice(2, message.content.length).trim();
            console.log(path);

            // add song to playlist
            playlist.push(path);

            // play song
            play(connection, message);
          } else {
            // send reply that user is not in a channel
            console.log("no voice channel");
          }
          break;
        default:
          console.log("no command issued");
      }
    }
  })
})