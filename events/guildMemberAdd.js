const { Events } = require('discord.js');
const { language } = require('../preset/language')
const config = require('../config/main.json');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute: async (newMember) => {
        db.query(`SELECT roleAutoRoleId_Welcome, channelId_Welcome, status_Blacklist, channelId_Blacklist, status_BlacklistAutoban FROM blacklists WHERE guildId=?`, [newMember.guild.id], async (error, statement) => {
            if (!statement) return;

            language(newMember, languageSet);

            const statString = JSON.stringify(statement);
            const value = JSON.parse(statString);

            const channelId_Welcome = value[0]['channelId_Welcome'];
            if (channelId_Welcome) {
                // Check if the channel still exist
                let welcomeChannel = newMember.guild.channels.cache.get(channelId_Welcome);
                if (!welcomeChannel) {
                    return db.query(`UPDATE loggings SET channelId_Welcome=?`, [null])
                };

                // Checking if the bot can send message in the channel
                if (!newMember.guild.members.me.permissionsIn(channelId_Welcome).has(['SendMessages', 'ViewChannel']) | newMember.user.bot) return;

                // Sending the message
                await welcomeChannel.send({
                    content: [`${newMember.user.toString()} joined the server.`]
                });
            };

            const roleAutoRoleId_Welcome = value[0]['roleAutoRoleId_Welcome'];
            if (roleAutoRoleId_Welcome) {
                let botPermissionRole = newMember.guild.members.me.permissions.has('ManageRoles');
                let botPostion = newMember.roles.highest.position >= (await newMember.guild.members.fetch(config.botPrivateInfo.botId)).roles.highest.position;

                if (botPermissionRole & botPostion) {
                    return newMember.roles.add(roleAutoRoleId_Welcome);
                };
            };

            const status_Blacklist = value[0]['status_Blacklist'];
            if (status_Blacklist === 'Enabled') {
                const status_BlacklistAutoban = value[0]['status_BlacklistAutoban'];
                const channelId_Blacklist = value[0]['channelId_Blacklist'];

                db.query(`SELECT userId, risk, reason, evidence FROM blacklists WHERE userId=?`, [newMember.user.id], async (error, statement) => {
                    const blacklistString = JSON.stringify(statement);
                    const blacklistValue = JSON.parse(blacklistString);

                    const userId = blacklistValue[0]['userId'];
                    const risk = blacklistValue[0]['risk'];
                    const reason = blacklistValue[0]['risk'];
                    const evidence = blacklistValue[0]['risk'];

                    if (statement) {
                        // Check if the channel still exist
                        const blacklistChannel = newMember.guild.channels.cache.get(channelId_Blacklist);
                        if (!blacklistChannel) {
                            await db.query(`UPDATE loggings SET channelId_Blacklist=?`, [null])
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
                        db.query(`UPDATE blacklists SET joinedServer + 1 WHERE userId=?`, [userId]);

                        let autoBanResponse = languageSet.welcomeMessage.message.blacklist.autoBan;

                        let riskLevel = [
                            'Low',
                            'Medium',
                            'High'
                        ];

                        function autoBan() {
                            db.query(`UPDATE blacklists SET joinedServerBan + 1 WHERE userId=?`, [userId]);
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
                        };
                    };
                });
            };
        });
    }
};