const { CommandInteraction, MessageEmbed } = require("discord.js");
const VCDB = require("../../Structures/Schemas/customVc");
const TICKETDB = require("../../Structures/Schemas/ticketSystem");

module.exports = {
    name: "enabledisable",
    description: "Enable and disable modules.",
    userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: "customvc",
            description: "Toggle on and off.",
            type: 5,
            required: true,
        },
        {
            name: "ticketsystem",
            description: "Toggle on and off.",
            type: 5,
            required: true,

        },

    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction, client) {


        const { options, member, guild, channel } = interaction;

        onoroffVar1 = interaction.options.getBoolean("customvc")
        onoroffVar2 = interaction.options.getBoolean("ticketsystem")

        const VCDB_found = await VCDB.findOne({ GuildID: guild.id });
        if (VCDB_found) await VCDB_found.updateOne({ VcOn: onoroffVar1 });
        else await VCDB.create({ GuildID: guild.id, VcOn: onoroffVar1 });

        const TICKETDB_found = await TICKETDB.findOne({ GuildID: guild.id });
        if (TICKETDB_found) await TICKETDB_found.updateOne({ TicketStatus: onoroffVar2 });
        else await TICKETDB.create({ GuildID: guild.id, TicketStatus: onoroffVar2 });

        interaction.reply({ embeds: [new MessageEmbed().setColor("GREEN").setDescription(`True = enabled, False = disabled.\n\n**Custom VC's**: ${onoroffVar1}\n\n**Ticket System**: ${onoroffVar2}`)], ephemeral: true })

    }
}