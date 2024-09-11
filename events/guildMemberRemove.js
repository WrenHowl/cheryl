const { Events } = require('discord.js');
const { db } = require('../server');

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    execute: async (leavingMember) => {
        db.query(`SELECT channelId_Leaving FROM blacklists WHERE guildId=?`,
            [leavingMember.guild.id]
        )
            .then(async (response) => {
                response = response[0];

                if (!response[0] == undefined) {

                    const channelId_Leaving = response['channelId_Leaving'];
                    if (channelId_Leaving === null) return;

                    const leavingChannel = leavingMember.guild.channels.cache.get(channelId_Leaving);

                    if (!leavingChannel) {
                        return db.query(`UPDATE loggings SET channelId_Leaving=?`,
                            [null]
                        )
                    } else {
                        if (!leavingMember.guild.members.me.permissionsIn(channelId_Leaving).has(['SendMessages', 'ViewChannel']) | leavingMember.user.bot) return;

                        return leavingChannel.send({
                            content: [`${leavingMember.user.toString()} left the server.`]
                        });
                    }

                }
            });
    }
};