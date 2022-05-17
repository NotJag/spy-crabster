const { Message, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/customVc");
module.exports = {
    name: "voiceStateUpdate",
    async execute(oldState, newState) {
        // OLD STATE IS WHEN YOU LEAVE!!! I WILL NEED THIS FOR DELETING CHANNEL WHEN OWNER LEAVES!!
        // console.log(oldState.channelId) 

        const dbextract = newState.guild.id

        let returnedData = await DB.findOne({
            GuildID: dbextract
        });

        if (returnedData.VcOn == true) {

            const category = returnedData.VcCategoryId
            const join4 = newState.channelId
            try {
                if (oldState.channel.members.size == 0) {
                    const leave4 = oldState.channel.bitrate
                    if (leave4 == '67000') {
                        const delete4 = oldState.channel
                        delete4.delete()
                    }
                }
            } catch (error) { }
            if (join4 == `${returnedData.VcChannelId}`) {
                newState.guild.channels.create(`${newState.member.user.tag}'s VC`, {
                    type: 'GUILD_VOICE',
                    parent: `${category}`,
                    bitrate: '67_000'
                }).then(vc => {
                    newState.setChannel(vc);
                })
            }
        }
    }
}