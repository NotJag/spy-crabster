const { MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/ticketSystem");
const { createTranscript } = require("discord-html-transcripts")

const wait = require('node:timers/promises').setTimeout;

module.exports = {
    id: "confirmedCloseTicket",

    async execute(interaction, client) {

        interaction.channel.send({content:"Deleting the ticket in a couple of seconds... You will recieve a copy of the transcript."})


        const attachment = await createTranscript(interaction.channel,{
            limit: -1,
            returnBuffer: false,
            fileName: `${interaction.channel.name}.html`
        } )

        

        interaction.user.send({embeds: [new MessageEmbed()
        .setColor("GREEN")
        .setAuthor({name: "Ticket Transcript"})
        .setDescription("Thank you for creating a ticket. Please find the transcript attached.")
        .setFooter({ iconURL: `${interaction.guild.iconURL()}`, text: `${interaction.guild.name}` })
        ], files: [attachment]})


        const { guild } = interaction

        let retrievedData = await DB.findOne({
            GuildID: guild.id
        });

        let ticketLog = retrievedData.TicketLogChannel
        const ticketLogFetched = client.channels.cache.get(`${ticketLog}`);
        n = interaction.channel.name.length
        ticketUser1 = interaction.channel.name.substring(0, n-8)
        ticketUser2 = `<@${ticketUser1}>'s ticket`
        ticketLogFetched.send({ embeds: [new MessageEmbed()
        .setFooter({ iconURL: `${interaction.guild.iconURL()}`, text: `${interaction.guild.name}` })
        .setAuthor({name: "Ticket System"})
        .setDescription(`${ticketUser2} has been closed. Please find the transcript attached.`)
        ], files: [attachment] })
    

        await wait(2000)
        interaction.channel.delete()

    }
}