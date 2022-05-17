const { CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "volume",
    description: "Adjust the volume of the music.",
    options: [
        {
            name: "percent",
            description: "Percentage which you want to adjust the volume to.",
            type: 4,
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


        const queue = await client.distube.getQueue(VoiceChannel); ``
        if (!queue)
            return interaction.reply({ content: "There is no music playing currently.", ephemeral: true });

        if (guild.me.voice.channelId !== member.voice.channelId) {
            return interaction.reply({ content: `I am playing music in <#${guild.me.voice.channelId}>. You cannot interact with the music commands unless you are in that Voice Channel.`, ephemeral: true })
        }

        const Volume = options.getInteger("percent");
        if (Volume > 100 || Volume < 1)
            return interaction.reply({ content: "Choose a percentage from 1 - 100.", ephemeral: true });

        client.distube.setVolume(VoiceChannel, Volume);
        return interaction.reply({content: `🔊 Volume has been set to \`${Volume}%\`.`});
   
    }
}