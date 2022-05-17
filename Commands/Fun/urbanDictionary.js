const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const { execute } = require("../../Events/Client/ready");
const fetch = require('node-fetch');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);



module.exports = {
    name: "urban",
    description: "Search words with Urban Dictionary.",
    options: [
        {
            name: "word",
            description: "The word(s) you want to search.",
            type: 3,
            required: true,
        }
    ],
/**
 * 
 * @param { CommandInteraction } interaction  
 */

 async execute(interaction) {


     await interaction.reply('Fetching!')

     const term = interaction.options.getString('word');
		const query = new URLSearchParams({ term });

        nowordembed = new MessageEmbed()
        .setAuthor({ name:  "💬 Urban Dictionary!" })
		.setTitle("Word:")
        .setColor("#BA1DFA")
		.setTimestamp()
		.addField("Something went wrong!", `No results found for **${term}**.`)


        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        if (!list.length) {
			return interaction.editReply({content: " ", embeds: [nowordembed]});
		}
        const [answer] = list;

        gotwordembed = new MessageEmbed()
        .setAuthor({ name: "💬 Urban Dictionary!" })
		.setTitle(answer.word)
		.setColor('RANDOM')    
		.setTimestamp()
        .addFields(
            { name: 'Definition', value: trim(answer.definition, 1024) },
            { name: 'Example', value: trim(answer.example, 1024) },
            { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
        )

    interaction.editReply({ content: " ", embeds: [gotwordembed] });

    
}
}