const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const DB = require("../../Structures/Schemas/ticketSystem");


module.exports = {
    id: "createTicket",

    async execute(interaction) {

        const { guild } = interaction

        let returnedData = await DB.findOne({
            GuildID: guild.id
        });


        const ticketCategory = returnedData.TicketCategory
        const ticketMessage = returnedData.TicketCreateMessage

        const ticketCheck = interaction.guild.channels.cache.find(channel => channel.name === `${interaction.user.id}s-ticket`)


        if (!ticketCheck) {

            interaction.reply({content: "Creating...", ephemeral: true})
            const ticketChannel = await interaction.guild.channels.create(`${interaction.user.id}s-ticket`, {
                type: 'GUILD_TEXT',
                parent: `${ticketCategory}`,
            })
            await ticketChannel.permissionOverwrites.create(interaction.member, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            })
            await ticketChannel.permissionOverwrites.create(interaction.guild.id, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
            })



            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('closeTicket')
                    .setStyle('DANGER')
                    .setEmoji('🔒')
                    .setLabel('Close')
            )


            ticketChannel.send({
                embeds: [sent = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor({name:"Ticket System"})
                    .setDescription(`${ticketMessage}`)
                    .setTimestamp()
                    .setFooter({ iconURL: `${guild.iconURL()}`, text: `${guild.name}` })
                ], content: `${interaction.user}`, components: [row]
            })
        }
        else {
            interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription("You already have a ticket open. Please be patient or close your previous ticket.")
                ], ephemeral: true
            })
        }
    }
}