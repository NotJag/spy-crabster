const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require("axios");
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);


module.exports = {
    name: "lyrics",
    description: "Fetches music lyrics.",
    options: [
        {
            name: "song",
            description: "Title of the song.",
            type: 3,
            required: true,
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {

      
        try{
        

        const songTitle = interaction.options.getString('song');

        const url = await axios.get(`https://some-random-api.ml/lyrics?title=${songTitle}`)

        const embed = new MessageEmbed()
        .setAuthor({ name: "🎶 Lyrics!" })
        .setTitle("Searching...")
        .setDescription(
            
            `**Author:** ${url.data.author}`
            +
            `\n\n`
            +
            `**Song Name:** ${url.data.title}`
            +
            `\n\n`
            +
            `**Lyrics:**\n\n\`${url.data.lyrics}\``
        
        )

        .setColor("#BA1DFA")
        .setTimestamp()


        return interaction.reply({ embeds: [embed] });
        
        }catch (error) {
            interaction.reply({embeds: [new MessageEmbed()
            .setColor("RED")
            .setDescription("⛔ No lyrics found for that search term. Try again with the author of the song in the name.")
            ], ephemeral: true})
        }
    }
}