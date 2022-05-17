const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param { Client } client
     * @param {CommandInteraction} interaction
    */


    async execute(interaction, client) {

        const { guild } = interaction


        const command = client.commands.get(interaction.commandName);

        if (interaction.isCommand()) {


            if (!command) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription("<:crab_warning:975816587787530240> Sorry, an error has occured.")
                ]
            }) && client.commands.delete(interaction.commandName);

            if (interaction.channel.type === 'DM') return;

            if (!interaction.member.permissions.has(command.userPermissions || [])) return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`<:crab_warning:975816587787530240> Required permission: ${command.userPermissions}.`)
                ], ephemeral: true
            })


            command.execute(interaction, client)







        }




    }

}
