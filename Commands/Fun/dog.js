const { CommandInteraction, MessageEmbed } = require("discord.js");
const apiKeyDog = "f2a1ab4a-4225-42d8-8a89-a0895fe388b0";
const fetch = require('node-fetch');

module.exports = {
    name: "dog",
    description: "Woof.",
    /**
     * 
     * @param { CommandInteraction } interaction  
     */


    async execute(interaction, client) {


        const messageChannel = client.channels.cache.get('927584592699990077');


        try {



            await interaction.reply("Fetching!");
            const fetchAPI = async () => {
                const response = await fetch("https://api.thedogapi.com/v1/images/search", {
                    method: "GET",
                    headers: { "x-api-key": apiKeyDog }
                })

                const jsonresp = await response.json();
                return await jsonresp[0].url;
            }
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("🐶 Woof")
                .setTimestamp()
            embed.setImage(await fetchAPI())
            await interaction.editReply({ content: " ", embeds: [embed] })
        } catch (error) {
            messageChannel.send({
                embeds: [new MessageEmbed()

                    .setTitle("⛔ Error!")
                    .setColor("RED")
                    .setDescription(`${error}`)


                ]
            })
        }

    }
}




