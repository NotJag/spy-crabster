const { ButtonInteraction, MessageEmbed } = require("discord.js")
module.exports = {
    name: "interactionCreate",

    /**
     * @param {ButtonInteraction} interaction
     */

    execute(interaction, client) {


        if (!interaction.isButton()) return;
        
        const Button = client.buttons.get(interaction.customId);

        if (Button.permission && !interaction.member.permissions.has(Button.permission))
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`<:crab_warning:975816587787530240> Required permission: ${Button.permission}.`)
                ], ephemeral: true
            })

        if (Button.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`<:crab_warning:975816587787530240> Required permission: OWNER ONLY}.`)
                ], ephemeral: true
            })

        Button.execute(interaction, client);
    }
}

