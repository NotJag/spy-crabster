const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const DB = require("../../Structures/Schemas/ticketSystem");

module.exports = {
    name: "ticket",
    description: "Ticket commands.",
    options: [
        {
            name: "options",
            description: "Select an option",
            type: 1,
            options: [{
                name: "options", description: "Select an option.", type: 3, required: true,
                choices: [
                    { name: "Send the ticket create message.", value: "createMessage" },
                    { name: "Delete this ticket.", value: "closeTicket" },
                ]
            }]
        }
    ],
    /**
     * 
     * @param { CommandInteraction } interaction  
     */
    async execute(interaction) {
        const { options, member, guild, channel } = interaction;

        try {
            switch (options.getSubcommand()) {

                case "options": {
                    switch (options.getString("options")) {
                        case "createMessage":

                            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                                return interaction.reply({
                                    embeds: [new MessageEmbed()
                                        .setColor("RED")
                                        .setDescription(`<:crab_warning:975816587787530240> Required permission: ADMINISTRATOR.`)
                                    ], ephemeral: true
                                })
                            }


                            let returnedData = await DB.findOne({
                                GuildID: guild.id
                            });


                            // try{
                            // const status = returnedData.TicketStatus
                            let message = returnedData.TicketMessage
                            // }

                            if (returnedData.TicketStatus == true) {

                                interaction.reply({
                                    embeds: [new MessageEmbed()
                                        .setColor("GREEN")
                                        .setDescription("Sending the ticket message.")
                                    ], ephemeral: true
                                })


                                const row = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setCustomId('createTicket')
                                            .setStyle('SUCCESS')
                                            .setEmoji('📨')

                                    )

                                return interaction.channel.send({
                                    embeds: [new MessageEmbed()
                                        .setColor("GREEN")
                                        .setAuthor({ name: "Open a ticket" })
                                        .setDescription(`${message}\n\nPlease click the button 📨 to open a ticket.`)
                                    ], components: [row]
                                })

                            }

                            else {
                                return interaction.reply({
                                    embeds: [new MessageEmbed()
                                        .setColor("RED")
                                        .setDescription(`<:crab_warning:975816587787530240> The ticket system is disabled.`)
                                    ]

                                })
                            }




                        case "closeTicket":

                            if (!interaction.channel.name.includes("ticket")) {
                                return interaction.reply({
                                    embeds: [new MessageEmbed()
                                        .setColor("RED")
                                        .setDescription(`<:crab_warning:975816587787530240> This is not a ticket channel.`)
                                    ], ephemeral: true
                                })
                            }
                            let deleteRow = new MessageActionRow()
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

                            interaction.reply({
                                embeds: [new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`Are you sure you would like to close this ticket?`)
                                ], components: [deleteRow]
                            })


                    }
                }

            }

        } catch (e) { }
    }

}

