const {
    MessageEmbed,
    CommandInteraction
} = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "giveaway",
    description: "A complete giveaway system.",
    userPermissions: ["ADMINISTRATOR"],
    options: [{
        name: "start",
        description: "Start a giveaway.",
        type: 1,
        options: [{
            name: "duration",
            description: "Provide a duration for this giveaway. Example [1m. 1h, 1d]",
            type: 3,
            required: true,
        }, {
            name: "winners",
            description: "Provide the wanted amount of winners for this giveaway.",
            required: true,
            type: 4,
        }, {
            name: "prize",
            description: "Provide the name of the prize.",
            required: true,
            type: 3,
        }, {
            name: "channel",
            description: "Select a channel to send the giveaway message to.",
            type: 7,
            channelTypes: 0,
        }]
    }, {
        name: "actions",
        description: "Options for the giveaway.",
        type: 1,
        options: [{
            name: "options",
            description: "Select an option",
            required: true,
            type: 3,
            choices: [{
                name: "end",
                value: "end"
            }, {
                name: "pause",
                value: "pause"
            }, {
                name: "un-pause",
                value: "un-pause"
            }, {
                name: "re-roll",
                value: "re-roll"
            }, {
                name: "delete",
                value: "delete"
            }, ]
        }, {
            name: "message-id",
            description: "Provide the message ID of the giveaway.",
            type: 3,
            required: true
        }]
    }],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const {
            options
        } = interaction;
        const Sub = options.getSubcommand();
        const errorEmbed = new MessageEmbed().setColor("RED");
        const successEmbed = new MessageEmbed().setColor("GREEN");
        try {
            switch (Sub) {
                case "start": {
                    const gchannel = options.getChannel("channel") || interaction.channel;
                    const duration = options.getString("duration");
                    const winnerCount = options.getInteger("winners");
                    const prize = options.getString("prize");
                    client.giveawaysManager.start(gchannel, {
                        duration: ms(duration),
                        winnerCount,
                        prize,
                        lastChance: {
                            enabled: true,
                            content: '❗ **LAST CHANCE TO ENTER !** ❗',
                            threshold: 5000,
                            embedColor: '#FF0000'
                        },
                        messages: {
                            giveaway: "🎉 **Giveaway Started!** 🎉",
                            hostedBy: 'Hosted by: {this.hostedBy}',
                            giveawayEnded: "<:crab_warning:975816587787530240> **Giveaway Ended!** <:crab_warning:975816587787530240>",
                            winMessage: '🎉 Congratulations, {winners}! You won **{this.prize}**! 🎉',
                        }
                    }).then(async () => {
                        successEmbed.setDescription("Giveaway was started successfully!")
                        return interaction.reply({
                            embeds: [successEmbed],
                            ephemeral: true
                        });
                    }).catch((err) => {
                        errorEmbed.setDescription(`<:crab_warning:975816587787530240> Sorry, an error has occured.\n\`${err}\``)
                        return interaction.reply({
                            embeds: [errorEmbed],
                            ephemeral: true
                        });
                    })
                }
                break;
            case "actions": {
                const choice = options.getString("options");
                const messageId = options.getString("message-id");
                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);
                if (!giveaway) {
                    errorEmbed.setDescription(`Unable to find the giveaway with the message ID: ${messageId} in this server.`)
                    return interaction.reply({
                        embeds: [errorEmbed],
                        ephemeral: true
                    })
                }
                switch (choice) {
                    case "end": {
                        client.giveawaysManager.end(messageId).then(() => {
                            successEmbed.setDescription("Giveaway has been ended.")
                            return interaction.reply({
                                embeds: [successEmbed],
                                ephemeral: true
                            })
                        }).catch((err) => {
                            errorEmbed.setDescription(`<:crab_warning:975816587787530240> Sorry, an error has occured.\n\`${err}\``)
                            return interaction.reply({
                                embeds: [errorEmbed],
                                ephemeral: true
                            });
                        });
                    }
                    break;
                case "pause": {
                    client.giveawaysManager.pause(messageId).then(() => {
                        successEmbed.setDescription("Giveaway has been paused.")
                        return interaction.reply({
                            embeds: [successEmbed],
                            ephemeral: true
                        })
                    }).catch((err) => {
                        errorEmbed.setDescription(`<:crab_warning:975816587787530240> Sorry, an error has occured.\n\`${err}\``)
                        return interaction.reply({
                            embeds: [errorEmbed],
                            ephemeral: true
                        });
                    });
                }
                break;
                case "un-pause": {
                    client.giveawaysManager.unpause(messageId).then(() => {
                        successEmbed.setDescription("Giveaway has been un-paused.")
                        return interaction.reply({
                            embeds: [successEmbed],
                            ephemeral: true
                        })
                    }).catch((err) => {
                        errorEmbed.setDescription(`<:crab_warning:975816587787530240> Sorry, an error has occured.\n\`${err}\``)
                        return interaction.reply({
                            embeds: [errorEmbed],
                            ephemeral: true
                        });
                    });
                }
                break;
                case "re-roll": {
                    client.giveawaysManager.reroll(messageId, {
                            messages: {
                                congrat: ':tada: New winner(s): {winners}! Congratulations, you won **{this.prize}**! :tada:',
                                error: 'No valid participations, no new winner(s) can be chosen!'
                            }
                        })
                        // client.giveawaysManager.reroll(messageId)
                        .then(() => {
                            successEmbed.setDescription("Giveaway has been re-rolled.")
                            return interaction.reply({
                                embeds: [successEmbed],
                                ephemeral: true
                            })
                        }).catch((err) => {
                            errorEmbed.setDescription(`<:crab_warning:975816587787530240> Sorry, an error has occured.\n\`${err}\``)
                            return interaction.reply({
                                embeds: [errorEmbed],
                                ephemeral: true
                            });
                        });
                }
                break;
                case "delete": {
                    client.giveawaysManager.delete(messageId).then(() => {
                        successEmbed.setDescription("Giveaway has been deleted.")
                        return interaction.reply({
                            embeds: [successEmbed],
                            ephemeral: true
                        })
                    }).catch((err) => {
                        errorEmbed.setDescription(`<:crab_warning:975816587787530240> Sorry, an error has occured.\n\`${err}\``)
                        return interaction.reply({
                            embeds: [errorEmbed],
                            ephemeral: true
                        });
                    });
                }
                break;
                }
            }
            break;
            defualt: {
                console.log("Error in giveaway command.")
            }
            }
        } catch (error) {}
    }
}