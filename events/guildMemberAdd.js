const { Events } = require('discord.js');
const { fr, en, de, sp, nl } = require('../preset/language')
const { logging, verifier, blacklist } = require('../preset/db')

const configPreset = require('../config/main.json');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute: async (newMember) => {
        //let verifierData = await verifier.findOne({ where: { userId: newMember.user.id } });
        let blacklistData = await blacklist.findOne({ where: { userId: newMember.user.id } });

        let loggingData = await logging.findOne({ where: { guildId: newMember.guild.id } });
        switch (loggingData.language) {
            case ('en'):
                languageSet = en;
                break;
            case ('fr'):
                languageSet = fr;
                break;
            case ('de'):
                languageSet = de;
                break;
            case ('sp'):
                languageSet = sp;
                break;
            case ('nl'):
                languageSet = nl;
                break;
            default:
                languageSet = en;
                break;
        };

        ///////////////////////////////////
        //  Checking for welcome config  //
        ///////////////////////////////////

        if (loggingData.channelId_Welcome) {
            // Check if the channel still exist
            let welcomeChannel = newMember.guild.channels.cache.get(loggingData.channelId_Welcome);
            if (!welcomeChannel) {
                return logging.update({
                    channelId_Welcome: null
                }, {
                    where: {
                        guildId: newMember.guild.id
                    }
                }).catch(() => { return });
            };

            // Checking if the bot can send message in the channel
            if (!newMember.guild.members.me.permissionsIn(loggingData.channelId_Welcome).has(['SendMessages', 'ViewChannel']) | newMember.user.bot) return;

            // Sending the message
            await welcomeChannel.send({
                content: [`${leavingMember.user.toString()} joined the server.`]
            });
        };

        if (loggingData.roleAutoRoleId_Welcome) {
            let botPermissionRole = newMember.guild.members.me.permissions.has('ManageRoles');
            let botPostion = newMember.roles.highest.position >= (await newMember.guild.members.fetch(configPreset.botPrivateInfo.botId)).roles.highest.position;

            if (botPermissionRole & botPostion) {
                return newMember.roles.add(loggingData.roleAutoRoleId_Welcome);
            };
        };

        ////////////////////////////////////////
        //  Checking for verification config  //
        ////////////////////////////////////////

        /*if (verifierData) {
            if (loggingData.roleAddId_Verify | loggingData.roleRemoveId_Verify) {
                await newMember.roles.add(loggingData.roleAddId_Verify);
                return newMember.roles.remove(loggingData.roleRemoveId_Verify);
            };
        };*/

        /////////////////////////////////////
        //  Checking for blacklist config  //
        /////////////////////////////////////

        if (blacklistData) {
            if (loggingData.status_Blacklist === 'Enabled' & loggingData.channelId_Blacklist) {
                // Check if the channel still exist
                let blacklistChannel = newMember.guild.channels.cache.get(loggingData.channelId_Blacklist);
                if (!blacklistChannel) {
                    return logging.update({
                        channelId_Blacklist: null
                    }, {
                        where: {
                            guildId: newMember.guild.id
                        }
                    }).catch(() => { });
                };

                // Checking if the bot can send message in the channel
                let botPermission = newMember.guild.members.me.permissionsIn(loggingData.channelId_Blacklist).has(['SendMessages', 'ViewChannel']);
                if (botPermission) return;

                let blacklistEmbed = new EmbedBuilder()

                // Changing embed color in terms of the risk
                switch (blacklist_data.risk) {
                    case ('Low'):
                        blacklistEmbed.setColor('57F287');
                        break;
                    case ('Medium'):
                        blacklistEmbed.setColor('FEE75C');
                        break;
                    case ('High'):
                        blacklistEmbed.setColor('ED4245');
                        break;
                    default:
                        blacklistEmbed.setColor('FFFFFF');
                        break;
                };

                // Creating the embed and sending the message
                blacklistEmbed.setTitle('<:BanHammer:997932635454197790> New Alert');
                blacklistEmbed.addFields(
                    { name: 'User', value: newMember.user.toString(), inline: true },
                    { name: 'reason', value: blacklistData.reason, inline: true },
                    { name: 'Evidence', value: blacklistData.evidence, inline: true }
                );
                blacklistEmbed.setFooter({
                    text: 'ID: ' + newMember.user.id
                });
                blacklistEmbed.setTimestamp();

                await blacklistChannel.send({
                    embeds: [blacklistEmbed],
                });

                // Incrementing the join count in the database
                await blacklist_data.increment('joinedServer', { by: 1 });

                // Check if the auto ban is on
                let autoBanResponse = languageSet.welcomeMessage.message.blacklist.autoBan;

                let riskLevel = [
                    'Low',
                    'Medium',
                    'High'
                ];

                switch (loggingData.status_BlacklistAutoban) {
                    case ('Low+'):
                        if (riskLevel.includes(blacklistData.risk)) {
                            // Incrementing the ban count in the database
                            await blacklistData.increment('joinedServerBan');

                            // Ban the member
                            return newMember.guild.members.ban(blacklistData.userId, { reason: [`${blacklistData.reason} | ${autoBanResponse}`] });
                        };

                        break;
                    case ('Medium+'):
                        if (blacklistData.risk === riskLevel[1] | blacklistData.risk === riskLevel[2]) {
                            // Incrementing the ban count in the database
                            await blacklistData.increment('joinedServerBan');

                            // Ban the member
                            return newMember.guild.members.ban(blacklistData.userId, { reason: [`${blacklistData.reason} | ${autoBanResponse}`] });
                        };

                        break;
                    case ('High+'):
                        if (blacklistData.risk === riskLevel[2]) {
                            // Incrementing the ban count in the database
                            await blacklistData.increment('joinedServerBan');

                            // Ban the member
                            return newMember.guild.members.ban(blacklistData.userId, { reason: [`${blacklistData.reason} | ${autoBanResponse}`] });
                        };

                        break;
                };
            };
        };
    }
};