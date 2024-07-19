const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { fr, en, de, sp, nl } = require('../preset/language')
const { logging, blacklist, permission } = require('../preset/db')

const configPreset = require('../config/main.json');
const messagePreset = require('../config/message.json');

let reasonList = en.blacklist.default.add.reason.list;
let riskList = en.blacklist.default.add.risk.list;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.blacklist.default.name)
        .setNameLocalizations({
            'fr': fr.blacklist.default.name,
            'de': de.blacklist.default.name,
            'es-ES': sp.blacklist.default.name,
            'nl': nl.blacklist.default.name
        })
        .setDescription(en.blacklist.default.description)
        .setDescriptionLocalizations({
            'fr': fr.blacklist.default.description,
            'de': de.blacklist.default.description,
            'es-ES': sp.blacklist.default.description,
            'nl': nl.blacklist.default.description
        })
        .addSubcommand(subcommand => subcommand
            .setName(en.blacklist.default.add.name)
            .setNameLocalizations({
                'fr': fr.blacklist.default.add.name,
                'de': de.blacklist.default.add.name,
                'es-ES': sp.blacklist.default.add.name,
                'nl': nl.blacklist.default.add.name
            })
            .setDescription(en.blacklist.default.add.description)
            .setDescriptionLocalizations({
                'fr': fr.blacklist.default.add.description,
                'de': de.blacklist.default.add.description,
                'es-ES': sp.blacklist.default.add.description,
                'nl': nl.blacklist.default.add.description
            })
            .addUserOption(option => option
                .setName(en.blacklist.default.add.user.name)
                .setNameLocalizations({
                    'fr': fr.blacklist.default.add.user.name,
                    'de': de.blacklist.default.add.user.name,
                    'es-ES': sp.blacklist.default.add.user.name,
                    'nl': nl.blacklist.default.add.user.name
                })
                .setDescription(en.blacklist.default.add.user.description)
                .setDescriptionLocalizations({
                    'fr': fr.blacklist.default.add.user.description,
                    'de': de.blacklist.default.add.user.description,
                    'es-ES': sp.blacklist.default.add.user.description,
                    'nl': nl.blacklist.default.add.user.description
                })
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.blacklist.default.add.reason.name)
                .setNameLocalizations({
                    'fr': fr.blacklist.default.add.reason.name,
                    'de': de.blacklist.default.add.reason.name,
                    'es-ES': sp.blacklist.default.add.reason.name,
                    'nl': nl.blacklist.default.add.reason.name
                })
                .setDescription(en.blacklist.default.add.reason.description)
                .setDescriptionLocalizations({
                    'fr': fr.blacklist.default.add.reason.description,
                    'de': de.blacklist.default.add.reason.description,
                    'es-ES': sp.blacklist.default.add.reason.description,
                    'nl': nl.blacklist.default.add.reason.description
                })
                .setRequired(true)
                .addChoices(
                    { name: reasonList['account-self-bot'], value: reasonList['account-self-bot'] },
                    { name: reasonList['scam-selling-art'], value: reasonList['scam-selling-art'] },
                    { name: reasonList['scam-sugar'], value: reasonList['scam-sugar'] },
                    { name: reasonList['lawbreaking-soliciting-underage'], value: reasonList['lawbreaking-soliciting-underage'] },
                    { name: reasonList['lawbreaking-partipating-underage'], value: reasonList['lawbreaking-partipating-underage'] },
                    { name: reasonList['content-sharing-gore'], value: reasonList['content-sharing-gore'] },
                    { name: reasonList['content-sharing-cheats'], value: reasonList['content-sharing-cheats'] },
                    { name: reasonList['content-self-harm'], value: reasonList['content-self-harm'] },
                    { name: reasonList['content-hate-speech'], value: reasonList['content-hate-speech'] },
                ))
            .addStringOption(option => option
                .setName(en.blacklist.default.add.risk.name)
                .setNameLocalizations({
                    'fr': fr.blacklist.default.add.risk.name,
                    'de': de.blacklist.default.add.risk.name,
                    'es-ES': sp.blacklist.default.add.risk.name,
                    'nl': nl.blacklist.default.add.risk.name
                })
                .setDescription(en.blacklist.default.add.risk.description)
                .setDescriptionLocalizations({
                    'fr': fr.blacklist.default.add.risk.description,
                    'de': de.blacklist.default.add.risk.description,
                    'es-ES': sp.blacklist.default.add.risk.description,
                    'nl': nl.blacklist.default.add.risk.description
                })
                .setRequired(true)
                .addChoices(
                    { name: riskList.low, value: riskList.low },
                    { name: riskList.medium, value: riskList.medium },
                    { name: riskList.high, value: riskList.high },
                ))
            .addStringOption(option => option
                .setName(en.blacklist.default.add.evidence.name)
                .setNameLocalizations({
                    'fr': fr.blacklist.default.add.evidence.name,
                    'de': de.blacklist.default.add.evidence.name,
                    'es-ES': sp.blacklist.default.add.evidence.name,
                    'nl': nl.blacklist.default.add.evidence.name
                })
                .setDescription(en.blacklist.default.add.evidence.description)
                .setDescriptionLocalizations({
                    'fr': fr.blacklist.default.add.evidence.description,
                    'de': de.blacklist.default.add.evidence.description,
                    'es-ES': sp.blacklist.default.add.evidence.description,
                    'nl': nl.blacklist.default.add.evidence.description
                })
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(en.blacklist.default.remove.name)
            .setNameLocalizations({
                'fr': fr.blacklist.default.remove.name,
                'de': de.blacklist.default.remove.name,
                'es-ES': sp.blacklist.default.remove.name,
                'nl': nl.blacklist.default.remove.name
            })
            .setDescription(en.blacklist.default.remove.description)
            .setDescriptionLocalizations({
                'fr': fr.blacklist.default.remove.description,
                'de': de.blacklist.default.remove.description,
                'es-ES': sp.blacklist.default.remove.description,
                'nl': nl.blacklist.default.remove.description
            })
            .addUserOption(option => option
                .setName(en.blacklist.default.remove.user.name)
                .setNameLocalizations({
                    'fr': fr.blacklist.default.remove.user.name,
                    'de': de.blacklist.default.remove.user.name,
                    'es-ES': sp.blacklist.default.remove.user.name,
                    'nl': nl.blacklist.default.remove.user.name
                })
                .setDescription(en.blacklist.default.remove.user.description)
                .setDescriptionLocalizations({
                    'fr': fr.blacklist.default.remove.user.description,
                    'de': de.blacklist.default.remove.user.description,
                    'es-ES': sp.blacklist.default.remove.user.description,
                    'nl': nl.blacklist.default.remove.user.description
                })
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(en.blacklist.default.check.name)
            .setNameLocalizations({
                'fr': fr.blacklist.default.check.name,
                'de': de.blacklist.default.check.name,
                'es-ES': sp.blacklist.default.check.name,
                'nl': nl.blacklist.default.check.name
            })
            .setDescription(en.blacklist.default.check.description)
            .setDescriptionLocalizations({
                'fr': fr.blacklist.default.check.description,
                'de': de.blacklist.default.check.description,
                'es-ES': sp.blacklist.default.check.description,
                'nl': nl.blacklist.default.check.description
            })
            .addUserOption(option => option
                .setName(en.blacklist.default.check.user.name)
                .setNameLocalizations({
                    'fr': fr.blacklist.default.check.user.name,
                    'de': de.blacklist.default.check.user.name,
                    'es-ES': sp.blacklist.default.check.user.name,
                    'nl': nl.blacklist.default.check.user.name
                })
                .setDescription(en.blacklist.default.check.user.description)
                .setDescriptionLocalizations({
                    'fr': fr.blacklist.default.check.user.description,
                    'de': de.blacklist.default.check.user.description,
                    'es-ES': sp.blacklist.default.check.user.description,
                    'nl': nl.blacklist.default.check.user.description
                })
                .setRequired(false))),
    execute: async (interaction) => {
        let loggingData = await logging.findOne({ where: { guildId: interaction.guild.id } });

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

        let options = interaction.options.getSubcommand();
        let user = interaction.options.getUser(en.blacklist.default.add.user.name);
        let reason = interaction.options.getString(en.blacklist.default.add.reason.name);
        let risk = interaction.options.getString(en.blacklist.default.add.risk.name);
        let evidenceLink = interaction.options.getString(en.blacklist.default.add.evidence.name);

        let fetchGuild = interaction.client.guilds.cache.get(configPreset.botInfo.supportServerId);
        let blacklistChannel = fetchGuild.channels.cache.get(configPreset.channelsId.blacklist);

        let lgBlacklist = languageSet.blacklist.message.embed.options;

        // Switch in function of who was mentionned aka if the user option is missing = returning self
        if (user) {
            userCheck = user;
            boolUser = lgBlacklist.isNotBlacklisted
        } else {
            userCheck = interaction.user;
            reply = lgBlacklist.youreNotBlacklisted;
        };

        let permissionData = await permission.findOne({ where: { userId: user.id } });
        let blacklistData = await blacklist.findOne({ where: { userId: userCheck.id } });

        if (options !== 'check' & permissionData) {
            return interaction.reply({
                content: languageSet.blacklist.message.onWho.isStaff,
                ephemeral: true,
            });
        } else if (options !== 'check' & blacklistData) {
            return interaction.reply({
                content: languageSet.blacklist.message.onWho.isBlacklisted,
                ephemeral: true,
            });
        };

        switch (userCheck.id) {
            case (!user || !interaction.user):
                return interaction.reply({
                    content: languageSet.default.unknownUser,
                    ephemeral: true,
                });
            case (interaction.user.id & options !== 'check'):
                return interaction.reply({
                    content: languageSet.blacklist.message.onWho.isThemself,
                    ephemeral: true,
                });
            case (bot.user.id & options !== 'check'):
                return interaction.reply({
                    content: languageSet.blacklist.message.onWho.isBot,
                    ephemeral: true,
                });
            default:
                evidenceLink ? isEvidence = evidenceLink : isEvidence = null;

                let blacklistEmbed = new EmbedBuilder()

                let optionsList = [
                    'add',
                    'remove',
                    'suggest'
                ];

                if (optionsList.includes(options)) {
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
                        default:
                            blacklistEmbed.setColor('FFFFFF');
                            break;
                    };
                };

                blacklistEmbed.addFields(
                    { name: lgBlacklist.default.userTag, value: '`' + userCheck.tag + '`', inline: true },
                    { name: lgBlacklist.default.userId, value: '`' + userCheck.id + '`', inline: true },
                );

                switch (options) {
                    case ('add'):
                        // Checking if the user is already blacklisted
                        if (blacklistData) {
                            blacklistEmbed.setDescription(`:white_check_mark: ${messagePreset.blacklist.isBlacklisted}`)
                            blacklistEmbed.setColor('Green')

                            return interaction.reply({
                                embeds: [blacklistEmbed],
                                ephemeral: true,
                            });
                        };

                        return interaction.reply({
                            content: user.toString() + ' has been blacklisted for `' + reason + '` successfully!',
                            ephemeral: true,
                        }).then(async () => {
                            blacklistEmbed.addFields(
                                { name: lgBlacklist.default.reason, value: '`' + reason + '`', inline: true },
                                { name: lgBlacklist.default.staffTag, value: '`' + interaction.user.tag + '`', inline: true },
                                { name: lgBlacklist.default.staffId, value: '`' + interaction.user.id + '`', inline: true },
                                { name: lgBlacklist.default.evidence, value: isEvidence, inline: true }
                            );

                            await blacklistChannel.send({
                                embeds: [blacklistEmbed]
                            });

                            return Blacklist.create({
                                userId: user.id,
                                userTag: user.tag,
                                staffId: interaction.user.id,
                                staffTag: interaction.user.tag,
                                reason: reason,
                                evidence: isEvidence,
                                risk: risk,
                            });
                        });
                    case ('remove'):
                        // Checking if the user is already blacklisted
                        if (!blacklistData) {
                            blacklistEmbed.setDescription(`:white_check_mark: ${messagePreset.blacklist.isntBlacklisted}`)
                            blacklistEmbed.setColor('Green')

                            return interaction.reply({
                                embeds: [blacklistEmbed],
                                ephemeral: true,
                            });
                        };

                        return interaction.reply({
                            content: messagePreset.blacklist.removeBlacklist,
                            ephemeral: true,
                        }).then(async () => {
                            blacklistEmbed.addFields(
                                { name: lgBlacklist.default.reason, value: '`' + blacklistData.reason + '`', inline: true },
                                { name: lgBlacklist.default.staffTag, value: '`' + blacklistData.userTag + '`', inline: true },
                                { name: lgBlacklist.default.staffId, value: '`' + blacklistData.staffId + '`', inline: true },
                                { name: lgBlacklist.default.evidence, value: blacklistData.evidence, inline: true }
                            );

                            await blacklistChannel.send({
                                embeds: [InfoBlacklist],
                                ephemeral: true,
                            });

                            return Blacklist.destroy({ where: { userId: userCheck } });
                        });
                    case ('suggest'):
                        evidenceImage ? isEvidence = evidenceImage : isEvidence = null;

                        // Checking if the user is already blacklisted
                        if (blacklistData) {
                            blacklistEmbed.setDescription(`:white_check_mark: ${messagePreset.blacklist.isBlacklisted}`)
                            blacklistEmbed.setColor('Green')

                            return interaction.reply({
                                embeds: [blacklistEmbed],
                                ephemeral: true,
                            });
                        };

                        return interaction.reply({
                            content: messagePreset.blacklist.suggestBlacklist,
                            ephemeral: true,
                        }).then(() => {
                            blacklistEmbed.addFields(
                                { name: lgBlacklist.default.reason, value: '`' + reason + '`', inline: true },
                                { name: lgBlacklist.default.staffTag, value: '`' + interaction.user.tag + '`', inline: true },
                                { name: lgBlacklist.default.staffId, value: '`' + interaction.user.id + '`', inline: true },
                            );
                            blacklistEmbed.setImage(evidenceImage.url);

                            return blacklistSuggestChannel.send({
                                embeds: [InfoBlacklist],
                                ephemeral: true,
                            });
                        });
                    case ('check'):
                        // Checking if the user is blacklisted
                        if (!blacklistData) {
                            blacklistEmbed.setDescription(`:white_check_mark: ${messagePreset.blacklist.isntBlacklisted}`)
                            blacklistEmbed.setColor('Green')

                            return interaction.reply({
                                embeds: [blacklistEmbed],
                                ephemeral: true,
                            });
                        };

                        blacklistEmbed.addFields(
                            { name: lgBlacklist.default.reason, value: '`' + blacklistData.reason + '`', inline: true },
                            { name: lgBlacklist.default.staffTag, value: '`' + blacklistData.staffTag + '`', inline: true },
                            { name: lgBlacklist.default.staffId, value: '`' + blacklistData.staffId + '`', inline: true },
                            { name: lgBlacklist.default.evidence, value: blacklistData.evidence, inline: true }
                        );

                        switch (blacklistData.risk) {
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

                        return interaction.reply({
                            embeds: [blacklistEmbed],
                            ephemeral: true,
                        });
                };
        };
    }
};