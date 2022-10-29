const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Logging = require("../config/logging.json");
const Config = require("../config/config.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.settings;
const en = LanguageEN.settings;
const de = LanguageDE.settings;
const sp = LanguageSP.settings;
const nl = LanguageNL.settings;

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The '" + en.Name + "' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.Name)
        .setNameLocalizations({
            fr: fr.Name,
            de: de.Name,
            SpanishES: sp.Name,
            nl: nl.Name
        })
        .setDescription(en.Description)
        .setDescriptionLocalizations({
            fr: fr.Description,
            de: de.Description,
            SpanishES: sp.Description,
            nl: nl.Description
        })

        // Setup

        .addSubcommandGroup(group => group
            .setName(en.SetupName)
            .setNameLocalizations({
                fr: fr.SetupName,
                de: de.SetupName,
                SpanishES: sp.SetupName,
                nl: nl.SetupName
            })
            .setDescription(en.SetupDescription)
            .setDescriptionLocalizations({
                fr: fr.SetupDescription,
                de: de.SetupDescription,
                SpanishES: sp.SetupDescription,
                nl: nl.SetupDescription
            })
            .addSubcommand(subcommand => subcommand
                .setName(en.SetupReportName)
                .setNameLocalizations({
                    fr: fr.SetupReportName,
                    de: de.SetupReportName,
                    SpanishES: sp.SetupReportName,
                    nl: nl.SetupReportName
                })
                .setDescription(en.SetupReportDescription)
                .setDescriptionLocalizations({
                    fr: fr.SetupReportDescription,
                    de: de.SetupReportDescription,
                    SpanishES: sp.SetupReportDescription,
                    nl: nl.SetupReportDescription
                })
                .addChannelOption(option => option
                    .setName(en.SetupReportChannelName)
                    .setNameLocalizations({
                        fr: fr.SetupReportChannelName,
                        de: de.SetupReportChannelName,
                        SpanishES: sp.SetupReportChannelName,
                        nl: nl.SetupReportChannelName
                    })
                    .setDescription(en.SetupReportChannelDescription)
                    .setDescriptionLocalizations({
                        fr: fr.SetupReportChannelDescription,
                        de: de.SetupReportChannelDescription,
                        SpanishES: sp.SetupReportChannelDescription,
                        nl: nl.SetupReportChannelDescription
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.SetupReportRoleName)
                    .setNameLocalizations({
                        fr: fr.SetupReportRoleName,
                        de: de.SetupReportRoleName,
                        SpanishES: sp.SetupReportRoleName,
                        nl: nl.SetupReportRoleName
                    })
                    .setDescription(en.SetupReportRoleDescription)
                    .setDescriptionLocalizations({
                        fr: fr.SetupReportRoleDescription,
                        de: de.SetupReportRoleDescription,
                        SpanishES: sp.SetupReportRoleDescription,
                        nl: nl.SetupReportRoleDescription
                    })
                    .setRequired(false)))
            .addSubcommand(subcommand => subcommand
                .setName(en.SetupWelcomeName)
                .setNameLocalizations({
                    fr: fr.SetupWelcomeName,
                    de: de.SetupWelcomeName,
                    SpanishES: sp.SetupWelcomeName,
                    nl: nl.SetupWelcomeName
                })
                .setDescription(en.SetupWelcomeDescription)
                .setDescriptionLocalizations({
                    fr: fr.SetupWelcomeDescription,
                    de: de.SetupWelcomeDescription,
                    SpanishES: sp.SetupWelcomeDescription,
                    nl: nl.SetupWelcomeDescription
                })
                .addChannelOption(option => option
                    .setName(en.SetupWelcomeChannelName)
                    .setNameLocalizations({
                        fr: fr.SetupWelcomeChannelName,
                        de: de.SetupWelcomeChannelName,
                        SpanishES: sp.SetupWelcomeChannelName,
                        nl: nl.SetupWelcomeChannelName
                    })
                    .setDescription(en.SetupWelcomeChannelDescription)
                    .setDescriptionLocalizations({
                        fr: fr.SetupWelcomeChannelDescription,
                        de: de.SetupWelcomeChannelDescription,
                        SpanishES: sp.SetupWelcomeChannelDescription,
                        nl: nl.SetupWelcomeChannelDescription
                    })
                    .setRequired(true)))
            .addSubcommand(subcommand => subcommand
                .setName(en.SetupBlacklistName)
                .setNameLocalizations({
                    fr: fr.SetupBlacklistName,
                    de: de.SetupBlacklistName,
                    SpanishES: sp.SetupBlacklistName,
                    nl: nl.SetupBlacklistName
                })
                .setDescription(en.SetupBlacklistDescription)
                .setDescriptionLocalizations({
                    fr: fr.SetupBlacklistDescription,
                    de: de.SetupBlacklistDescription,
                    SpanishES: sp.SetupBlacklistDescription,
                    nl: nl.SetupBlacklistDescription
                })
                .addStringOption(option => option
                    .setName(en.SetupBlacklistStatusName)
                    .setNameLocalizations({
                        fr: fr.SetupBlacklistStatusName,
                        de: de.SetupBlacklistStatusName,
                        SpanishES: sp.SetupBlacklistStatusName,
                        nl: nl.SetupBlacklistStatusName
                    })
                    .setDescription(en.SetupBlacklistStatusDescription)
                    .setDescriptionLocalizations({
                        fr: fr.SetupBlacklistStatusDescription,
                        de: de.SetupBlacklistStatusDescription,
                        SpanishES: sp.SetupBlacklistStatusDescription,
                        nl: nl.SetupBlacklistStatusDescription
                    })
                    .setRequired(true)
                    .addChoices(
                        { name: "Enable", value: "true" },
                        { name: "Disable", value: "false" },
                    ))
                .addChannelOption(option => option
                    .setName(en.SetupBlacklistChannelName)
                    .setNameLocalizations({
                        fr: fr.SetupBlacklistChannelName,
                        de: de.SetupBlacklistChannelName,
                        SpanishES: sp.SetupBlacklistChannelName,
                        nl: nl.SetupBlacklistChannelName
                    })
                    .setDescription(en.SetupBlacklistChannelDescription)
                    .setDescriptionLocalizations({
                        fr: fr.SetupBlacklistChannelDescription,
                        de: de.SetupBlacklistChannelDescription,
                        SpanishES: sp.SetupBlacklistChannelDescription,
                        nl: nl.SetupBlacklistChannelDescription
                    })
                    .setRequired(false))
                .addStringOption(option => option
                    .setName(en.SetupBlacklistAutobanName)
                    .setNameLocalizations({
                        fr: fr.SetupBlacklistAutobanName,
                        de: de.SetupBlacklistAutobanName,
                        SpanishES: sp.SetupBlacklistAutobanName,
                        nl: nl.SetupBlacklistAutobanName
                    })
                    .setDescription(en.SetupBlacklistAutobanDescription)
                    .setDescriptionLocalizations({
                        fr: fr.SetupBlacklistAutobanDescription,
                        de: de.SetupBlacklistAutobanDescription,
                        SpanishES: sp.SetupBlacklistAutobanDescription,
                        nl: nl.SetupBlacklistAutobanDescription
                    })
                    .setRequired(false)
                    .addChoices(
                        { name: "Low+", value: "low" },
                        { name: "Medium+", value: "medium" },
                        { name: "High+", value: "high" },
                        { name: "Disable", value: "disable" },
                    )))
            .addSubcommand(subcommand => subcommand
                .setName(en.SetupActionName)
                .setNameLocalizations({
                    fr: fr.SetupActionName,
                    de: de.SetupActionName,
                    SpanishES: sp.SetupActionName,
                    nl: nl.SetupActionName
                })
                .setDescription(en.SetupActionDescription)
                .setDescriptionLocalizations({
                    fr: fr.SetupActionDescription,
                    de: de.SetupActionDescription,
                    SpanishES: sp.SetupActionDescription,
                    nl: nl.SetupActionDescription
                })
                .addStringOption(option => option
                    .setName(en.SetupActionOptionsName)
                    .setNameLocalizations({
                        fr: fr.SetupActionOptionsName,
                        de: de.SetupActionOptionsName,
                        SpanishES: sp.SetupActionOptionsName,
                        nl: nl.SetupActionOptionsName
                    })
                    .setDescription(en.SetupActionOptionsDescription)
                    .setDescriptionLocalizations({
                        fr: fr.SetupActionOptionsDescription,
                        de: de.SetupActionOptionsDescription,
                        SpanishES: sp.SetupActionOptionsDescription,
                        nl: nl.SetupActionOptionsDescription
                    })
                    .setRequired(true)
                    .addChoices(
                        { name: "Image", value: "image" },
                        { name: "Message", value: "message" },
                    ))
                .addStringOption(option => option
                    .setName(en.SetupActionStatusName)
                    .setNameLocalizations({
                        fr: fr.SetupActionStatusName,
                        de: de.SetupActionStatusName,
                        SpanishES: sp.SetupActionStatusName,
                        nl: nl.SetupActionStatusName
                    })
                    .setDescription(en.SetupActionStatusDescription)
                    .setDescriptionLocalizations({
                        fr: fr.SetupActionStatusDescription,
                        de: de.SetupActionStatusDescription,
                        SpanishES: sp.SetupActionStatusDescription,
                        nl: nl.SetupActionStatusDescription
                    })
                    .setRequired(true)
                    .addChoices(
                        { name: "Enable", value: "true" },
                        { name: "Disable", value: "false" },
                    ))))

        // Verification

        .addSubcommandGroup(group => group
            .setName(en.VerificationName)
            .setNameLocalizations({
                fr: fr.VerificationName,
                de: de.VerificationName,
                SpanishES: sp.VerificationName,
                nl: nl.VerificationName
            })
            .setDescription(en.VerificationDescription)
            .setDescriptionLocalizations({
                fr: fr.VerificationDescription,
                de: de.VerificationDescription,
                SpanishES: sp.VerificationDescription,
                nl: nl.VerificationDescription
            })
            .addSubcommand(subcommand => subcommand
                .setName(en.VerificationCommandName)
                .setNameLocalizations({
                    fr: fr.VerificationCommandName,
                    de: de.VerificationCommandName,
                    SpanishES: sp.VerificationCommandName,
                    nl: nl.VerificationCommandName
                })
                .setDescription(en.VerificationCommandDescription)
                .setDescriptionLocalizations({
                    fr: fr.VerificationCommandDescription,
                    de: de.VerificationCommandDescription,
                    SpanishES: sp.VerificationCommandDescription,
                    nl: nl.VerificationCommandDescription
                })
                .addChannelOption(option => option
                    .setName(en.VerificationWelcomeName)
                    .setNameLocalizations({
                        fr: fr.VerificationWelcomeName,
                        de: de.VerificationWelcomeName,
                        SpanishES: sp.VerificationWelcomeName,
                        nl: nl.VerificationWelcomeName
                    })
                    .setDescription(en.VerificationWelcomeDescription)
                    .setDescriptionLocalizations({
                        fr: fr.VerificationWelcomeDescription,
                        de: de.VerificationWelcomeDescription,
                        SpanishES: sp.VerificationWelcomeDescription,
                        nl: nl.VerificationWelcomeDescription
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.VerificationWelcomeStaffName)
                    .setNameLocalizations({
                        fr: fr.VerificationWelcomeStaffName,
                        de: de.VerificationWelcomeStaffName,
                        SpanishES: sp.VerificationWelcomeStaffName,
                        nl: nl.VerificationWelcomeStaffName
                    })
                    .setDescription(en.VerificationWelcomeStaffDescription)
                    .setDescriptionLocalizations({
                        fr: fr.VerificationWelcomeStaffDescription,
                        de: de.VerificationWelcomeStaffDescription,
                        SpanishES: sp.VerificationWelcomeStaffDescription,
                        nl: nl.VerificationWelcomeStaffDescription
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.VerificationWelcomeAddName)
                    .setNameLocalizations({
                        fr: fr.VerificationWelcomeAddName,
                        de: de.VerificationWelcomeAddName,
                        SpanishES: sp.VerificationWelcomeAddName,
                        nl: nl.VerificationWelcomeAddName
                    })
                    .setDescription(en.VerificationWelcomeAddDescription)
                    .setDescriptionLocalizations({
                        fr: fr.VerificationWelcomeAddDescription,
                        de: de.VerificationWelcomeAddDescription,
                        SpanishES: sp.VerificationWelcomeAddDescription,
                        nl: nl.VerificationWelcomeAddDescription
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.VerificationWelcomeRemoveName)
                    .setNameLocalizations({
                        fr: fr.VerificationWelcomeRemoveName,
                        de: de.VerificationWelcomeRemoveName,
                        SpanishES: sp.VerificationWelcomeRemoveName,
                        nl: nl.VerificationWelcomeRemoveName
                    })
                    .setDescription(en.VerificationWelcomeRemoveDescription)
                    .setDescriptionLocalizations({
                        fr: fr.VerificationWelcomeRemoveDescription,
                        de: de.VerificationWelcomeRemoveDescription,
                        SpanishES: sp.VerificationWelcomeRemoveDescription,
                        nl: nl.VerificationWelcomeRemoveDescription
                    })
                    .setRequired(false)))
            .addSubcommand(subcommand => subcommand
                .setName(en.VerificationMenuName)
                .setNameLocalizations({
                    fr: fr.VerificationMenuName,
                    de: de.VerificationMenuName,
                    SpanishES: sp.VerificationMenuName,
                    nl: nl.VerificationMenuName
                })
                .setDescription(en.VerificationMenuDescription)
                .setDescriptionLocalizations({
                    fr: fr.VerificationMenuDescription,
                    de: de.VerificationMenuDescription,
                    SpanishES: sp.VerificationMenuDescription,
                    nl: nl.VerificationMenuDescription
                })
                .addChannelOption(option => option
                    .setName(en.VerificationMenuWelcomeName)
                    .setNameLocalizations({
                        fr: fr.VerificationMenuWelcomeName,
                        de: de.VerificationMenuWelcomeName,
                        SpanishES: sp.VerificationMenuWelcomeName,
                        nl: nl.VerificationMenuWelcomeName
                    })
                    .setDescription(en.VerificationMenuWelcomeDescription)
                    .setDescriptionLocalizations({
                        fr: fr.VerificationMenuWelcomeDescription,
                        de: de.VerificationMenuWelcomeDescription,
                        SpanishES: sp.VerificationMenuWelcomeDescription,
                        nl: nl.VerificationMenuWelcomeDescription
                    })
                    .setRequired(true))
                .addChannelOption(option => option
                    .setName(en.VerificationMenuWelcomeReceiveName)
                    .setNameLocalizations({
                        fr: fr.VerificationMenuWelcomeReceiveName,
                        de: de.VerificationMenuWelcomeReceiveName,
                        SpanishES: sp.VerificationMenuWelcomeReceiveName,
                        nl: nl.VerificationMenuWelcomeReceiveName
                    })
                    .setDescription(en.VerificationMenuWelcomeReceiveDescription)
                    .setDescriptionLocalizations({
                        fr: fr.VerificationMenuWelcomeReceiveDescription,
                        de: de.VerificationMenuWelcomeReceiveDescription,
                        SpanishES: sp.VerificationMenuWelcomeReceiveDescription,
                        nl: nl.VerificationMenuWelcomeReceiveDescription
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.VerificationMenuWelcomeStaffName)
                    .setNameLocalizations({
                        fr: fr.VerificationMenuWelcomeStaffName,
                        de: de.VerificationMenuWelcomeStaffName,
                        SpanishES: sp.VerificationMenuWelcomeStaffName,
                        nl: nl.VerificationMenuWelcomeStaffName
                    })
                    .setDescription(en.VerificationMenuWelcomeStaffDescription)
                    .setDescriptionLocalizations({
                        fr: fr.VerificationMenuWelcomeStaffDescription,
                        de: de.VerificationMenuWelcomeStaffDescription,
                        SpanishES: sp.VerificationMenuWelcomeStaffDescription,
                        nl: nl.VerificationMenuWelcomeStaffDescription
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.VerificationMenuWelcomeAddName)
                    .setNameLocalizations({
                        fr: fr.VerificationMenuWelcomeAddName,
                        de: de.VerificationMenuWelcomeAddName,
                        SpanishES: sp.VerificationMenuWelcomeAddName,
                        nl: nl.VerificationMenuWelcomeAddName
                    })
                    .setDescription(en.VerificationMenuWelcomeAddDescription)
                    .setDescriptionLocalizations({
                        fr: fr.VerificationMenuWelcomeAddDescription,
                        de: de.VerificationMenuWelcomeAddDescription,
                        SpanishES: sp.VerificationMenuWelcomeAddDescription,
                        nl: nl.VerificationMenuWelcomeAddDescription
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.VerificationMenuWelcomeRemoveName)
                    .setNameLocalizations({
                        fr: fr.VerificationMenuWelcomeRemoveName,
                        de: de.VerificationMenuWelcomeRemoveName,
                        SpanishES: sp.VerificationMenuWelcomeRemoveName,
                        nl: nl.VerificationMenuWelcomeRemoveName
                    })
                    .setDescription(en.VerificationMenuWelcomeRemoveDescription)
                    .setDescriptionLocalizations({
                        fr: fr.VerificationMenuWelcomeRemoveDescription,
                        de: de.VerificationMenuWelcomeRemoveDescription,
                        SpanishES: sp.VerificationMenuWelcomeRemoveDescription,
                        nl: nl.VerificationMenuWelcomeRemoveDescription
                    })
                    .setRequired(false))))

        // Logging

        .addSubcommand(subcommand => subcommand
            .setName(en.LoggingName)
            .setNameLocalizations({
                fr: fr.LoggingName,
                de: de.LoggingName,
                SpanishES: sp.LoggingName,
                nl: nl.LoggingName
            })
            .setDescription(en.LoggingDescription)
            .setDescriptionLocalizations({
                fr: fr.LoggingDescription,
                de: de.LoggingDescription,
                SpanishES: sp.LoggingDescription,
                nl: nl.LoggingDescription
            })
            .addStringOption(option => option
                .setName(en.LoggingOptionsName)
                .setNameLocalizations({
                    fr: fr.LoggingOptionsName,
                    de: de.LoggingOptionsName,
                    SpanishES: sp.LoggingOptionsName,
                    nl: nl.LoggingOptionsName
                })
                .setDescription(en.LoggingOptionsDescription)
                .setDescriptionLocalizations({
                    fr: fr.LoggingOptionsDescription,
                    de: de.LoggingOptionsDescription,
                    SpanishES: sp.LoggingOptionsDescription,
                    nl: nl.LoggingOptionsDescription
                })
                .setRequired(true)
                .addChoices(
                    { name: "All", value: "all" },
                    { name: "Ban", value: "ban" },
                    { name: "Unban", value: "unban" },
                    { name: "Kick", value: "kick" },
                    { name: "Warn", value: "warn" },
                    { name: "Disable", value: "disable" },
                ))
            .addChannelOption(option => option
                .setName(en.LoggingChannelName)
                .setNameLocalizations({
                    fr: fr.LoggingChannelName,
                    de: de.LoggingChannelName,
                    SpanishES: sp.LoggingChannelName,
                    nl: nl.LoggingChannelName
                })
                .setDescription(en.LoggingChannelDescription)
                .setDescriptionLocalizations({
                    fr: fr.LoggingChannelDescription,
                    de: de.LoggingChannelDescription,
                    SpanishES: sp.LoggingChannelDescription,
                    nl: nl.LoggingChannelDescription
                })
                .setRequired(false))),

    execute: async (interaction, sequelize, Sequelize) => {
        if (interaction.member.permissions.has("ADMINISTRATOR") | interaction.member.permissions.has("MANAGE_GUILD") | interaction.user.id === Config.ownerId) {
            let options = interaction.options.getSubcommand();
            let channelOptions = interaction.options.getChannel(en.LoggingChannelName);
            let channelOptions2 = interaction.options.getChannel(en.SetupWelcomeChannelName);
            let channelOptions3 = interaction.options.getChannel(en.VerificationMenuWelcomeReceiveName);
            let roleOptions = interaction.options.getRole(en.SetupReportRoleName);
            let addRoleOptions = interaction.options.getRole(en.VerificationMenuWelcomeAddName);
            let removeRoleOptions = interaction.options.getRole(en.VerificationMenuWelcomeRemoveName);
            let staffRoleOptions = interaction.options.getRole(en.VerificationMenuWelcomeStaffName);
            let booleanBlacklist = interaction.options.getString(en.SetupActionStatusName);
            let autobanStatus = interaction.options.getString(en.SetupBlacklistAutobanName);
            let optionsLogging = interaction.options.getString(en.LoggingOptionsName);

            const Logging = sequelize.define("Logging", {
                GuildID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDReport: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDBan: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDVerify: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDEnterServer: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDWelcome: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                StaffRoleReport: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                StaffRoleVerify: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                RoleToAddVerify: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                RoleToRemoveVerify: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                EnableDisableBlacklistLogger: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDBlacklist: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDWarn: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDUnban: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDKick: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDReceiveVerification: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                AutoBanStatus: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                SettingsActionMessage: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                SettingsActionImage: {
                    type: Sequelize.STRING,
                    unique: false,
                }
            });

            const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

            let removeRole = removeRoleOptions;

            if (removeRole) removeRole = removeRoleOptions.name;
            if (!removeRole) removeRole = removeRoleOptions;

            switch (options) {
                case ("report"):
                    if (channelOptions) {
                        let role = roleOptions;
                        if (role) role = roleOptions.name;
                        if (!role) role = roleOptions;

                        if (role === "@everyone") {
                            const embed = new MessageEmbed()
                                .setDescription("Settings Error")
                                .addFields(
                                    { name: "**Role provided**", value: "This role (@everyone) cannot be used!", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        }

                        if (!LoggingData) {
                            if (!roleOptions) {
                                const ReportChannelCreateData = await Logging.create({
                                    GuildID: interaction.guild.id,
                                    ChannelIDReport: channelOptions.id,
                                })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            }

                            const ReportChannelCreateData = await Logging.create({
                                GuildID: interaction.guild.id,
                                ChannelIDReport: channelOptions.id,
                                StaffRoleReport: roleOptions.id,
                            })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Created")
                                .addFields(
                                    { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    { name: "**Role to Ping:**", value: "<@&" + roleOptions.id + ">", inline: true }
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        } else {
                            if (!roleOptions) {
                                const ReportChannelChangeData = await Logging.update({ ChannelIDReport: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            }

                            const ReportChannelChangeData = await Logging.update({ ChannelIDReport: channelOptions.id, StaffRoleReport: roleOptions.id }, { where: { GuildID: interaction.guild.id } })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Created")
                                .addFields(
                                    { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    { name: "**Role to Ping:**", value: "<@&" + roleOptions.id + ">", inline: true }
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        }
                    };
                case ("action"):
                    if (optionsLogging === "image") optionsLogging = "Image";
                    if (optionsLogging === "message") optionsLogging = "Message";
                    if (booleanBlacklist === "true") booleanBlacklist = "Enabled";
                    if (booleanBlacklist === "false") booleanBlacklist = "Disabled";

                    if (!LoggingData) {
                        if (optionsLogging === "Image") {
                            const ActionData = await Logging.create({
                                GuildID: interaction.guild.id,
                                SettingsActionMessage: booleanBlacklist,
                            })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Created")
                                .addFields(
                                    { name: "**Action Message**", value: booleanBlacklist, inline: true }
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        }

                        if (optionsLogging === "Message") {
                            const ActionData = await Logging.create({
                                GuildID: interaction.guild.id,
                                SettingsActionImage: booleanBlacklist,
                            })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Created")
                                .addFields(
                                    { name: "**Action Image**", value: booleanBlacklist, inline: true }
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        }
                    } else {
                        if (optionsLogging === "Image") {
                            const ActionData = await Logging.update({
                                SettingsActionMessage: booleanBlacklist,
                            }, { where: { GuildID: interaction.guild.id } })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Changed")
                                .addFields(
                                    { name: "**Action Message**", value: booleanBlacklist, inline: true }
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        }

                        if (optionsLogging === "Message") {
                            const ActionData = await Logging.update({
                                SettingsActionImage: booleanBlacklist,
                            }, { where: { GuildID: interaction.guild.id } })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Changed")
                                .addFields(
                                    { name: "**Action Image**", value: booleanBlacklist, inline: true }
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        }
                    }

                    return;
                case ("verification"):
                    if (channelOptions2 & staffRoleOptions & addRoleOptions) {
                        let removeRole = removeRoleOptions;
                        if (removeRole) removeRole = removeRoleOptions.name;
                        if (!removeRole) removeRole = removeRoleOptions;

                        if (staffRoleOptions.name === "@everyone" | addRoleOptions.name === "@everyone" | removeRole === "@everyone") {
                            const embed = new MessageEmbed()
                                .setDescription("Settings Error")
                                .addFields(
                                    { name: "**Role provided**", value: "This role, @everyone, cannot be used!", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        }

                        if (!LoggingData) {
                            if (!removeRoleOptions) {
                                const verificationChannelCreateData = await Logging.create({
                                    GuildID: interaction.guild.id,
                                    ChannelIDVerify: channelOptions2.id,
                                    StaffRoleVerify: staffRoleOptions.id,
                                    RoleToAddVerify: addRoleOptions.id,
                                });

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                        { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                        { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            };

                            const verificationChannelCreateData = await Logging.create({
                                GuildID: interaction.guild.id,
                                ChannelIDVerify: channelOptions2.id,
                                StaffRoleVerify: staffRoleOptions.id,
                                RoleToAddVerify: addRoleOptions.id,
                                RoleToRemoveVerify: removeRoleOptions.id,
                            });

                            const embed = new MessageEmbed()
                                .setDescription("Settings Created")
                                .addFields(
                                    { name: "**Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                    { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                    { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    { name: "**Role to Remove**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        } else {
                            if (!removeRoleOptions) {
                                const VerificationChannelChangeData1 = await Logging.update({
                                    ChannelIDVerify: channelOptions2.id,
                                    StaffRoleReport: staffRoleOptions.id,
                                    RoleToAddVerify: addRoleOptions.id
                                }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Changed")
                                    .addFields(
                                        { name: "**Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                        { name: "**Staff:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                        { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            };

                            const VerificationChannelChangeData1 = await Logging.update({
                                ChannelIDVerify: channelOptions2.id,
                                StaffRoleReport: staffRoleOptions.id,
                                RoleToAddVerify: addRoleOptions.id,
                                RoleToRemoveVerify: removeRoleOptions.id
                            }, { where: { GuildID: interaction.guild.id } })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Changed")
                                .addFields(
                                    { name: "**Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                    { name: "**Staff:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                    { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    { name: "**Role to remove:**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        };
                    };
                case ("welcome"):
                    if (channelOptions) {
                        if (!LoggingData) {
                            const ReportChannelCreateData = await Logging.create({
                                GuildID: interaction.guild.id,
                                ChannelIDWelcome: channelOptions.id,
                            })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Created")
                                .addFields(
                                    { name: "**Welcome Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        } else {
                            const ReportChannelChangeData = await Logging.update({ ChannelIDWelcome: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Created")
                                .addFields(
                                    { name: "**Welcome Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        }
                    };
                case ("blacklist"):
                    if (booleanBlacklist) {
                        if (booleanBlacklist === "true") booleanBlacklist = "Enabled";
                        if (booleanBlacklist === "false") booleanBlacklist = "Disabled";
                        if (autobanStatus === "low") autobanStatus = "Low+";
                        if (autobanStatus === "medium") autobanStatus = "Medium+";
                        if (autobanStatus === "high") autobanStatus = "High+";
                        if (autobanStatus === "disable") autobanStatus = "Disabled";

                        if (!LoggingData) {
                            if (!channelOptions) {
                                const blacklistData = await Logging.create({
                                    GuildID: interaction.guild.id,
                                    EnableDisableBlacklistLogger: booleanBlacklist,
                                    AutoBanStatus: autobanStatus
                                })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Status**", value: booleanBlacklist, inline: true },
                                        { name: "**Autoban**", value: autobanStatus, inline: true }
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })

                            }

                            if (!autobanStatus) {
                                const blacklistData = await Logging.create({
                                    GuildID: interaction.guild.id,
                                    EnableDisableBlacklistLogger: booleanBlacklist,
                                    ChannelIDBlacklist: channelOptions.id,
                                })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Status**", value: booleanBlacklist, inline: true },
                                        { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true }
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            }

                            const blacklistData = await Logging.create({
                                GuildID: interaction.guild.id,
                                EnableDisableBlacklistLogger: booleanBlacklist,
                                ChannelIDBlacklist: channelOptions.id,
                                AutoBanStatus: autobanStatus
                            })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Created")
                                .addFields(
                                    { name: "**Status**", value: booleanBlacklist, inline: true },
                                    { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    { name: "**Autoban**", value: autobanStatus, inline: true }
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        } else {
                            if (!channelOptions) {
                                const BlacklistChangeData = await Logging.update({
                                    EnableDisableBlacklistLogger: booleanBlacklist,
                                    AutoBanStatus: autobanStatus
                                }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Changed")
                                    .addFields(
                                        { name: "**Status**", value: booleanBlacklist, inline: true },
                                        { name: "**Autoban**", value: autobanStatus, inline: true }
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })

                            }

                            if (!autobanStatus) {
                                const BlacklistChangeData = await Logging.update({
                                    EnableDisableBlacklistLogger: booleanBlacklist,
                                    ChannelIDBlacklist: channelOptions.id,
                                }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Changed")
                                    .addFields(
                                        { name: "**Status**", value: booleanBlacklist, inline: true },
                                        { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true }
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            }

                            const BlacklistChangeData = await Logging.update({
                                EnableDisableBlacklistLogger: booleanBlacklist,
                                AutoBanStatus: autobanStatus,
                                ChannelIDBlacklist: channelOptions.id,
                            }, { where: { GuildID: interaction.guild.id } })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Created")
                                .addFields(
                                    { name: "**Status**", value: booleanBlacklist, inline: true },
                                    { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    { name: "**Autoban**", value: autobanStatus, inline: true }
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        }
                    };
                case ("logging"):
                    switch (optionsLogging) {
                        case ("all"):
                            if (channelOptions) {
                                if (!LoggingData) {
                                    const allChannelCreateData = await Logging.create({
                                        GuildID: interaction.guild.id,
                                        ChannelIDBan: channelOptions.id,
                                        ChannelIDUnban: channelOptions.id,
                                        ChannelIDKick: channelOptions.id,
                                        ChannelIDWarn: channelOptions.id,
                                    })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Created")
                                        .addFields(
                                            { name: "**Channel**", value: "<#" + channelOptions.id + ">!", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    })
                                }

                                const allChannelChangeData = await Logging.update({ ChannelIDBan: channelOptions.id, ChannelIDUnban: channelOptions.id, ChannelIDKick: channelOptions.id, ChannelIDWarn: channelOptions.id, }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Changed")
                                    .addFields(
                                        { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            } else {
                                return interaction.reply({
                                    content: "Please select a channel when selecting this option."
                                })
                            };
                        case ("ban"):
                            if (channelOptions) {
                                if (!LoggingData) {
                                    const banChannelCreateData = await Logging.create({
                                        GuildID: interaction.guild.id,
                                        ChannelIDBan: channelOptions.id,
                                    })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Created")
                                        .addFields(
                                            { name: "**Channel**", value: "<#" + channelOptions.id + ">!", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    })
                                }

                                const banChannelChangeData = await Logging.update({ ChannelIDBan: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Changed")
                                    .addFields(
                                        { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            } else {
                                return interaction.reply({
                                    content: "Please select a channel when selecting this option."
                                })
                            };
                        case ("kick"):
                            if (channelOptions) {
                                if (!LoggingData) {
                                    const kickChannelCreateData = await Logging.create({
                                        GuildID: interaction.guild.id,
                                        ChannelIDKick: channelOptions.id,
                                    })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Created")
                                        .addFields(
                                            { name: "**Channel**", value: "<#" + channelOptions.id + ">!", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    })
                                }

                                const kickChannelChangeData = await Logging.update({ ChannelIDKick: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Changed")
                                    .addFields(
                                        { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            } else {
                                return interaction.reply({
                                    content: "Please select a channel when selecting this option."
                                })
                            };
                        case ("warn"):
                            if (channelOptions) {
                                if (!LoggingData) {
                                    const warnChannelCreateData = await Logging.create({
                                        GuildID: interaction.guild.id,
                                        ChannelIDWarn: channelOptions.id,
                                    })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Created")
                                        .addFields(
                                            { name: "**Channel**", value: "<#" + channelOptions.id + ">!", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    })
                                }

                                const warnChannelChangeData = await Logging.update({ ChannelIDWarn: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Changed")
                                    .addFields(
                                        { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            } else {
                                return interaction.reply({
                                    content: "Please select a channel when selecting this option."
                                })
                            };
                        case ("unban"):
                            if (channelOptions) {
                                if (!LoggingData) {
                                    const banChannelCreateData = await Logging.create({
                                        GuildID: interaction.guild.id,
                                        ChannelIDUnban: channelOptions.id,
                                    })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Created")
                                        .addFields(
                                            { name: "**Channel**", value: "<#" + channelOptions.id + ">!", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    })
                                }

                                const banChannelChangeData = await Logging.update({ ChannelIDUnban: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Changed")
                                    .addFields(
                                        { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            } else {
                                return interaction.reply({
                                    content: "Please select a channel when selecting this option."
                                })
                            };
                        case ("disable"):
                            if (!LoggingData) {
                                const banChannelCreateData = await Logging.create({
                                    GuildID: interaction.guild.id,
                                    ChannelIDBan: null,
                                    ChannelIDUnban: null,
                                    ChannelIDKick: null,
                                    ChannelIDWarn: null,
                                })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Channel**", value: null, inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            }

                            const allChannelChangeData = await Logging.update({ ChannelIDBan: null, ChannelIDUnban: null, ChannelIDKick: null, ChannelIDWarn: null, }, { where: { GuildID: interaction.guild.id } })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Changed")
                                .addFields(
                                    { name: "**Channel**", value: null, inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                    };
                case ("command"):
                    if (channelOptions2 & staffRoleOptions & addRoleOptions) {
                        if (staffRoleOptions.name === "@everyone" | addRoleOptions.name === "@everyone" | removeRole === "@everyone") {
                            const embed = new MessageEmbed()
                                .setDescription("Settings Error")
                                .addFields(
                                    { name: "**Role provided**", value: "This role, @everyone, cannot be used!", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        }

                        if (!LoggingData) {
                            if (!removeRoleOptions) {
                                const verificationChannelCreateData = await Logging.create({
                                    GuildID: interaction.guild.id,
                                    ChannelIDVerify: channelOptions2.id,
                                    StaffRoleVerify: staffRoleOptions.id,
                                    RoleToAddVerify: addRoleOptions.id,
                                });

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Welcome Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                        { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                        { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            };

                            const verificationChannelCreateData = await Logging.create({
                                GuildID: interaction.guild.id,
                                ChannelIDVerify: channelOptions2.id,
                                StaffRoleVerify: staffRoleOptions.id,
                                RoleToAddVerify: addRoleOptions.id,
                                RoleToRemoveVerify: removeRoleOptions.id,
                            });

                            const embed = new MessageEmbed()
                                .setDescription("Settings Created")
                                .addFields(
                                    { name: "**Welcome Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                    { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                    { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    { name: "**Role to Remove**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        } else {
                            if (!removeRoleOptions) {
                                const VerificationChannelChangeData1 = await Logging.update({
                                    ChannelIDVerify: channelOptions2.id,
                                    StaffRoleReport: staffRoleOptions.id,
                                    RoleToAddVerify: addRoleOptions.id
                                }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Changed")
                                    .addFields(
                                        { name: "**Welcome Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                        { name: "**Staff:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                        { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            };

                            const VerificationChannelChangeData1 = await Logging.update({
                                ChannelIDVerify: channelOptions2.id,
                                StaffRoleReport: staffRoleOptions.id,
                                RoleToAddVerify: addRoleOptions.id,
                                RoleToRemoveVerify: removeRoleOptions.id
                            }, { where: { GuildID: interaction.guild.id } })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Changed")
                                .addFields(
                                    { name: "**Welcome Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                    { name: "**Staff:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                    { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    { name: "**Role to remove:**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        };

                    };
                case ("menu"):
                    if (channelOptions2 & channelOptions3 & staffRoleOptions & addRoleOptions) {

                        if (staffRoleOptions.name === "@everyone" | addRoleOptions.name === "@everyone" | removeRole === "@everyone") {
                            const embed = new MessageEmbed()
                                .setDescription("Settings Error")
                                .addFields(
                                    { name: "**Role provided**", value: "This role, @everyone, cannot be used!", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            })
                        }

                        if (!LoggingData) {
                            if (!removeRoleOptions) {
                                const verificationChannelCreateData = await Logging.create({
                                    GuildID: interaction.guild.id,
                                    ChannelIDVerify: channelOptions2.id,
                                    ChannelIDReceiveVerification: channelOptions3.id,
                                    StaffRoleVerify: staffRoleOptions.id,
                                    RoleToAddVerify: addRoleOptions.id,
                                });

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Welcome Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                        { name: "**Receive Channel**", value: "<#" + channelOptions3.id + ">", inline: true },
                                        { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                        { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            };

                            const verificationChannelCreateData = await Logging.create({
                                GuildID: interaction.guild.id,
                                ChannelIDVerify: channelOptions2.id,
                                ChannelIDReceiveVerification: channelOptions3.id,
                                StaffRoleVerify: staffRoleOptions.id,
                                RoleToAddVerify: addRoleOptions.id,
                                RoleToRemoveVerify: removeRoleOptions.id,
                            });

                            const embed = new MessageEmbed()
                                .setDescription("Settings Created")
                                .addFields(
                                    { name: "**Welcome Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                    { name: "**Receive Channel**", value: "<#" + channelOptions3.id + ">", inline: true },
                                    { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                    { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    { name: "**Role to Remove**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        } else {
                            if (!removeRoleOptions) {
                                const VerificationChannelChangeData1 = await Logging.update({
                                    ChannelIDVerify: channelOptions2.id,
                                    ChannelIDReceiveVerification: channelOptions3.id,
                                    StaffRoleReport: staffRoleOptions.id,
                                    RoleToAddVerify: addRoleOptions.id
                                }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Changed")
                                    .addFields(
                                        { name: "**Welcome Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                        { name: "**Receive Channel**", value: "<#" + channelOptions3.id + ">", inline: true },
                                        { name: "**Staff Role:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                        { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            };

                            const VerificationChannelChangeData1 = await Logging.update({
                                ChannelIDVerify: channelOptions2.id,
                                ChannelIDReceiveVerification: channelOptions3.id,
                                StaffRoleReport: staffRoleOptions.id,
                                RoleToAddVerify: addRoleOptions.id,
                                RoleToRemoveVerify: removeRoleOptions.id,
                            }, { where: { GuildID: interaction.guild.id } })

                            const embed = new MessageEmbed()
                                .setDescription("Settings Changed")
                                .addFields(
                                    { name: "**Welcome Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                    { name: "**Receive Channel**", value: "<#" + channelOptions3.id + ">", inline: true },
                                    { name: "**Staff Role:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                    { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                    { name: "**Role to remove:**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                )

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        }
                    };
            }
        } else {
            return interaction.reply({
                content: "You cannot execute that command! You need the following permission: ``ADMINISTRATOR`` or ``MANAGE_GUILD``.",
                ephemeral: true,
            })
        }
    }
};