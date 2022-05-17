const client = require("../../Structures/index");
const { MessageEmbed } = require("discord.js");
const status = queue => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\``

client.distube

  .on("playSong", (queue, song) => queue.textChannel.send({
    embeds: [new MessageEmbed()
      .setAuthor({ name: "🎶 Music" })
      .setTitle("Now playing")
      .setDescription(`\`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
      .setColor('RANDOM')
      .setTimestamp()
    ]
  }))

  .on("addSong", (queue, song) => queue.textChannel.send({
    embeds: [new MessageEmbed()
      .setAuthor({ name: "🎶 Music" })
      .setTitle("Added Song")
      .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
      .setColor('RANDOM')
      .setTimestamp()
    ]
  }))

  .on("addList", (queue, playlist) => queue.textChannel.send({
    embeds: [new MessageEmbed()
      .setAuthor({ name: "🎶 Music" })
      .setTitle("Playlist added")
      .setDescription(`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
      .setColor('RANDOM')
      .setTimestamp()
    ]
  }
  ))

  .on("finish", queue => queue.textChannel.send({
    embeds: [new MessageEmbed()
      .setAuthor({ name: "🎶 Music" })
      .setTitle("Finished Queue")
      .setDescription("Now leaving")
      .setColor('RANDOM')
      .setTimestamp()]
  }))

  .on("error", (channel, e) => {
    channel.send(`${e}`)
  })


