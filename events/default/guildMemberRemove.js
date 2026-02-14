const { Events } = require('discord.js');
const { db } = require('../../server');

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    execute: async (leavingMember) => {
        const request = await db.getConnection();

        // Send a message in the leaving channel mentionned.
        const guildSettingFind = await request.query(
            `SELECT * FROM guild_settings WHERE id=?`,
            [
                leavingMember.guild.id
            ]
        )

        switch (true) {
            case typeof guildSettingFind[0][0] === "undefined":
                break;
            case typeof guildSettingFind[0][0]['leaving_channelDestination'] === "object":
                break;
            default:
                const leavingChannel = leavingMember.guild.channels.cache.get(guildSettingFind[0][0]['leaving_channelDestination']);

                switch (true) {
                    case !leavingChannel:
                        await request.query(
                            `UPDATE guild_settings SET leaving_channelDestination=?`,
                            [
                                null
                            ]
                        )

                        break;
                    case leavingMember.guild.members.me.permissionsIn(guildSettingFind[0][0]['leaving_channelDestination']).has(['SendMessages', 'ViewChannel']) || leavingMember.user.bot:
                        await leavingChannel.send({
                            content: `${leavingMember.user.toString()} left the server.`
                        });

                        break;
                }

                break;
        }

        return db.releaseConnection(request);
    }
};