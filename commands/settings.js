const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Logging = require("../config/logging.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");

const fr = LanguageFR.settings;
const en = LanguageEN.settings;

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The '" + en.Name + "' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.Name)
        .setNameLocalizations({
            "fr": fr.Name,
        })
        .setDescription(en.Description)
        .setDescriptionLocalizations({
            "fr": fr.Description,
        })

        // Setup

        .addSubcommandGroup(group => group
            .setName(en.SetupName)
            .setNameLocalizations({
                "fr": fr.SetupName,
            })
            .setDescription(en.SetupDescription)
            .setDescriptionLocalizations({
                "fr": fr.SetupDescription,
            })
            .addSubcommand(subcommand => subcommand
                .setName(en.SetupReportName)
                .setNameLocalizations({
                    "fr": fr.SetupReportName,
                })
                .setDescription(en.SetupReportDescription)
                .setDescriptionLocalizations({
                    "fr": fr.SetupReportDescription,
                })
                .addChannelOption(option => option
                    .setName(en.SetupReportChannelName)
                    .setNameLocalizations({
                        "fr": fr.SetupReportChannelName,
                    })
                    .setDescription(en.SetupReportChannelDescription)
                    .setDescriptionLocalizations({
                        "fr": fr.SetupReportChannelDescription,
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.SetupReportRoleName)
                    .setNameLocalizations({
                        "fr": fr.SetupReportRoleName,
                    })
                    .setDescription(en.SetupReportRoleDescription)
                    .setDescriptionLocalizations({
                        "fr": fr.SetupReportRoleDescription,
                    })
                    .setRequired(false)))
            .addSubcommand(subcommand => subcommand
                .setName(en.SetupWelcomeName)
                .setNameLocalizations({
                    "fr": fr.SetupWelcomeName,
                })
                .setDescription(en.SetupWelcomeDescription)
                .setDescriptionLocalizations({
                    "fr": fr.SetupWelcomeDescription,
                })
                .addChannelOption(option => option
                    .setName(en.SetupWelcomeChannelName)
                    .setNameLocalizations({
                        "fr": fr.SetupWelcomeChannelName,
                    })
                    .setDescription(en.SetupWelcomeChannelDescription)
                    .setDescriptionLocalizations({
                        "fr": fr.SetupWelcomeChannelDescription,
                    })
                    .setRequired(true)))
            .addSubcommand(subcommand => subcommand
                .setName("blacklist")
                .setDescription("Change the settings of the Blacklist System.")
                .addStringOption(option => option
                    .setName("status")
                    .setDescription("Enable/Disable")
                    .setRequired(true)
                    .addChoices(
                        { name: "Enable", value: "true" },
                        { name: "Disable", value: "false" },
                    ))
                .addChannelOption(option => option
                    .setName("channel")
                    .setDescription("Channel to receive the alert.")
                    .setRequired(false))
                .addStringOption(option => option
                    .setName("autoban")
                    .setDescription("Enable/Disable")
                    .setRequired(false)
                    .addChoices(
                        { name: "Low+", value: "low" },
                        { name: "Medium+", value: "medium" },
                        { name: "High+", value: "high" },
                        { name: "Disable", value: "disable" },
                    )))
            .addSubcommand(subcommand => subcommand
                .setName("action")
                .setDescription("Change the settings of the action command.")
                .addStringOption(option => option
                    .setName("options")
                    .setDescription("Which command to change the settings.")
                    .setRequired(true)
                    .addChoices(
                        { name: "Image", value: "image" },
                        { name: "Message", value: "message" },
                    ))
                .addStringOption(option => option
                    .setName("status")
                    .setDescription("Enable/Disable")
                    .setRequired(true)
                    .addChoices(
                        { name: "Enable", value: "true" },
                        { name: "Disable", value: "false" },
                    ))))

        // Verification

        .addSubcommandGroup(group => group
            .setName("verification")
            .setDescription("Change the settings of the verification system.")
            .addSubcommand(subcommand => subcommand
                .setName("command")
                .setDescription("Change the settings of the verification command.")
                .addChannelOption(option => option.setName("welcome").setDescription("Channel to send the welcome message.").setRequired(true))
                .addRoleOption(option => option.setName("staff").setDescription("Role that can verify.").setRequired(true))
                .addRoleOption(option => option.setName("add").setDescription("Role to give.").setRequired(true))
                .addRoleOption(option => option.setName("remove").setDescription("Role to remove.").setRequired(false)))
            .addSubcommand(subcommand => subcommand
                .setName("menu")
                .setDescription("Change the settings of the verification menu.")
                .addChannelOption(option => option.setName("welcome").setDescription("Channel to send the welcome message.").setRequired(true))
                .addChannelOption(option => option.setName("receive").setDescription("Channel to receive the verification.").setRequired(true))
                .addRoleOption(option => option.setName("staff").setDescription("Role that can verify.").setRequired(true))
                .addRoleOption(option => option.setName("add").setDescription("Role to give.").setRequired(true))
                .addRoleOption(option => option.setName("remove").setDescription("Role to remove.").setRequired(false))))

        // Logging

        .addSubcommand(subcommand => subcommand
            .setName("logging")
            .setDescription(Logging.LoggingDescription)
            .addStringOption(option => option
                .setName("options")
                .setDescription(Logging.OptionsLog)
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
                .setName("channel")
                .setDescription(Logging.ChannelSendLog)
                .setRequired(false))),

    execute: async (interaction, bot, sequelize, Sequelize) => {
        if (interaction.member.permissions.has("ADMINISTRATOR") | interaction.member.permissions.has("MANAGE_GUILD") | interaction.user.id === '291262778730217472') {
            let options = interaction.options.getSubcommand();
            let channelOptions = interaction.options.getChannel("channel");
            let channelOptions2 = interaction.options.getChannel("welcome");
            let channelOptions3 = interaction.options.getChannel("receive");
            let roleOptions = interaction.options.getRole("role");
            let addRoleOptions = interaction.options.getRole("add");
            let removeRoleOptions = interaction.options.getRole("remove");
            let staffRoleOptions = interaction.options.getRole("staff");
            let booleanBlacklist = interaction.options.getString("status");
            let autobanStatus = interaction.options.getString("autoban");
            let optionsLogging = interaction.options.getString("options");

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