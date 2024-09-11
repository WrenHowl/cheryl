const { Events } = require('discord.js');
const config = require('../config/main.json');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute: async (newMember) => {
        await db.query(`SELECT welcome_roleAdd, welcome_channelDestination, status_Blacklist, channelId_Blacklist, status_BlacklistAutoban FROM blacklists WHERE guildId=?`,
            [newMember.guild.id])
            .then(async (response) => {
                response = response[0];

                const welcome_channelDestination = response[0]['welcome_channelDestination'];
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

                const welcome_roleAdd = response[0]['welcome_roleAdd'];
                if (welcome_roleAdd) {
                    const botPermissionRole = newMember.guild.members.me.permissions.has('ManageRoles');
                    const botPostion = newMember.roles.highest.position >= (await newMember.guild.members.fetch(config.botPrivateInfo.botId)).roles.highest.position;

                    if (botPermissionRole & botPostion) {
                        return newMember.roles.add(welcome_roleAdd);
                    };
                };

                const status_Blacklist = response[0]['status_Blacklist'];
                if (status_Blacklist === 1) {
                    const status_BlacklistAutoban = response[0]['status_BlacklistAutoban'];
                    const channelId_Blacklist = response[0]['channelId_Blacklist'];

                    await db.query(`SELECT * FROM blacklists WHERE userId=?`,
                        [newMember.user.id])
                        .then(async (response) => {
                            response = response[0];

                            if (response[0] == undefined) {

                            } else {
                                const userId = response['userId'];
                                const risk = response['risk'];
                                const reason = response['reason'];
                                const evidence = response['evidence'];
                                const joinedServer = response['joinedServer'];
                                const joinedServerBan = response['joinedServerBan'];

                                // Check if the channel still exist
                                const blacklistChannel = newMember.guild.channels.cache.get(channelId_Blacklist);
                                if (!blacklistChannel) {
                                    await db.query(`UPDATE loggings SET channelId_Blacklist=?`,
                                        [null]
                                    )
                                };

                                // Checking if the bot can send message in the channel
                                const botPermission = newMember.guild.members.me.permissionsIn(channelId_Blacklist).has(['SendMessages', 'ViewChannel']);
                                if (botPermission) return;

                                const blacklistEmbed = new EmbedBuilder()

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
                                    text: 'ID: ' + userId
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

                                const autoBanResponse = en.welcomeMessage.message.blacklist.autoBan;

                                async function autoBan() {
                                    await db.query(`UPDATE blacklists SET joinedServerBan=? WHERE userId=?`,
                                        [joinedServerBan++, userId]
                                    );
                                    return newMember.guild.members.ban(userId, { reason: [`${reason} | ${autoBanResponse}`] });
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
                        })
                }
            })
    }
}