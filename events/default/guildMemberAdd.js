const { Events, EmbedBuilder } = require('discord.js');
const { db } = require('../../server');
const config = require('../../config/main.json');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute: async (newMember) => {
        const request = await db.getConnection();

        const guildSettingFind = await request.query(
            `SELECT * FROM guild_settings WHERE id=?`,
            [
                newMember.guild.id
            ]
        )

        switch (true) {
            case typeof guildSettingFind[0][0] === "undefined":
                break;
            case typeof guildSettingFind[0][0]['welcome_channelDestination'] === "object":
                break;
            default:
                const welcomeChannel = newMember.guild.channels.cache.get(guildSettingFind[0][0]['welcome_channelDestination']);

                switch (true) {
                    case !welcomeChannel:
                        await request.query(
                            `UPDATE guild_settings SET welcome_channelDestination=?`,
                            [
                                null
                            ]
                        )

                        break;
                    case newMember.guild.members.me.permissionsIn(guildSettingFind[0][0]['welcome_channelDestination']).has(['SendMessages', 'ViewChannel']) || newMember.user.bot:
                        await welcomeChannel.send({
                            content: `${newMember.user.toString()} joined the server.`
                        });

                        break;
                }

                break;
        }

        const blacklistData = await request.query(
            `SELECT * FROM blacklists WHERE id=?`,
            [
                newMember.user.id
            ]
        )

        switch (true) {
            case typeof blacklistData[0][0] === "undefined":
                break;
            case guildSettingFind[0][0]['blacklist_status'] >= 1:
                const autoban = guildSettingFind[0][0]['blacklist_autoBan'];
                const channel = guildSettingFind[0][0]['blacklist_channelDestination'];

                // Check if the channel still exist
                const blacklistChannel = newMember.guild.channels.cache.get(channel);
                if (!blacklistChannel) {
                    await request.query(
                        `UPDATE guild_settings SET blacklist_channelDestination=?`,
                        [
                            null
                        ]
                    )
                };

                // Incrementing the join count in the database
                await request.query(
                    `UPDATE blacklists SET server_join=? WHERE user_id=?`,
                    [
                        blacklistData[0][0]['server_join'] + 1,
                        newMember.user.id
                    ]
                );

                // Checking if the bot can send message in the channel
                if (channel) {
                    if (!newMember.guild.members.me.permissionsIn(channel).has(['SendMessages', 'ViewChannel'])) return;

                    // Changing embed color in terms of the risk

                    const riskColor = [
                        [
                            "Low", "ED4245"
                        ],
                        [
                            "Medium", "ED4245"
                        ],
                        [
                            "High", "FEE75C"
                        ]
                    ]

                    // Creating the embed and sending the message
                    const embed = new EmbedBuilder()
                        .setTitle('Blacklist Alert')
                        .addFields(
                            { name: 'User Name', value: newMember.user.toString(), inline: true },
                            { name: 'User ID', value: newMember.user.id, inline: true },
                            { name: '\u200b', value: '\u200b', inline: true },
                            { name: 'Reason', value: blacklistData[0][0]['reason'], inline: true },
                            { name: 'Evidence', value: blacklistData[0][0]['evidence'], inline: true },
                            { name: '\u200b', value: '\u200b', inline: true },
                        )
                        .setTimestamp()
                        .setColor(riskColor[blacklistData[0][0]['risk'] - 1][1]);

                    blacklistChannel.send({
                        embeds: [embed],
                    });
                }

                if (autoban <= 1 && blacklistData[0][0]['risk'] >= autoban) {
                    newMember.guild.members.ban(newMember.user.id, { reason: [`${blacklistData[0][0]['reason']} | Blacklist`] });
                }
        }

        return db.releaseConnection(request);
    }
}