const { CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "queue",
    description: "View the queue of Spy Crabster.",

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


        return interaction.reply({
            embeds: [new MessageEmbed()
                .setAuthor({ name: "🎶 Music" })
                .setColor('RANDOM')
                .setTimestamp()
                .setDescription(`${queue.songs.slice(0, 10).map(
                    (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)
                .setTimestamp()]
        })



    }
}