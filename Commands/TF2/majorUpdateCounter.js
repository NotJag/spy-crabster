const { CommandInteraction, MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "majorupdatecountdown",
    description: "Displays the amount of time since Jungle Inferno update :(.",

    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("How many days since the Jungle Inferno update?")
        .setDescription(`<t:${parseInt("1508483288")}:R>...`)
        .setTimestamp()

        interaction.reply({ embeds: [embed] });
        
    }
}