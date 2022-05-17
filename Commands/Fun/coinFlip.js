const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

const answers = [
    `The coin lands on heads!`,
    `Tails is the winner!`,
    `Heads it is!`,
    `The coin lands on tails!`,
    `Heads is the winner!`,
    `Tails!`,
    `Heads!`,
    `Tails it is!`,
];

module.exports = {
  name: "coinflip",
  description: "Heads or tails?",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const user = interaction.member;
    await user.user.fetch();

    const coin = answers[Math.floor(Math.random() * answers.length)]
    const output = (`<@${user.user.id}>, ${coin}`);
    interaction.reply({embeds: [new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("🪙 Flipping a coin!")
    .setDescription(`${output}`)
    .setTimestamp()
  ]})
  }


  
}