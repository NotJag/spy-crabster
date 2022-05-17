const { CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "shuffle",
    description: "Shuffle the music queue.",

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

        await queue.shuffle(VoiceChannel);
        return interaction.reply({ content: "🎶 Shuffled." })


    }
}