const { CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "serverinfo",
    description: "Displays information on the server executed.",
/**
 * 
 * @param { CommandInteraction } interaction  
 */

 async execute(interaction, client) {

    const messageChannel = client.channels.cache.get('927584592699990077');
try{

    const { guild } = interaction 
    const Embed = new MessageEmbed()
    .setColor("F4273C")
    .addFields(
      {
        name: `📜 | GENERAL`,
        value: [
          `Name: ${guild.name}`,
          `ID: ${guild.id}`,
          `Created: ${guild.createdAt.toLocaleString("fr-FR")} || <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
          `Owner: <@${guild.ownerId}>`,
          `Description: \`${guild.description || "None"}\``,
          ` `
        ].join("\n")
      },
      {
        name: `🤵 | USERS`,
        value: [
          `Members: ${guild.members.cache.filter((m) => !m.user.bot).size}`,
          `Bots: ${guild.members.cache.filter((m) => m.user.bot).size}`,
          `Total: ${guild.memberCount}`,
          ` `
        ].join("\n")
      },
      {
        name: `ROLES`,
        value: [
          `Roles: ${guild.roles.cache.size}`,
          `List: ${guild.roles.cache.map(r => r).sort((a, b) => b.position - a.position).join(" ") || "None"}`,
          ` `
        ].join("\n")
      },
      {
        name: `📔 | CHANNELS`,
        value: [
          `Text channels: ${guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}`,
          `Voice channels: ${guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}`,
          `Threads channels: ${guild.channels.cache.filter((c) => c.type === "GUILD_PUBLIC_THREAD" && "GUILD_PRIVATE_THREAD" && "GUILD_NEWS_THREAD").size}`,
          `Categories: ${guild.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}`,
          `Stage: ${guild.channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}`,
          `News: ${guild.channels.cache.filter((c) => c.type === "GUILD_NEWS").size}`,
          `Total: ${guild.channels.cache.size}`,
          ` `
        ].join("\n")
      },
      {
        name: `😄 | EMOJIS & STICKERS`,
        value: [
          `Animated: ${guild.emojis.cache.filter((c) => c.animated).size}`,
          `Static: ${guild.emojis.cache.filter((c) => !c.animated).size}`,
          `Stickers: ${guild.stickers.cache.size}`,
          `Total: ${guild.stickers.cache.size + guild.emojis.cache.size}`,
          ` `
        ].join("\n")
      },
      {
        name: `✨ | NITRO STATISTICS`,
        value: [
          `Tier: ${guild.premiumTier.replace("TIER_", "") ? "NONE" : ""}`,
          `Boosts: ${guild.premiumSubscriptionCount}`,
          `Boosters: ${guild.members.cache.filter((m) => m.premiumSince).size}`,
          ` `
        ].join("\n")
      },

    )
    .setTimestamp();



    if (guild.iconURL() != null) {
        Embed.setThumbnail(`${guild.iconURL()}`)
    } else {
        Embed.setThumbnail('https://lh3.googleusercontent.com/_4zBNFjA8S9yjNB_ONwqBvxTvyXYdC7Nh1jYZ2x6YEcldBr2fyijdjM2J5EoVdTpnkA=w300')
    }

    if (guild.iconURL() != null) {
        Embed.setAuthor({ iconURL: `${guild.iconURL()}`, name: `${guild.name}`})

    } else {
        Embed.setAuthor({ iconURL: `https://lh3.googleusercontent.com/_4zBNFjA8S9yjNB_ONwqBvxTvyXYdC7Nh1jYZ2x6YEcldBr2fyijdjM2J5EoVdTpnkA=w300`, name: `${guild.name}`})
    
    }

  interaction.reply({ embeds: [Embed] })
     
}catch (error) {
	messageChannel.send({embeds: [new MessageEmbed()

		.setTitle("⛔ Error!")
		.setColor("RED")
		.setDescription(`${error}`)
	
	
	]})
}

 }
}