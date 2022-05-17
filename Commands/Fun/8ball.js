const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "8ball",
    description: "Ask the 8ball a question.",
    options: [
        {
            name: "question",
            description: "Question.",
            type: 3,
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const question = interaction.options.getString("question");
        const embed = new MessageEmbed();
        const messageChannel = client.channels.cache.get('927584592699990077');

        try {
            const response = await axios.get(`https://8ball.delegator.com/magic/JSON/${encodeURIComponent(question)}`);
            
            
            
            embed.setColor("RANDOM")
                .setTitle(`🎱 Magic 8 Ball 🎱`)
                .addFields(
                    {name: "Question", value: response.data.magic.question, inline: true},
                    {name: "Answer", value: `${response.data.magic.answer}.`, inline: true}
                )
                // .setFooter({ iconURL: `${interaction.user.avatarURL()}`, text: `Requested by ${interaction.user.tag}` })
                .setTimestamp();

        await interaction.reply({ embeds: [embed]});
        } catch (error) {

            messageChannel.send({embeds: [new MessageEmbed()

                .setTitle("⛔ Error!")
                .setColor("RED")
                .setDescription(`${error}`)
            ]})

        }
    }
}