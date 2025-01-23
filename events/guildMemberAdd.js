const { Events, EmbedBuilder } = require('discord.js');
const { db } = require('../server');
const config = require('../config/main.json');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute: async (newMember) => {
        const request = await db.getConnection();

        const guildSettingFind = await request.query(
            `SELECT * FROM guild_settings WHERE guild_id=?`,
            [newMember.guild.id]
        )

        if (guildSettingFind[0][0] == undefined) return;

        const welcome_channelDestination = guildSettingFind[0][0]['welcome_channelDestination'];
        if (welcome_channelDestination) {
            // Check if the channel still exist
            const welcomeChannel = newMember.guild.channels.cache.get(welcome_channelDestination);
            if (!welcomeChannel) {
                return request.query(
                    `UPDATE guild_settings SET welcome_channelDestination=?`,
                    [null]
                )
            };

            // Checking if the bot can send message in the channel
            if (!newMember.guild.members.me.permissionsIn(welcome_channelDestination).has(['SendMessages', 'ViewChannel']) || newMember.user.bot) return;

            // Sending the message
            await welcomeChannel.send({
                content: `${newMember.user.toString()} joined the server.`
            });
        };

        // Disable since it isn't added in the website currently
        /*const welcome_roleAdd = guildSettingFind[0][0]['welcome_roleAdd'];
        if (welcome_roleAdd) {
            const botPermissionRole = newMember.guild.members.me.permissions.has('ManageRoles');
            const botPostion = newMember.roles.highest.position >= (await newMember.guild.members.fetch(config.botPrivateInfo.botId)).roles.highest.position;

            if (botPermissionRole & botPostion) {
                return newMember.roles.add(welcome_roleAdd);
            };
        };*/

        if (guildSettingFind[0][0]['blacklist_status'] >= 1) {
            const blacklistData = await request.query(
                `SELECT * FROM blacklists WHERE user_id=?`,
                [newMember.user.id]
            )

            if (blacklistData[0][0] !== undefined) {
                const autoban = guildSettingFind[0][0]['blacklist_autoBan'];
                const channel = guildSettingFind[0][0]['blacklist_channelDestination'];

                // Check if the channel still exist
                const blacklistChannel = newMember.guild.channels.cache.get(channel);
                if (!blacklistChannel) {
                    await request.query(
                        `UPDATE guild_settings SET blacklist_channelDestination=?`,
                        [null]
                    )
                };

                // Incrementing the join count in the database
                await request.query(
                    `UPDATE blacklists SET server_join=? WHERE user_id=?`,
                    [blacklistData[0][0]['server_join'] + 1, newMember.user.id]
                );

                // Checking if the bot can send message in the channel
                if (channel) {
                    if (!newMember.guild.members.me.permissionsIn(channel).has(['SendMessages', 'ViewChannel'])) return;

                    // Changing embed color in terms of the risk
                    switch (blacklistData[0][0]['risk']) {
                        case 3:
                            color = 'FEE75C'; // High
                            break;
                        case 2:
                            color = 'ED4245'; // Medium
                            break;
                        default:
                            color = 'ED4245'; // Low
                            break;
                    }

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
                        .setColor(color);

                    blacklistChannel.send({
                        embeds: [embed],
                    });
                }

                if (autoban <= 1 && blacklistData[0][0]['risk'] >= autoban) {
                    newMember.guild.members.ban(newMember.user.id, { reason: [`${blacklistData[0][0]['reason']} | Blacklist`] });
                }
            }
        }

        return db.releaseConnection(request);
    }
}