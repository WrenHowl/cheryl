const { Events } = require('discord.js');
const { db } = require('../server');
const config = require('../config/main.json');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute: async (newMember) => {
        db.getConnection();

        let loggingFind = await db.query(
            `SELECT welcome_roleAdd, welcome_channelDestination, blacklist_status, blacklist_channelDestination, blacklist_autoBan FROM loggings WHERE guildId=?`,
            [newMember.guild.id]
        )

        if (loggingFind[0][0] != undefined) {
            const welcome_channelDestination = loggingFind[0]['welcome_channelDestination'];
            if (welcome_channelDestination) {
                // Check if the channel still exist
                const welcomeChannel = newMember.guild.channels.cache.get(welcome_channelDestination);
                if (!welcomeChannel) {
                    return db.query(`UPDATE loggings SET welcome_channelDestination=?`,
                        [null]
                    )
                };

                // Checking if the bot can send message in the channel
                if (!newMember.guild.members.me.permissionsIn(welcome_channelDestination).has(['SendMessages', 'ViewChannel']) | newMember.user.bot) return;

                // Sending the message
                await welcomeChannel.send({
                    content: [`${newMember.user.toString()} joined the server.`]
                });
            };

            const welcome_roleAdd = loggingFind[0]['welcome_roleAdd'];
            if (welcome_roleAdd) {
                const botPermissionRole = newMember.guild.members.me.permissions.has('ManageRoles');
                const botPostion = newMember.roles.highest.position >= (await newMember.guild.members.fetch(config.botPrivateInfo.botId)).roles.highest.position;

                if (botPermissionRole & botPostion) {
                    return newMember.roles.add(welcome_roleAdd);
                };
            };

            const status_Blacklist = loggingFind[0]['blacklist_status'];
            if (status_Blacklist === 1) {
                const status_BlacklistAutoban = loggingFind[0]['blacklist_autoBan'];
                const channelId_Blacklist = loggingFind[0]['blacklist_channelDestination'];

                const blacklistData = await
                    db.query(`SELECT * FROM blacklists WHERE userId=?`,
                        [newMember.user.id]
                    )

                if (blacklistData[0][0] != undefined) {
                    const userId = blacklistData[0]['userId'];
                    const risk = blacklistData[0]['risk'];
                    const reason = blacklistData[0]['reason'];
                    const evidence = blacklistData[0]['evidence'];
                    const joinedServer = blacklistData[0]['joinedServer'];
                    const joinedServerBan = blacklistData[0]['joinedServerBan'];
                    const blacklistEmbed = new EmbedBuilder()
                    const autoBanloggingFind = en.welcomeMessage.message.blacklist.autoBan;

                    // Check if the channel still exist
                    const blacklistChannel = newMember.guild.channels.cache.get(channelId_Blacklist);
                    if (!blacklistChannel) {
                        await db.query(`UPDATE loggings SET blacklist_channelDestination=?`,
                            [null]
                        )
                    };

                    // Checking if the bot can send message in the channel
                    const botPermission = newMember.guild.members.me.permissionsIn(channelId_Blacklist).has(['SendMessages', 'ViewChannel']);
                    if (botPermission) return;

                    // Changing embed color in terms of the risk
                    switch (risk) {
                        case ('Low'):
                            blacklistEmbed.setColor('57F287');
                            break;
                        case ('Medium'):
                            blacklistEmbed.setColor('FEE75C');
                            break;
                        case ('High'):
                            blacklistEmbed.setColor('ED4245');
                            break;
                    };

                    // Creating the embed and sending the message
                    blacklistEmbed.setTitle('<:BanHammer:997932635454197790> New Alert');
                    blacklistEmbed.addFields(
                        { name: 'User', value: newMember.user.toString(), inline: true },
                        { name: 'Reason', value: reason, inline: true },
                        { name: 'Evidence', value: evidence, inline: true }
                    );
                    blacklistEmbed.setFooter({
                        text: 'Id: ' + userId
                    });
                    blacklistEmbed.setTimestamp();

                    await blacklistChannel.send({
                        embeds: [blacklistEmbed],
                    });

                    // Incrementing the join count in the database
                    await db.query(`UPDATE blacklists SET joinedServer=? WHERE userId=?`,
                        [joinedServer++, userId]
                    );

                    const riskLevel = [
                        'Low',
                        'Medium',
                        'High'
                    ];

                    async function autoBan() {
                        return newMember.guild.members.ban(userId, { reason: [`${reason} | ${autoBanloggingFind}`] });
                    };

                    // Check if the auto ban is on
                    switch (status_BlacklistAutoban) {
                        case ('Low+'):
                            if (riskLevel.includes(risk)) {
                                autoBan();
                            };

                            break;
                        case ('Medium+'):
                            if (risk === riskLevel[1] | risk === riskLevel[2]) {
                                autoBan();
                            };

                            break;
                        case ('High+'):
                            if (risk === riskLevel[2]) {
                                autoBan();
                            };

                            break;
                    }
                }
            }
        }
    }
}