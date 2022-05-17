const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    id: "deniedCloseTicket",

    async execute(interaction) {


        const reply = await interaction.channel.send({content:"Cancelling..."})
        await wait(2000)
        await interaction.message.delete()
        reply.delete()


    }
}