const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/customVc");

module.exports = {
    name: "vcconfig",
    description: "Configure Custom Voice Channels as an adminstrator.",
    userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: "on",
            description: "Toggle on and off.",
            type: 5,
            required: true,
        },
        {
            name: "channel",
            description: "Join to create channel.",
            type: 7,
            required: true,
        },
        {
            name: "category",
            description: "Category which Custom Voice Channels are created under.",
            type: 7,
            required: true,
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction, client) {


        const { options, member, guild, channel } = interaction;

        channelVar1 = interaction.options.getChannel("channel")
        channelVar2 = channelVar1.id
        channelVar3 = interaction.options.getChannel("category")
        channelVar4 = channelVar3.id
        onoroffVar1 = interaction.options.getBoolean("on")

        if (onoroffVar1 == true){
            interaction.reply({ embeds: [new MessageEmbed().setColor("GREEN").setDescription(`Custom VC's are enabled. You have chosen ${channelVar1} as your join to create channel and ${channelVar3} as your category.`).setTimestamp()], ephemeral: true })
            const DB_found = await DB.findOne({GuildID: guild.id});
            if(DB_found)await DB_found.updateOne({VcOn: true, VcCategoryId: channelVar4, VcChannelId: channelVar2});
            else await DB.create({GuildID: guild.id, VcOn: true, VcCategoryId: channelVar4, VcChannelId: channelVar2});
        }
        if(onoroffVar1 == false) {
            interaction.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`Custom VC's are now disabled.`).setTimestamp()], ephemeral: true })
            const DB_found = await DB.findOne({GuildID: guild.id});
            if(DB_found)await DB_found.updateOne({VcOn: false, VcCategoryId: channelVar4, VcChannelId: channelVar2});
            else await DB.create({GuildID: guild.id, VcOn: false, VcCategoryId: channelVar4, VcChannelId: channelVar2});

    }
    }
}