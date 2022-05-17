const { CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "play",
    description: "Play a song, supports Spotify playlists.",
    options: [
        {
            name: "song",
            description: "Name of the song / Spotify URL.",
            type: 3,
            required: true,
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction, client) {


        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel)
            return interaction.reply({ content: "You must be in a voice channel.", ephemeral: true })

        client.distube.play(VoiceChannel, interaction.options.getString("song"), { textChannel: channel, member: member });
        return interaction.reply({ content: "🎶 Request recieved."})
    }
}