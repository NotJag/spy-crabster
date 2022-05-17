const { CommandInteraction, MessageEmbed} = require("discord.js");
const apiKeyCat = "0166e682-55aa-409c-b13f-2b1eb5939abf";
const fetch = require('node-fetch');



module.exports = {
    name: "cat",
    description: "Meow.",
/**
 * 
 * @param { CommandInteraction } interaction  
 */
 async execute(interaction) {
	

    await interaction.reply("Fetching!");
	const fetchAPI = async () => {
		const response = await fetch("https://api.thecatapi.com/v1/images/search", {
			method :"GET",
			headers: {"x-api-key": apiKeyCat}
		})
	
		const jsonresp = await response.json();
		return await jsonresp[0].url;
	}
const embed = new MessageEmbed()
.setColor("RANDOM")
.setTitle(":cat: Meow")
.setTimestamp()
embed.setImage(await fetchAPI())
await interaction.editReply({content: " ", embeds : [embed]})

    
}
}