const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const configPreset = require("../settings/config.json");
const messagePreset = require("../settings/message.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.blacklist.default.name)
        .setNameLocalizations({
            "fr": fr.blacklist.default.name,
            "de": de.blacklist.default.name,
            "es-ES": sp.blacklist.default.name,
            "nl": nl.blacklist.default.name
        })
        .setDescription(en.blacklist.default.description)
        .setDescriptionLocalizations({
            "fr": fr.blacklist.default.description,
            "de": de.blacklist.default.description,
            "es-ES": sp.blacklist.default.description,
            "nl": nl.blacklist.default.description
        })
        .addSubcommand(subcommand => subcommand
            .setName(en.blacklist.default.add.name)
            .setNameLocalizations({
                "fr": fr.blacklist.default.add.name,
                "de": de.blacklist.default.add.name,
                "es-ES": sp.blacklist.default.add.name,
                "nl": nl.blacklist.default.add.name
            })
            .setDescription(en.blacklist.default.add.description)
            .setDescriptionLocalizations({
                "fr": fr.blacklist.default.add.description,
                "de": de.blacklist.default.add.description,
                "es-ES": sp.blacklist.default.add.description,
                "nl": nl.blacklist.default.add.description
            })
            .addUserOption(option => option
                .setName(en.blacklist.default.add.user.name)
                .setNameLocalizations({
                    "fr": fr.blacklist.default.add.user.name,
                    "de": de.blacklist.default.add.user.name,
                    "es-ES": sp.blacklist.default.add.user.name,
                    "nl": nl.blacklist.default.add.user.name
                })
                .setDescription(en.blacklist.default.add.user.description)
                .setDescriptionLocalizations({
                    "fr": fr.blacklist.default.add.user.description,
                    "de": de.blacklist.default.add.user.description,
                    "es-ES": sp.blacklist.default.add.user.description,
                    "nl": nl.blacklist.default.add.user.description
                })
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.blacklist.default.add.reason.name)
                .setNameLocalizations({
                    "fr": fr.blacklist.default.add.reason.name,
                    "de": de.blacklist.default.add.reason.name,
                    "es-ES": sp.blacklist.default.add.reason.name,
                    "nl": nl.blacklist.default.add.reason.name
                })
                .setDescription(en.blacklist.default.add.reason.description)
                .setDescriptionLocalizations({
                    "fr": fr.blacklist.default.add.reason.description,
                    "de": de.blacklist.default.add.reason.description,
                    "es-ES": sp.blacklist.default.add.reason.description,
                    "nl": nl.blacklist.default.add.reason.description
                })
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.blacklist.default.add.risk.name)
                .setNameLocalizations({
                    "fr": fr.blacklist.default.add.risk.name,
                    "de": de.blacklist.default.add.risk.name,
                    "es-ES": sp.blacklist.default.add.risk.name,
                    "nl": nl.blacklist.default.add.risk.name
                })
                .setDescription(en.blacklist.default.add.risk.description)
                .setDescriptionLocalizations({
                    "fr": fr.blacklist.default.add.risk.description,
                    "de": de.blacklist.default.add.risk.description,
                    "es-ES": sp.blacklist.default.add.risk.description,
                    "nl": nl.blacklist.default.add.risk.description
                })
                .setRequired(true)
                .addChoices(
                    { name: 'low', value: 'Low' },
                    { name: 'medium', value: 'Medium' },
                    { name: 'high', value: 'High' },
                ))
            .addStringOption(option => option
                .setName(en.blacklist.default.add.evidence.name)
                .setNameLocalizations({
                    "fr": fr.blacklist.default.add.evidence.name,
                    "de": de.blacklist.default.add.evidence.name,
                    "es-ES": sp.blacklist.default.add.evidence.name,
                    "nl": nl.blacklist.default.add.evidence.name
                })
                .setDescription(en.blacklist.default.add.evidence.description)
                .setDescriptionLocalizations({
                    "fr": fr.blacklist.default.add.evidence.description,
                    "de": de.blacklist.default.add.evidence.description,
                    "es-ES": sp.blacklist.default.add.evidence.description,
                    "nl": nl.blacklist.default.add.evidence.description
                })
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(en.blacklist.default.remove.name)
            .setNameLocalizations({
                "fr": fr.blacklist.default.remove.name,
                "de": de.blacklist.default.remove.name,
                "es-ES": sp.blacklist.default.remove.name,
                "nl": nl.blacklist.default.remove.name
            })
            .setDescription(en.blacklist.default.remove.description)
            .setDescriptionLocalizations({
                "fr": fr.blacklist.default.remove.description,
                "de": de.blacklist.default.remove.description,
                "es-ES": sp.blacklist.default.remove.description,
                "nl": nl.blacklist.default.remove.description
            })
            .addUserOption(option => option
                .setName(en.blacklist.default.remove.user.name)
                .setNameLocalizations({
                    "fr": fr.blacklist.default.remove.user.name,
                    "de": de.blacklist.default.remove.user.name,
                    "es-ES": sp.blacklist.default.remove.user.name,
                    "nl": nl.blacklist.default.remove.user.name
                })
                .setDescription(en.blacklist.default.remove.user.description)
                .setDescriptionLocalizations({
                    "fr": fr.blacklist.default.remove.user.description,
                    "de": de.blacklist.default.remove.user.description,
                    "es-ES": sp.blacklist.default.remove.user.description,
                    "nl": nl.blacklist.default.remove.user.description
                })
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(en.blacklist.default.check.name)
            .setNameLocalizations({
                "fr": fr.blacklist.default.check.name,
                "de": de.blacklist.default.check.name,
                "es-ES": sp.blacklist.default.check.name,
                "nl": nl.blacklist.default.check.name
            })
            .setDescription(en.blacklist.default.check.description)
            .setDescriptionLocalizations({
                "fr": fr.blacklist.default.check.description,
                "de": de.blacklist.default.check.description,
                "es-ES": sp.blacklist.default.check.description,
                "nl": nl.blacklist.default.check.description
            })
            .addUserOption(option => option
                .setName(en.blacklist.default.check.user.name)
                .setNameLocalizations({
                    "fr": fr.blacklist.default.check.user.name,
                    "de": de.blacklist.default.check.user.name,
                    "es-ES": sp.blacklist.default.check.user.name,
                    "nl": nl.blacklist.default.check.user.name
                })
                .setDescription(en.blacklist.default.check.user.description)
                .setDescriptionLocalizations({
                    "fr": fr.blacklist.default.check.user.description,
                    "de": de.blacklist.default.check.user.description,
                    "es-ES": sp.blacklist.default.check.user.description,
                    "nl": nl.blacklist.default.check.user.description
                })
                .setRequired(false)))
        .addSubcommand(subcommand => subcommand
            .setName(en.blacklist.default.suggest.name)
            .setNameLocalizations({
                "fr": fr.blacklist.default.suggest.name,
                "de": de.blacklist.default.suggest.name,
                "es-ES": sp.blacklist.default.suggest.name,
                "nl": nl.blacklist.default.suggest.name
            })
            .setDescription(en.blacklist.default.suggest.description)
            .setDescriptionLocalizations({
                "fr": fr.blacklist.default.suggest.description,
                "de": de.blacklist.default.suggest.description,
                "es-ES": sp.blacklist.default.suggest.description,
                "nl": nl.blacklist.default.suggest.description
            })
            .addUserOption(option => option
                .setName(en.blacklist.default.suggest.user.name)
                .setNameLocalizations({
                    "fr": fr.blacklist.default.suggest.user.name,
                    "de": de.blacklist.default.suggest.user.name,
                    "es-ES": sp.blacklist.default.suggest.user.name,
                    "nl": nl.blacklist.default.suggest.user.name
                })
                .setDescription(en.blacklist.default.suggest.user.description)
                .setDescriptionLocalizations({
                    "fr": fr.blacklist.default.suggest.user.description,
                    "de": de.blacklist.default.suggest.user.description,
                    "es-ES": sp.blacklist.default.suggest.user.description,
                    "nl": nl.blacklist.default.suggest.user.description
                })
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.blacklist.default.suggest.reason.name)
                .setNameLocalizations({
                    "fr": fr.blacklist.default.suggest.reason.name,
                    "de": de.blacklist.default.suggest.reason.name,
                    "es-ES": sp.blacklist.default.suggest.reason.name,
                    "nl": nl.blacklist.default.suggest.reason.name
                })
                .setDescription(en.blacklist.default.suggest.reason.description)
                .setDescriptionLocalizations({
                    "fr": fr.blacklist.default.suggest.reason.description,
                    "de": de.blacklist.default.suggest.reason.description,
                    "es-ES": sp.blacklist.default.suggest.reason.description,
                    "nl": nl.blacklist.default.suggest.reason.description
                })
                .setRequired(true))
            .addAttachmentOption(option => option
                .setName(en.blacklist.default.suggest.evidence.name)
                .setNameLocalizations({
                    "fr": fr.blacklist.default.suggest.evidence.name,
                    "de": de.blacklist.default.suggest.evidence.name,
                    "es-ES": sp.blacklist.default.suggest.evidence.name,
                    "nl": nl.blacklist.default.suggest.evidence.name
                })
                .setDescription(en.blacklist.default.suggest.evidence.description)
                .setDescriptionLocalizations({
                    "fr": fr.blacklist.default.suggest.evidence.description,
                    "de": de.blacklist.default.suggest.evidence.description,
                    "es-ES": sp.blacklist.default.suggest.evidence.description,
                    "nl": nl.blacklist.default.suggest.evidence.description
                })
                .setRequired(true))),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const Logging = sequelize.define("Logging", {
            guildId: {
                type: Sequelize.STRING,
            },
            channelId_Ban: {
                type: Sequelize.STRING,
            },
            language: {
                type: Sequelize.STRING,
            },
        });

        let loggingData = await Logging.findOne({ where: { guildId: interaction.guild.id } });

        switch (loggingData.language) {
            case ("en"):
                languageSet = en;

                break;
            case ("fr"):
                languageSet = fr;

                break;
            case ("de"):
                languageSet = de;

                break;
            case ("sp"):
                languageSet = sp;

                break;
            case ("nl"):
                languageSet = nl;

                break;
            default:
                languageSet = en;

                break;
        }

        try {
            const Blacklist = sequelize.define("Blacklist", {
                userId: {
                    type: Sequelize.STRING,
                    unique: true,
                },
                userTag: {
                    type: Sequelize.STRING,
                    unique: true,
                },
                staffId: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                staffTag: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                reason: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                evidence: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                risk: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                joinedServer: {
                    type: Sequelize.INTEGER,
                    defaultValue: 1,
                    allowNull: false,
                },
                joinedServerBan: {
                    type: Sequelize.INTEGER,
                    defaultValue: 1,
                    allowNull: false,
                },
            });
            const Permission = sequelize.define("Permission", {
                guildId: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                userId: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                userTag: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                blacklistPermission: {
                    type: Sequelize.STRING,
                    unique: false,
                }
            });

            let options = interaction.options.getSubcommand();
            let user = interaction.options.getUser(en.blacklist.default.add.user.name);
            let reason = interaction.options.getString(en.blacklist.default.add.reason.name);
            let risk = interaction.options.getString(en.blacklist.default.add.risk.name);
            let evidenceLink = interaction.options.getString(en.blacklist.default.add.evidence.name);
            let evidenceImage = interaction.options.getAttachment(en.blacklist.default.suggest.evidence.name);

            let fetchGuild = interaction.client.guilds.cache.get(configPreset.botInfo.guildId);
            let blacklistChannel = fetchGuild.channels.cache.get(configPreset.channelsId.blacklist);
            let blacklistSuggestChannel = fetchGuild.channels.cache.get(configPreset.channelsId.suggestBlacklist);

            user ? userCheck = user : userCheck = interaction.user;

            let permissionUserData = await Permission.findOne({ where: { userId: interaction.user.id } });
            let permissionGuildData = await Permission.findOne({ where: { guildId: interaction.guild.id } });
            let blacklistData = await Blacklist.findOne({ where: { userId: userCheck.id } });

            if (permissionUserData & options !== "check") {
                return interaction.reply({
                    content: languageSet.default.staffOnly,
                });
            };

            switch (userCheck.id) {
                case (!user || !interaction.user):
                    return interaction.reply({
                        content: languageSet.default.unknownUser,
                        ephemeral: true,
                    });
                case (interaction.user.id & options !== "check"):
                    return interaction.reply({
                        content: languageSet.blacklist.message.onWho.isThemself,
                        ephemeral: true,
                    });
                case (bot.user.id & options !== "check"):
                    return interaction.reply({
                        content: languageSet.blacklist.message.onWho.isBot,
                        ephemeral: true,
                    });
                case (permissionUserData):
                    return interaction.reply({
                        content: languageSet.blacklist.message.onWho.isStaff,
                        ephemeral: true,
                    });
                case (blacklistData & options !== "check" | "remove"):
                    return interaction.reply({
                        content: languageSet.blacklist.message.onWho.isBlacklisted,
                        ephemeral: true,
                    });
                case (permissionGuildData & options === "suggest"):
                    return interaction.reply({
                        content: languageSet.blacklist.permission.server,
                        ephemeral: true,
                    });
                default:
                    evidenceLink ? isEvidence = "* *" + evidenceLink : isEvidence = `*${en.blacklist.message.embed.options.noEvidence}*`;
                    evidenceImage ? isEvidence = "* *" + evidenceImage : isEvidence = `*${en.blacklist.message.embed.options.noEvidence}*`;

                    switch (risk) {
                        case ("Low"):
                            return colorRisk = "Yellow";
                        case ("Medium"):
                            return colorRisk = "Red";
                        case ("High"):
                            return colorRisk = "Black";
                    };

                    let lgBlacklist = en.blacklist.message.embed.options;

                    let blacklistEmbed = new EmbedBuilder()
                        .addFields(
                            { name: lgBlacklist.default.userTag, value: userCheck.tag, inline: true },
                            { name: lgBlacklist.default.userId, value: userCheck.id, inline: true },
                        )

                    switch (options) {
                        case ("add"):

                            // Checking if the user is already blacklisted

                            if (blacklistData) {
                                return interaction.reply({
                                    content: lgBlacklist.isBlacklisted,
                                });
                            };

                            return interaction.reply({
                                content: messagePreset.blacklist.addBlacklist,
                                ephemeral: true,
                            }).then(async () => {
                                await Blacklist.create({
                                    UserName: user.tag,
                                    userId: user.id,
                                    ModName: interaction.user.tag,
                                    ModID: interaction.user.id,
                                    Reason: reason,
                                    Proof: proof,
                                    Risk: risk,
                                });

                                blacklistEmbed.addFields(
                                    { name: lgBlacklist.default.reason, value: reason, inline: true },
                                    { name: lgBlacklist.default.staffTag, value: interaction.user.tag, inline: true },
                                    { name: lgBlacklist.default.staffId, value: interaction.user.id, inline: true },
                                    { name: lgBlacklist.default.evidence, value: isEvidence, inline: true }
                                );
                                blacklistEmbed.setColor(colorRisk);

                                return blacklistChannel.send({
                                    embeds: [blacklistEmbed]
                                });
                            });
                        case ("remove"):

                            // Checking if the user is already blacklisted

                            if (!blacklistData) {
                                return interaction.reply({
                                    content: lgBlacklist.isNotBlacklisted,
                                });
                            };

                            return interaction.reply({
                                content: messagePreset.blacklist.removeBlacklist,
                                ephemeral: true,
                            }).then(async () => {
                                blacklistEmbed.addFields(
                                    { name: lgBlacklist.default.reason, value: blacklistData.reason, inline: true },
                                    { name: lgBlacklist.default.staffTag, value: blacklistData.userTag, inline: true },
                                    { name: lgBlacklist.default.staffId, value: blacklistData.staffId, inline: true },
                                    { name: lgBlacklist.default.evidence, value: blacklistData.evidence, inline: true }
                                );
                                blacklistEmbed.setColor(colorRisk)

                                await blacklistChannel.send({
                                    embeds: [InfoBlacklist],
                                });

                                return Blacklist.destroy({ where: { userId: userCheck } });
                            });
                        case ("suggest"):

                            // Checking if the user is already blacklisted

                            if (blacklistData) {
                                return interaction.reply({
                                    content: lgBlacklist.isBlacklisted,
                                });
                            };

                            return interaction.reply({
                                content: messagePreset.blacklist.suggestBlacklist,
                                ephemeral: true,
                            }).then(() => {
                                blacklistEmbed.addFields(
                                    { name: lgBlacklist.default.reason, value: reason, inline: true },
                                    { name: lgBlacklist.default.staffTag, value: interaction.user.tag, inline: true },
                                    { name: lgBlacklist.default.staffId, value: interaction.user.id, inline: true },
                                    { name: lgBlacklist.default.evidence, value: isEvidence, inline: true }
                                );
                                blacklistEmbed.setImage(evidenceImage.url)
                                blacklistEmbed.setColor(colorRisk)

                                return blacklistSuggestChannel.send({
                                    embeds: [InfoBlacklist],
                                });
                            });
                        case ("check"):

                            // Checking if the user is blacklisted

                            if (!blacklistData) {
                                user ?
                                    reply = lgBlacklist.isNotBlacklisted
                                    :
                                    reply = lgBlacklist.youreNotBlacklisted;

                                return interaction.reply({
                                    content: reply,
                                });
                            };

                            blacklistEmbed.addFields(
                                { name: lgBlacklist.default.reason, value: blacklistData.reason, inline: true },
                                { name: lgBlacklist.default.staffTag, value: blacklistData.staffTag, inline: true },
                                { name: lgBlacklist.default.staffId, value: blacklistData.staffId, inline: true },
                                { name: lgBlacklist.default.evidence, value: blacklistData.evidence, inline: true }
                            );

                            return interaction.reply({
                                embeds: [blacklistEmbed],
                            });
                    };
            };
        } catch (error) {
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.guildId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(interaction.user.id + " -> " + interaction.user.tag);
            console.log(error);

            await interaction.reply({
                content: en.default.errorOccured,
                ephemeral: true,
            });

            return crashchannelId.send({ content: "**Error in the '" + en.blacklist.default.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
};