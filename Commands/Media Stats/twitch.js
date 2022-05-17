const { CommandInteraction, MessageEmbed } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: "twitch",
    description: "Shows Twitch Stats.",
    options: [
        {
            name: "user",
            description: "User to fetch information for.",
            type: 3,
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction) {
        const { options, member, guild, channel } = interaction;
        const channelName = options.getString("user");


        if (!channelName)
            return interaction.reply({ content: "Please provide a Twitch channel name.", ephermeral: true });

        const Response = await superagent.get(`https://api.crunchprank.net/twitch/followcount/${channelName.toLowerCase()}`);
        const upTime = await superagent.get(`https://api.crunchprank.net/twitch/uptime/${channelName.toLowerCase()}`);
        const totalViews = await superagent.get(`https://api.crunchprank.net/twitch/total_views/${channelName.toLowerCase()}`);
        const accountage = await superagent.get(`https://api.crunchprank.net/twitch/creation/${channelName.toLowerCase()}`);
        const lastGame = await superagent.get(`https://api.crunchprank.net/twitch/game/${channelName.toLowerCase()}`);


        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setTitle(`${channelName}'s Twitch Stats`)
            .setDescription(`💟 **Followers**: ${Response.text} \n👀 **Views**: ${totalViews.text}\n📝 **Created at**: ${accountage.text}  \n⏮️ **Last Game**: ${lastGame.text} \n🟣 **Live**: ${upTime.text}`)
            .setURL(`https://twitch.tv/${channelName}`)
            .setThumbnail("https://pngimg.com/uploads/twitch/twitch_PNG27.png")
        interaction.reply({ embeds: [embed] });
        if (upTime.text === `${channelName} is offline`) {
            upTime.text = "Offline";
        }
    }
}