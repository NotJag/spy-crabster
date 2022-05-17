const { CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "loop",
    description: "Loop a song or the queue.",

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction, client) {


        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel)
            return interaction.reply({ content: "You must be in a voice channel.", ephemeral: true })

        const queue = await client.distube.getQueue(VoiceChannel); ``
        if (!queue)
            return interaction.reply({ content: "There is no music playing currently.", ephemeral: true });

        if (guild.me.voice.channelId !== member.voice.channelId) {
            return interaction.reply({ content: `I am playing music in <#${guild.me.voice.channelId}>. You cannot interact with the music commands unless you are in that Voice Channel.`, ephemeral: true })
        }

        let Mode2 = await client.distube.setRepeatMode(queue);
        return interaction.reply({content: `🎶 Repeat Mode is set to: ${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}.`})   

    }
}