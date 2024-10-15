const { Events } = require('discord.js');
const { db } = require('../server');

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    execute: async (leavingMember) => {
        const loggingFind = await db.query(
            `SELECT leaving_channelDestination FROM loggings WHERE guildId=?`,
            [leavingMember.guild.id]
        )

        if (loggingFind[0][0] != undefined) {
            const channelId_Leaving = loggingFind[0]['leaving_channelDestination'];
            if (channelId_Leaving == null) return;

            const leavingChannel = leavingMember.guild.channels.cache.get(channelId_Leaving);
            if (!leavingChannel) {
                return await db.query(
                    `UPDATE loggings SET leaving_channelDestination=?`,
                    [null]
                )
            } else {
                if (!leavingMember.guild.members.me.permissionsIn(channelId_Leaving).has(['SendMessages', 'ViewChannel']) | leavingMember.user.bot) return;

                return leavingChannel.send({
                    content: [`${leavingMember.user.toString()} left the server.`]
                });
            }
        }
    }
};