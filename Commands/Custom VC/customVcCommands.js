const { CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const { execute } = require("../../Events/Client/ready");

module.exports = {
    name: "vc",
    description: "Options for your custom VC.",
    options: [
        {
            name: "add",
            description: "Give a member access to your custom VC! This only affects the VC when in Restricted Mode.",
            type: 1,
            options: [{ name: "user", description: "Provide a user to add.", type: 6, required: true }]

        },

        {
            name: "remove",
            description: "Revoke a member access to your custom VC! This only affects the VC when in Restricted Mode.",
            type: 1,
            options: [{ name: "user", description: "Provide a user to remove.", type: 6, required: true }]

        },
        {
            name: "owner",
            description: "Give a member owner to your Custom VC! You wont be able to get it back!",
            type: 1,
            options: [{ name: "user", description: "Provide a user to promote.", type: 6, required: true }]

        },
        {
            name: "options",
            description: "⚙ Select an option",
            type: 1,
            options: [{
                name: "options", description: "Select an option.", type: 3, required: true,
                choices: [
                    { name: "Restrict your custom VC to the rest of the server.", value: "lock" },
                    { name: "Open your custom VC to the rest of the server.", value: "unlock" },
                    { name: "Delete this custom VC.", value: "del" },
                ]
            }]
        }
    ],
    /**
     * 
     * @param { CommandInteraction } interaction  
     */
    async execute(interaction) {
        try{
            const { options, member, guild, channel } = interaction;
            const VoiceChannel = member.voice.channel;
            const userbb = interaction.options.getUser('user');



            if (!VoiceChannel) {
                return interaction.reply({ content: "You must be in a voice channel.", ephemeral: true })
            }
            if (VoiceChannel.name !== `${interaction.user.tag}'s VC`) {

                return interaction.reply({ embeds: [new MessageEmbed().setColor("RED".setDescription("<:crab_warning:975816587787530240> You do not own this VC."))], ephemeral: true })
            }
            switch (options.getSubcommand()) {
                case "add": {

                    if (VoiceChannel.name == `${interaction.user.tag}'s VC`) {
                        VoiceChannel.permissionOverwrites.create(userbb, {
                            VIEW_CHANNEL: true,
                            CONNECT: true
                        })
                        return interaction.reply({
                            embeds: [new MessageEmbed()
                                .setColor("GREEN")
                                .setTimestamp()
                                .setDescription(`Added ${userbb} to your Custom VC.`)
                            ], ephemeral: true
                        })

                    }
                }
                case "remove": {

                    if (VoiceChannel.name == `${interaction.user.tag}'s VC`) {
                        VoiceChannel.permissionOverwrites.create(userbb, {
                            VIEW_CHANNEL: false,
                            CONNECT: false
                        })
                        const memberbb = interaction.guild.members.cache.get(userbb.id) || await interaction.guild.members.fetch(userbb.id, { cache: true });
                        memberbb.voice.disconnect()
                        return interaction.reply({
                            embeds: [new MessageEmbed()
                                .setColor("GREEN")
                                .setTimestamp()
                                .setDescription(`Removed ${userbb} from your Custom VC.`)

                            ], ephemeral: true
                        })

                    }
                }
                case "owner": {

                    if (VoiceChannel.name == `${interaction.user.tag}'s VC`) {
                        VoiceChannel.edit({ name: `${userbb.tag}'s VC` })
                        return interaction.reply({
                            embeds: [new MessageEmbed()
                                .setColor("GREEN")
                                .setTimestamp()
                                .setDescription(`Promoted ${userbb} in your Custom VC.`)

                            ], ephemeral: true
                        })

                    }
                }

                case "options": {
                    switch (options.getString("options")) {
                        case "lock":
                            if (VoiceChannel.name == `${interaction.user.tag}'s VC`) {
                                VoiceChannel.permissionOverwrites.create(interaction.user, {
                                    VIEW_CHANNEL: true,
                                    CONNECT: true
                                })
                                VoiceChannel.permissionOverwrites.create(guild.id, {
                                    VIEW_CHANNEL: false,
                                    CONNECT: false
                                })
                                return interaction.reply({
                                    embeds: [new MessageEmbed()
                                        .setColor("GREEN")
                                        .setTimestamp()
                                        .setDescription("Locked your Custom VC to the rest of the server.")

                                    ], ephemeral: true
                                })
                            }
                        case "unlock":
                            if (VoiceChannel.name == `${interaction.user.tag}'s VC`) {
                                VoiceChannel.permissionOverwrites.create(interaction.user, {
                                    VIEW_CHANNEL: true,
                                    CONNECT: true
                                })
                                VoiceChannel.permissionOverwrites.create(guild.id, {
                                    VIEW_CHANNEL: true,
                                    CONNECT: true
                                })
                                return interaction.reply({
                                    embeds: [new MessageEmbed()
                                        .setColor("GREEN")
                                        .setTimestamp()
                                        .setDescription("Opened your Custom VC to the rest of the server.")

                                    ], ephemeral: true
                                })

                            }
                        case "del":
                            if (VoiceChannel.name == `${interaction.user.tag}'s VC`) {
                                VoiceChannel.delete()
                                return interaction.reply({
                                    embeds: [new MessageEmbed()
                                        .setColor("RED")
                                        .setTimestamp()
                                        .setDescription("Deleting your Custom VC.")

                                    ], ephemeral: true
                                })

                            }

                    }
                }

            }
        }catch (error) { }
    }

}

