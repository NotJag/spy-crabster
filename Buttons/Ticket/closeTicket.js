const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    id: "closeTicket",

    async execute(interaction) {


        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('confirmedCloseTicket')
                    .setStyle('DANGER')
                    .setLabel('Close'),
                new MessageButton()
                    .setCustomId('deniedCloseTicket')
                    .setStyle('SECONDARY')
                    .setLabel('Cancel')
            )

        interaction.channel.send({
            embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Are you sure you would like to close this ticket?`)
            ], components: [row]
        })


    }
}