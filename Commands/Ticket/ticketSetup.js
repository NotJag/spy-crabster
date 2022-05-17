const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/ticketSystem");

module.exports = {
    name: "ticketconfig",
    description: "Configure the Ticket System as an adminstrator.",
    userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: "on",
            description: "Toggle on and off.",
            type: 5,
            required: true,
        },
        {
            name: "message",
            description: "The message sent with the ticket create message.",
            type: 3,
            required: true,
        },
        {
            name: "category",
            description: "Category which tickets are created under.",
            type: 7,
            required: true,
        },
        {
            name: "createdmessage",
            description: "The message that will be sent in the ticket channel.",
            type: 3,
            required: true,
        },
        {
            name: "ticketlog",
            description: "The channel where logs will be sent.",
            type: 7,
            required: true,
        },

    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction, client) {


        const { options, member, guild, channel } = interaction;

        channelVar3 = interaction.options.getChannel("category")
        channelVar4 = channelVar3.id
        channelVar7 = interaction.options.getChannel("ticketlog")
        channelVar8 = channelVar7.id
        channelVar5 = interaction.options.getString("message")
        channelVar6 = interaction.options.getString("createdmessage")
        onoroffVar1 = interaction.options.getBoolean("on")

        if (onoroffVar1 == true) {
            interaction.reply({ embeds: [new MessageEmbed().setColor("GREEN").setDescription(`Ticket System is now enabled.\n**Message displayed on ticket create**: ${channelVar5}\n\n**Category which tickets are created under**: ${channelVar3}\n\n**Message which is sent in a new ticket**: ${channelVar6}\n\n**Ticket log channel**: ${channelVar7}`).setTimestamp()], ephemeral: true })
            const DB_found = await DB.findOne({ GuildID: guild.id });
            if (DB_found) await DB_found.updateOne({ TicketStatus: true, TicketCategory: channelVar4, TicketMessage: channelVar5, TicketCreateMessage: channelVar6, TicketLogChannel: channelVar8 });
            else await DB.create({ GuildID: guild.id, TicketStatus: true, TicketCategory: channelVar4, TicketMessage: channelVar5, TicketCreateMessage: channelVar6, TicketLogChannel: channelVar8 });
        }
        if (onoroffVar1 == false) {
            interaction.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`The ticket system is now disabled.`).setTimestamp()], ephemeral: true })
            const DB_found = await DB.findOne({ GuildID: guild.id });
            if (DB_found) await DB_found.updateOne({ TicketStatus: false, TicketCategory: channelVar4, TicketMessage: channelVar5, TicketCreateMessage: channelVar6, TicketLogChannel: channelVar8 });
            else await DB.create({ GuildID: guild.id, TicketStatus: false, TicketCategory: channelVar4, TicketMessage: channelVar5, TicketCreateMessage: channelVar6, TicketLogChannel: channelVar8 });

        }
    }
}