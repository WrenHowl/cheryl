const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const loggingPreset = require("../settings/logging.json");
const configPreset = require("../settings/config.json");
const messagePreset = require("../settings/message.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.settings.default.name)
        .setNameLocalizations({
            "fr": fr.settings.default.name,
            "de": de.settings.default.name,
            "es-ES": sp.settings.default.name,
            "nl": nl.settings.default.name
        })
        .setDescription(en.settings.default.description)
        .setDescriptionLocalizations({
            "fr": fr.settings.default.description,
            "de": de.settings.default.description,
            "es-ES": sp.settings.default.description,
            "nl": nl.settings.default.description
        })

        // Setup Group

        .addSubcommandGroup(group => group
            .setName(en.settings.default.setup.name)
            .setNameLocalizations({
                "fr": fr.settings.default.setup.name,
                "de": de.settings.default.setup.name,
                "es-ES": sp.settings.default.setup.name,
                "nl": nl.settings.default.setup.name
            })
            .setDescription(en.settings.default.setup.description)
            .setDescriptionLocalizations({
                "fr": fr.settings.default.setup.description,
                "de": de.settings.default.setup.description,
                "es-ES": sp.settings.default.setup.description,
                "nl": nl.settings.default.setup.description
            })

            // Report System

            .addSubcommand(subcommand => subcommand
                .setName(en.settings.default.setup.report_system.name)
                .setNameLocalizations({
                    "fr": fr.settings.default.setup.report_system.name,
                    "de": de.settings.default.setup.report_system.name,
                    "es-ES": sp.settings.default.setup.report_system.name,
                    "nl": nl.settings.default.setup.report_system.name
                })
                .setDescription(en.settings.default.setup.report_system.description)
                .setDescriptionLocalizations({
                    "fr": fr.settings.default.setup.report_system.description,
                    "de": de.settings.default.setup.report_system.description,
                    "es-ES": sp.settings.default.setup.report_system.description,
                    "nl": nl.settings.default.setup.report_system.description
                })
                .addChannelOption(option => option
                    .setName(en.settings.default.setup.report_system.channel.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.report_system.channel.name,
                        "de": de.settings.default.setup.report_system.channel.name,
                        "es-ES": sp.settings.default.setup.report_system.channel.name,
                        "nl": nl.settings.default.setup.report_system.channel.name
                    })
                    .setDescription(en.settings.default.setup.report_system.channel.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.report_system.channel.description,
                        "de": de.settings.default.setup.report_system.channel.description,
                        "es-ES": sp.settings.default.setup.report_system.channel.description,
                        "nl": nl.settings.default.setup.report_system.channel.description
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.settings.default.setup.report_system.staffRole.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.report_system.staffRole.name,
                        "de": de.settings.default.setup.report_system.staffRole.name,
                        "es-ES": sp.settings.default.setup.report_system.staffRole.name,
                        "nl": nl.settings.default.setup.report_system.staffRole.name
                    })
                    .setDescription(en.settings.default.setup.report_system.staffRole.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.report_system.staffRole.description,
                        "de": de.settings.default.setup.report_system.staffRole.description,
                        "es-ES": sp.settings.default.setup.report_system.staffRole.description,
                        "nl": nl.settings.default.setup.report_system.staffRole.description
                    })
                    .setRequired(false)))

            // Welcome System

            .addSubcommand(subcommand => subcommand
                .setName(en.settings.default.setup.welcome_system.name)
                .setNameLocalizations({
                    "fr": fr.settings.default.setup.welcome_system.name,
                    "de": de.settings.default.setup.welcome_system.name,
                    "es-ES": sp.settings.default.setup.welcome_system.name,
                    "nl": nl.settings.default.setup.welcome_system.name
                })
                .setDescription(en.settings.default.setup.welcome_system.description)
                .setDescriptionLocalizations({
                    "fr": fr.settings.default.setup.welcome_system.description,
                    "de": de.settings.default.setup.welcome_system.description,
                    "es-ES": sp.settings.default.setup.welcome_system.description,
                    "nl": nl.settings.default.setup.welcome_system.description
                })
                .addChannelOption(option => option
                    .setName(en.settings.default.setup.welcome_system.channel.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.welcome_system.channel.name,
                        "de": de.settings.default.setup.welcome_system.channel.name,
                        "es-ES": sp.settings.default.setup.welcome_system.channel.name,
                        "nl": nl.settings.default.setup.welcome_system.channel.name
                    })
                    .setDescription(en.settings.default.setup.welcome_system.channel.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.welcome_system.channel.description,
                        "de": de.settings.default.setup.welcome_system.channel.description,
                        "es-ES": sp.settings.default.setup.welcome_system.channel.description,
                        "nl": nl.settings.default.setup.welcome_system.channel.description
                    })
                    .setRequired(false))
                .addRoleOption(option => option
                    .setName(en.settings.default.setup.welcome_system.autorole.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.welcome_system.autorole.name,
                        "de": de.settings.default.setup.welcome_system.autorole.name,
                        "es-ES": sp.settings.default.setup.welcome_system.autorole.name,
                        "nl": nl.settings.default.setup.welcome_system.autorole.name
                    })
                    .setDescription(en.settings.default.setup.welcome_system.autorole.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.welcome_system.autorole.description,
                        "de": de.settings.default.setup.welcome_system.autorole.description,
                        "es-ES": sp.settings.default.setup.welcome_system.autorole.description,
                        "nl": nl.settings.default.setup.welcome_system.autorole.description
                    })
                    .setRequired(false)))

            // Blacklist System

            .addSubcommand(subcommand => subcommand
                .setName(en.settings.default.setup.blacklist_system.name)
                .setNameLocalizations({
                    "fr": fr.settings.default.setup.blacklist_system.name,
                    "de": de.settings.default.setup.blacklist_system.name,
                    "es-ES": sp.settings.default.setup.blacklist_system.name,
                    "nl": nl.settings.default.setup.blacklist_system.name
                })
                .setDescription(en.settings.default.setup.blacklist_system.description)
                .setDescriptionLocalizations({
                    "fr": fr.settings.default.setup.blacklist_system.description,
                    "de": de.settings.default.setup.blacklist_system.description,
                    "es-ES": sp.settings.default.setup.blacklist_system.description,
                    "nl": nl.settings.default.setup.blacklist_system.description
                })
                .addStringOption(option => option
                    .setName(en.settings.default.setup.blacklist_system.status.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.blacklist_system.status.name,
                        "de": de.settings.default.setup.blacklist_system.status.name,
                        "es-ES": sp.settings.default.setup.blacklist_system.status.name,
                        "nl": nl.settings.default.setup.blacklist_system.status.name
                    })
                    .setDescription(en.settings.default.setup.blacklist_system.status.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.blacklist_system.status.description,
                        "de": de.settings.default.setup.blacklist_system.status.description,
                        "es-ES": sp.settings.default.setup.blacklist_system.status.description,
                        "nl": nl.settings.default.setup.blacklist_system.status.description
                    })
                    .setRequired(true)
                    .addChoices(
                        { name: "Enable", value: "true" },
                        { name: "Disable", value: "false" },
                    ))
                .addChannelOption(option => option
                    .setName(en.settings.default.setup.blacklist_system.channel.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.blacklist_system.channel.name,
                        "de": de.settings.default.setup.blacklist_system.channel.name,
                        "es-ES": sp.settings.default.setup.blacklist_system.channel.name,
                        "nl": nl.settings.default.setup.blacklist_system.channel.name
                    })
                    .setDescription(en.settings.default.setup.blacklist_system.channel.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.blacklist_system.channel.description,
                        "de": de.settings.default.setup.blacklist_system.channel.description,
                        "es-ES": sp.settings.default.setup.blacklist_system.channel.description,
                        "nl": nl.settings.default.setup.blacklist_system.channel.description
                    })
                    .setRequired(false))
                .addStringOption(option => option
                    .setName(en.settings.default.setup.blacklist_system.autoban.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.blacklist_system.autoban.name,
                        "de": de.settings.default.setup.blacklist_system.autoban.name,
                        "es-ES": sp.settings.default.setup.blacklist_system.autoban.name,
                        "nl": nl.settings.default.setup.blacklist_system.autoban.name
                    })
                    .setDescription(en.settings.default.setup.blacklist_system.autoban.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.blacklist_system.autoban.description,
                        "de": de.settings.default.setup.blacklist_system.autoban.description,
                        "es-ES": sp.settings.default.setup.blacklist_system.autoban.description,
                        "nl": nl.settings.default.setup.blacklist_system.autoban.description
                    })
                    .setRequired(false)
                    .addChoices(
                        { name: "Low+", value: "low" },
                        { name: "Medium+", value: "medium" },
                        { name: "High+", value: "high" },
                        { name: "Disable", value: "disable" },
                    )))

            // Action System

            .addSubcommand(subcommand => subcommand
                .setName(en.settings.default.setup.action_system.name)
                .setNameLocalizations({
                    "fr": fr.settings.default.setup.action_system.name,
                    "de": de.settings.default.setup.action_system.name,
                    "es-ES": sp.settings.default.setup.action_system.name,
                    "nl": nl.settings.default.setup.action_system.name
                })
                .setDescription(en.settings.default.setup.action_system.description)
                .setDescriptionLocalizations({
                    "fr": fr.settings.default.setup.action_system.description,
                    "de": de.settings.default.setup.action_system.description,
                    "es-ES": sp.settings.default.setup.action_system.description,
                    "nl": nl.settings.default.setup.action_system.description
                })
                .addStringOption(option => option
                    .setName(en.settings.default.setup.action_system.options.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.action_system.options.name,
                        "de": de.settings.default.setup.action_system.options.name,
                        "es-ES": sp.settings.default.setup.action_system.options.name,
                        "nl": nl.settings.default.setup.action_system.options.name
                    })
                    .setDescription(en.settings.default.setup.action_system.options.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.action_system.options.description,
                        "de": de.settings.default.setup.action_system.options.description,
                        "es-ES": sp.settings.default.setup.action_system.options.description,
                        "nl": nl.settings.default.setup.action_system.options.description
                    })
                    .setRequired(true)
                    .addChoices(
                        { name: "Image", value: "image" },
                        { name: "Message", value: "message" },
                    ))
                .addStringOption(option => option
                    .setName(en.settings.default.setup.action_system.status.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.action_system.status.name,
                        "de": de.settings.default.setup.action_system.status.name,
                        "es-ES": sp.settings.default.setup.action_system.status.name,
                        "nl": nl.settings.default.setup.action_system.status.name
                    })
                    .setDescription(en.settings.default.setup.action_system.status.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.action_system.status.description,
                        "de": de.settings.default.setup.action_system.status.description,
                        "es-ES": sp.settings.default.setup.action_system.status.description,
                        "nl": nl.settings.default.setup.action_system.status.description
                    })
                    .setRequired(true)
                    .addChoices(
                        { name: "Enable", value: "true" },
                        { name: "Disable", value: "false" },
                    ))))

        // Verification System Group

        .addSubcommandGroup(group => group
            .setName(en.settings.default.setup.verification_system.name)
            .setNameLocalizations({
                "fr": fr.settings.default.setup.verification_system.name,
                "de": de.settings.default.setup.verification_system.name,
                "es-ES": sp.settings.default.setup.verification_system.name,
                "nl": nl.settings.default.setup.verification_system.name
            })
            .setDescription(en.settings.default.setup.verification_system.description)
            .setDescriptionLocalizations({
                "fr": fr.settings.default.setup.verification_system.description,
                "de": de.settings.default.setup.verification_system.description,
                "es-ES": sp.settings.default.setup.verification_system.description,
                "nl": nl.settings.default.setup.verification_system.description
            })
            .addSubcommand(subcommand => subcommand
                .setName(en.settings.default.setup.verification_system.command.name)
                .setNameLocalizations({
                    "fr": fr.settings.default.setup.verification_system.command.name,
                    "de": de.settings.default.setup.verification_system.command.name,
                    "es-ES": sp.settings.default.setup.verification_system.command.name,
                    "nl": nl.settings.default.setup.verification_system.command.name
                })
                .setDescription(en.settings.default.setup.verification_system.command.description)
                .setDescriptionLocalizations({
                    "fr": fr.settings.default.setup.verification_system.command.description,
                    "de": de.settings.default.setup.verification_system.command.description,
                    "es-ES": sp.settings.default.setup.verification_system.command.description,
                    "nl": nl.settings.default.setup.verification_system.command.description
                })
                .addChannelOption(option => option
                    .setName(en.settings.default.setup.verification_system.command.channel.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.verification_system.command.channel.name,
                        "de": de.settings.default.setup.verification_system.command.channel.name,
                        "es-ES": sp.settings.default.setup.verification_system.command.channel.name,
                        "nl": nl.settings.default.setup.verification_system.command.channel.name
                    })
                    .setDescription(en.settings.default.setup.verification_system.command.channel.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.verification_system.command.channel.description,
                        "de": de.settings.default.setup.verification_system.command.channel.description,
                        "es-ES": sp.settings.default.setup.verification_system.command.channel.description,
                        "nl": nl.settings.default.setup.verification_system.command.channel.description
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.settings.default.setup.verification_system.command.staffRole.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.verification_system.command.staffRole.name,
                        "de": de.settings.default.setup.verification_system.command.staffRole.name,
                        "es-ES": sp.settings.default.setup.verification_system.command.staffRole.name,
                        "nl": nl.settings.default.setup.verification_system.command.staffRole.name
                    })
                    .setDescription(en.settings.default.setup.verification_system.command.staffRole.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.verification_system.command.staffRole.description,
                        "de": de.settings.default.setup.verification_system.command.staffRole.description,
                        "es-ES": sp.settings.default.setup.verification_system.command.staffRole.description,
                        "nl": nl.settings.default.setup.verification_system.command.staffRole.description
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.settings.default.setup.verification_system.command.addRole.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.verification_system.command.addRole.name,
                        "de": de.settings.default.setup.verification_system.command.addRole.name,
                        "es-ES": sp.settings.default.setup.verification_system.command.addRole.name,
                        "nl": nl.settings.default.setup.verification_system.command.addRole.name
                    })
                    .setDescription(en.settings.default.setup.verification_system.command.addRole.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.verification_system.command.addRole.description,
                        "de": de.settings.default.setup.verification_system.command.addRole.description,
                        "es-ES": sp.settings.default.setup.verification_system.command.addRole.description,
                        "nl": nl.settings.default.setup.verification_system.command.addRole.description
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.settings.default.setup.verification_system.command.removeRole.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.verification_system.command.removeRole.name,
                        "de": de.settings.default.setup.verification_system.command.removeRole.name,
                        "es-ES": sp.settings.default.setup.verification_system.command.removeRole.name,
                        "nl": nl.settings.default.setup.verification_system.command.removeRole.name
                    })
                    .setDescription(en.settings.default.setup.verification_system.command.removeRole.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.verification_system.command.removeRole.description,
                        "de": de.settings.default.setup.verification_system.command.removeRole.description,
                        "es-ES": sp.settings.default.setup.verification_system.command.removeRole.description,
                        "nl": nl.settings.default.setup.verification_system.command.removeRole.description
                    })
                    .setRequired(false)))
            .addSubcommand(subcommand => subcommand
                .setName(en.settings.default.setup.verification_system.menu.name)
                .setNameLocalizations({
                    "fr": fr.settings.default.setup.verification_system.menu.name,
                    "de": de.settings.default.setup.verification_system.menu.name,
                    "es-ES": sp.settings.default.setup.verification_system.menu.name,
                    "nl": nl.settings.default.setup.verification_system.menu.name
                })
                .setDescription(en.settings.default.setup.verification_system.menu.description)
                .setDescriptionLocalizations({
                    "fr": fr.settings.default.setup.verification_system.menu.description,
                    "de": de.settings.default.setup.verification_system.menu.description,
                    "es-ES": sp.settings.default.setup.verification_system.menu.description,
                    "nl": nl.settings.default.setup.verification_system.menu.description
                })
                .addChannelOption(option => option
                    .setName(en.settings.default.setup.verification_system.menu.channel.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.verification_system.menu.channel.name,
                        "de": de.settings.default.setup.verification_system.menu.channel.name,
                        "es-ES": sp.settings.default.setup.verification_system.menu.channel.name,
                        "nl": nl.settings.default.setup.verification_system.menu.channel.name
                    })
                    .setDescription(en.settings.default.setup.verification_system.menu.channel.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.verification_system.menu.channel.description,
                        "de": de.settings.default.setup.verification_system.menu.channel.description,
                        "es-ES": sp.settings.default.setup.verification_system.menu.channel.description,
                        "nl": nl.settings.default.setup.verification_system.menu.channel.description
                    })
                    .setRequired(true))
                .addChannelOption(option => option
                    .setName(en.settings.default.setup.verification_system.menu.receiveChannel.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.verification_system.menu.receiveChannel.name,
                        "de": de.settings.default.setup.verification_system.menu.receiveChannel.name,
                        "es-ES": sp.settings.default.setup.verification_system.menu.receiveChannel.name,
                        "nl": nl.settings.default.setup.verification_system.menu.receiveChannel.name
                    })
                    .setDescription(en.settings.default.setup.verification_system.menu.receiveChannel.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.verification_system.menu.receiveChannel.description,
                        "de": de.settings.default.setup.verification_system.menu.receiveChannel.description,
                        "es-ES": sp.settings.default.setup.verification_system.menu.receiveChannel.description,
                        "nl": nl.settings.default.setup.verification_system.menu.receiveChannel.description
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.settings.default.setup.verification_system.menu.staffRole.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.verification_system.menu.staffRole.name,
                        "de": de.settings.default.setup.verification_system.menu.staffRole.name,
                        "es-ES": sp.settings.default.setup.verification_system.menu.staffRole.name,
                        "nl": nl.settings.default.setup.verification_system.menu.staffRole.name
                    })
                    .setDescription(en.settings.default.setup.verification_system.menu.staffRole.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.verification_system.menu.staffRole.description,
                        "de": de.settings.default.setup.verification_system.menu.staffRole.description,
                        "es-ES": sp.settings.default.setup.verification_system.menu.staffRole.description,
                        "nl": nl.settings.default.setup.verification_system.menu.staffRole.description
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.settings.default.setup.verification_system.menu.addRole.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.verification_system.menu.addRole.name,
                        "de": de.settings.default.setup.verification_system.menu.addRole.name,
                        "es-ES": sp.settings.default.setup.verification_system.menu.addRole.name,
                        "nl": nl.settings.default.setup.verification_system.menu.addRole.name
                    })
                    .setDescription(en.settings.default.setup.verification_system.menu.addRole.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.verification_system.menu.addRole.description,
                        "de": de.settings.default.setup.verification_system.menu.addRole.description,
                        "es-ES": sp.settings.default.setup.verification_system.menu.addRole.description,
                        "nl": nl.settings.default.setup.verification_system.menu.addRole.description
                    })
                    .setRequired(true))
                .addRoleOption(option => option
                    .setName(en.settings.default.setup.verification_system.menu.removeRole.name)
                    .setNameLocalizations({
                        "fr": fr.settings.default.setup.verification_system.menu.removeRole.name,
                        "de": de.settings.default.setup.verification_system.menu.removeRole.name,
                        "es-ES": sp.settings.default.setup.verification_system.menu.removeRole.name,
                        "nl": nl.settings.default.setup.verification_system.menu.removeRole.name
                    })
                    .setDescription(en.settings.default.setup.verification_system.menu.removeRole.description)
                    .setDescriptionLocalizations({
                        "fr": fr.settings.default.setup.verification_system.menu.removeRole.description,
                        "de": de.settings.default.setup.verification_system.menu.removeRole.description,
                        "es-ES": sp.settings.default.setup.verification_system.menu.removeRole.description,
                        "nl": nl.settings.default.setup.verification_system.menu.removeRole.description
                    })
                    .setRequired(false))))

        // Logging System

        .addSubcommand(subcommand => subcommand
            .setName(en.settings.default.setup.logging_system.name)
            .setNameLocalizations({
                "fr": fr.settings.default.setup.logging_system.name,
                "de": de.settings.default.setup.logging_system.name,
                "es-ES": sp.settings.default.setup.logging_system.name,
                "nl": nl.settings.default.setup.logging_system.name
            })
            .setDescription(en.settings.default.setup.logging_system.description)
            .setDescriptionLocalizations({
                "fr": fr.settings.default.setup.logging_system.description,
                "de": de.settings.default.setup.logging_system.description,
                "es-ES": sp.settings.default.setup.logging_system.description,
                "nl": nl.settings.default.setup.logging_system.description
            })
            .addStringOption(option => option
                .setName(en.settings.default.setup.logging_system.options.name)
                .setNameLocalizations({
                    "fr": fr.settings.default.setup.logging_system.options.name,
                    "de": de.settings.default.setup.logging_system.options.name,
                    "es-ES": sp.settings.default.setup.logging_system.options.name,
                    "nl": nl.settings.default.setup.logging_system.options.name
                })
                .setDescription(en.settings.default.setup.logging_system.options.description)
                .setDescriptionLocalizations({
                    "fr": fr.settings.default.setup.logging_system.options.description,
                    "de": de.settings.default.setup.logging_system.options.description,
                    "es-ES": sp.settings.default.setup.logging_system.options.description,
                    "nl": nl.settings.default.setup.logging_system.options.description
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
                .setName(en.settings.default.setup.logging_system.channel.name)
                .setNameLocalizations({
                    "fr": fr.settings.default.setup.logging_system.channel.name,
                    "de": de.settings.default.setup.logging_system.channel.name,
                    "es-ES": sp.settings.default.setup.logging_system.channel.name,
                    "nl": nl.settings.default.setup.logging_system.channel.name
                })
                .setDescription(en.settings.default.setup.logging_system.channel.description)
                .setDescriptionLocalizations({
                    "fr": fr.settings.default.setup.logging_system.channel.description,
                    "de": de.settings.default.setup.logging_system.channel.description,
                    "es-ES": sp.settings.default.setup.logging_system.channel.description,
                    "nl": nl.settings.default.setup.logging_system.channel.description
                })
                .setRequired(false))),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const Logging = sequelize.define("Logging", {
            guildId: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_Report: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_Ban: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_AfterVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_AfterVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_Welcome: {
                type: Sequelize.STRING,
                unique: false,
            },
            roleAutoRoleId_Welcome: {
                type: Sequelize.STRING,
                unique: false,
            },
            staffRoleId_Report: {
                type: Sequelize.STRING,
                unique: false,
            },
            staffRoleId_Verify: {
                type: Sequelize.STRING,
                unique: false,
            },
            roleAddId_Verify: {
                type: Sequelize.STRING,
                unique: false,
            },
            roleRemoveId_Verify: {
                type: Sequelize.STRING,
                unique: false,
            },
            status_Blacklist: {
                type: Sequelize.STRING,
                unique: false,
            },
            status_BlacklistAutoban: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_Blacklist: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_Warn: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_Unban: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_Kick: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_ReceiveVerification: {
                type: Sequelize.STRING,
                unique: false,
            },
            status_BlacklistAutoban: {
                type: Sequelize.STRING,
                unique: false,
            },
            status_canActionMessage: {
                type: Sequelize.STRING,
                unique: false,
            },
            status_canActionImage: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_Leaving: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_TicketParent: {
                type: Sequelize.STRING,
                unique: false,
            },
            channelId_TicketReceive: {
                type: Sequelize.STRING,
                unique: false,
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
            if (!interaction.member.permissions.has("ADMINISTRATOR") | !interaction.member.permissions.has("MANAGE_GUILD") | interaction.user.id !== configPreset.botInfo.ownerId) {
                return interaction.reply({
                    content: "You cannot execute that command! You need the following permission: ``ADMINISTRATOR`` or ``MANAGE_GUILD``.",
                    ephemeral: true,
                });
            };

            // Setup

            let options = interaction.options.getSubcommand();

            // Role 

            let roleAutoRole = interaction.options.getRole(en.settings.default);
            let addRoleOption = interaction.options.getRole(en.settings.default.setup.verification_system.menu.addRole.name);
            let removeRoleOption = interaction.options.getRole(en.settings.default.setup.verification_system.menu.removeRole.name);
            let staffRoleOption = interaction.options.getRole(en.settings.default.setup.verification_system.menu.staffRole.name);

            // Channel 

            let channelOption = interaction.options.getChannel(en.settings.default.setup.report_system.channel.name);
            let welcomeChannelOption = interaction.options.getChannel(en.settings.default.setup.verification_system.menu.channel.name);
            let receiveChannelOption = interaction.options.getChannel(en.settings.default.setup.verification_system.menu.receiveChannel.name);

            removeRoleOption ? removeRole = removeRoleOption.name : removeRole = removeRoleOption;

            // Blacklist System

            let status_Bool = interaction.options.getString(en.settings.default.setup.blacklist_system.status.name);
            let status_AutoBan = interaction.options.getString(en.settings.default.setup.blacklist_system.autoban.name);

            // Logging System

            let optionsLogging = interaction.options.getString(en.settings.default.setup.logging_system.options.name);

            /*let ChannelName = "**Channel**";

            let settingsButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('adminButton')
                        .setLabel('⚒️')
                        .setStyle(ButtonStyle.Success),
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('modButton')
                        .setLabel('🛡️')
                        .setStyle(ButtonStyle.Success),
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('utilitiesButton')
                        .setLabel('🔧')
                        .setStyle(ButtonStyle.Success),
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('funButton')
                        .setLabel('🎲')
                        .setStyle(ButtonStyle.Success),
                ).addComponents(
                    new ButtonBuilder()
                        .setLabel('Support Server')
                        .setURL(Config.SupportDiscord)
                        .setStyle(ButtonStyle.Link),
                );

            let settingsMainMenu = new EmbedBuilder()
                .setTitle("⚙️ Settings")
                .setDescription("Click on the reaction according to what you want.")
                .addFields(
                    { name: "⚒️ Administration", value: "View the page of the admin command/function." },
                    { name: "🛡️ Moderation", value: "View the page of the moderation command/function." },
                    { name: "🔧 Utilities", value: "View the page of the utilities command/function." },
                    { name: "🎲 Fun", value: "View the page of the fun command/function." }
                )
                .setColor(Color.Blue)

            return interaction.reply({
                embeds: [settingsMainMenu],
                components: [settingsButton]
            });*/

            const settingsEmbed = new EmbedBuilder()

            switch (options) {
                case (en.settings.default.setup.report_system.name):
                    staffRoleOption ? staffRoleOption = staffRoleOption.name : staffRoleOption = staffRoleOption;

                    switch (staffRoleOption) {
                        case ("@everyone"):
                            settingsEmbed.setDescription(loggingPreset.SettingsError)
                            settingsEmbed.addFields(
                                { name: "**Role provided**", value: "The role (@everyone) cannot be used!", inline: true },
                            );

                            return interaction.reply({
                                embeds: [settingsEmbed],
                                ephemeral: true,
                            });
                        default:
                            settingsEmbed.setDescription(loggingPreset.SettingsUpdated)
                            settingsEmbed.addFields(
                                { name: ChannelName, value: channelOption.toLocaleString(), inline: true },
                            );

                            if (staffRoleOption) {
                                await Logging.update({
                                    channelId_Report: channelOption.id,
                                    staffRoleId_Report: staffRoleOption.id
                                }, { where: { guildId: interaction.guild.id } });

                                settingsEmbed.addFields(
                                    { name: "**Role to Ping:**", value: staffRoleOption.toLocaleString(), inline: true }
                                );

                                break;
                            };

                            await Logging.update({
                                channelId_Report: channelOption.id,
                            }, { where: { guildId: interaction.guild.id } });

                            break;
                    };

                    return interaction.reply({
                        embeds: [settingsEmbed],
                        ephemeral: true,
                    });
                case (en.settings.default.setup.action_system.name):
                    status_Bool === "true" ? status_Bool = "Enabled" : status_Bool = "Disabled";

                    settingsEmbed.setDescription(loggingPreset.SettingsUpdated)

                    switch (optionsLogging) {
                        case ("image"):
                            await Logging.update({
                                status_canActionMessage: status_Bool,
                            }, { where: { guildId: interaction.guild.id } })

                            settingsEmbed.addFields(
                                { name: "**Action Message**", value: status_Bool, inline: true }
                            );

                            break;
                        case ("message"):
                            await Logging.update({
                                status_canActionImage: status_Bool,
                            }, { where: { guildId: interaction.guild.id } })

                            settingsEmbed.addFields(
                                { name: "**Action Image**", value: status_Bool, inline: true }
                            );

                            break;
                    };

                    return interaction.reply({
                        embeds: [settingsEmbed],
                        ephemeral: true,
                    });
                case (en.settings.default.setup.welcome_system.name):
                    if (!roleAutoRole) {
                        await Logging.update({
                            channelId_Welcome: channelOption.id
                        }, { where: { guildId: interaction.guild.id } })

                        settingsEmbed.setDescription(loggingPreset.SettingsUpdated)
                        settingsEmbed.addFields(
                            { name: "**Welcome Channel**", value: channelOption.toLocaleString(), inline: true },
                        )
                    } else if (!channelOption) {
                        await Logging.update({
                            roleAutoRoleId_Welcome: roleAutoRole.id
                        }, { where: { guildId: interaction.guild.id } })

                        settingsEmbed.setDescription(loggingPreset.SettingsUpdated)
                        settingsEmbed.addFields(
                            { name: "**Auto-Role**", value: roleAutoRole.toLocaleString(), inline: true },
                        )
                    };

                    return interaction.reply({
                        embeds: [settingsEmbed],
                        ephemeral: true,
                    });
                case (en.settings.default.setup.blacklist_system.name):
                    if (status_Bool) {
                        status_Bool === "true" ? status_Bool = "Enabled" : status_Bool = "Disabled";

                        switch (status_AutoBan) {
                            case ("low"):
                                status_AutoBan = "Low+";
                                break;
                            case ("medium"):
                                status_AutoBan = "Medium+";
                                break;
                            case ("high"):
                                status_AutoBan = "High+";
                                break;
                            case ("disable"):
                                status_AutoBan = "Disabled";
                                break;
                        };

                        settingsEmbed.setDescription(loggingPreset.SettingsUpdated);
                        settingsEmbed.addFields(
                            { name: "**Status**", value: status_Bool, inline: true },
                        );

                        if (!channelOption) {
                            await Logging.update({
                                status_Blacklist: status_Bool,
                                status_BlacklistAutoban: status_AutoBan
                            }, { where: { guildId: interaction.guild.id } });

                            settingsEmbed.addFields(
                                { name: "**Auto-ban**", value: status_AutoBan, inline: true }
                            );
                        } else if (!status_AutoBan) {
                            await Logging.update({
                                status_Blacklist: status_Bool,
                                channelId_Blacklist: channelOption.id,
                            }, { where: { guildId: interaction.guild.id } });

                            settingsEmbed.addFields(
                                { name: "**Channel**", value: channelOption.toLocaleString(), inline: true }
                            );
                        } else if (channelOption && status_AutoBan) {
                            await Logging.update({
                                status_Blacklist: status_Bool,
                                status_BlacklistAutoban: status_AutoBan,
                                channelId_Blacklist: channelOption.id,
                            }, { where: { guildId: interaction.guild.id } });

                            settingsEmbed.addFields(
                                { name: "**Channel**", value: channelOption.toLocaleString(), inline: true },
                                { name: "**Auto-ban**", value: status_AutoBan, inline: true }
                            );
                        };

                        return interaction.reply({
                            embeds: [settingsEmbed],
                            ephemeral: true,
                        });
                    };
                case (en.settings.default.setup.logging_system.name):
                    settingsEmbed.setDescription(loggingPreset.SettingsUpdated)

                    switch (optionsLogging) {
                        case ("all"):
                            if (channelOption) {
                                await Logging.update({
                                    channelId_Ban: channelOption.id,
                                    channelId_Unban: channelOption.id,
                                    channelId_Kick: channelOption.id,
                                    channelId_Warn: channelOption.id,
                                }, { where: { guildId: interaction.guild.id } });

                                return LoggingEmbed.addFields(
                                    { name: "**Channel**", value: channelOption.toLocaleString(), inline: true },
                                );
                            } else {
                                return interaction.reply({
                                    content: [loggingPreset.ChannelNeeded]
                                });
                            };
                        case ("ban"):
                            if (channelOption) {
                                await Logging.update({
                                    channelId_Ban: channelOption.id,
                                }, { where: { guildId: interaction.guild.id } });

                                return LoggingEmbed.addFields(
                                    { name: "**Channel**", value: channelOption.toLocaleString(), inline: true },
                                );
                            } else {
                                return interaction.reply({
                                    content: [loggingPreset.ChannelNeeded]
                                });
                            };
                        case ("kick"):
                            if (channelOption) {
                                await Logging.update({
                                    channelId_Kick: channelOption.id,
                                }, { where: { guildId: interaction.guild.id } });

                                return LoggingEmbed.addFields(
                                    { name: "**Channel**", value: channelOption.toLocaleString(), inline: true },
                                );
                            } else {
                                return interaction.reply({
                                    content: [loggingPreset.ChannelNeeded]
                                });
                            };
                        case ("warn"):
                            if (channelOption) {
                                await Logging.update({
                                    channelId_Warn: channelOption.id,
                                }, { where: { guildId: interaction.guild.id } });

                                return LoggingEmbed.addFields(
                                    { name: "**Channel**", value: channelOption.toLocaleString(), inline: true },
                                );
                            } else {
                                return interaction.reply({
                                    content: [loggingPreset.ChannelNeeded]
                                });
                            };
                        case ("unban"):
                            if (channelOption) {
                                await Logging.update({
                                    channelId_Unban: channelOption.id,
                                }, { where: { guildId: interaction.guild.id } });

                                return LoggingEmbed.addFields(
                                    { name: "**Channel**", value: channelOption.toLocaleString(), inline: true },
                                );
                            } else {
                                return interaction.reply({
                                    content: [loggingPreset.ChannelNeeded]
                                });
                            };
                        case ("disable"):
                            await Logging.update({
                                channelId_Ban: null,
                                channelId_Unban: null,
                                channelId_Kick: null,
                                channelId_Warn: null,
                            }, { where: { guildId: interaction.guild.id } });

                            return LoggingEmbed.addFields(
                                { name: "**Channel**", value: "Disabled", inline: true },
                            );
                    };

                    return interaction.reply({
                        embeds: [settingsEmbed],
                        ephemeral: true,
                    });
                case (en.settings.default.setup.verification_system.command.name):
                    if (staffRoleOption.name === "@everyone" | addRoleOption.name === "@everyone" | removeRole === "@everyone") {
                        settingsEmbed.setDescription(loggingPreset.SettingsError);
                        settingsEmbed.addFields(
                            { name: "**Role provided**", value: "The roleOptions (@everyone) cannot be used!", inline: true },
                        );

                        return interaction.reply({
                            embeds: [settingsEmbed],
                            ephemeral: true,
                        });
                    };

                    settingsEmbed.setDescription("Settings Changed");
                    settingsEmbed.addFields(
                        { name: "**Welcome Channel:**", value: welcomeChannelOption.toLocaleString(), inline: true },
                        { name: "**Staff Role:**", value: staffRoleOption.toLocaleString(), inline: true },
                        { name: "**Role to Add:**", value: addRoleOption.toLocaleString(), inline: true },
                    );

                    if (!removeRoleOption) {
                        await Logging.update({
                            channelId_AfterVerify: welcomeChannelOption.id,
                            staffRoleId_Verify: staffRoleOption.id,
                            roleAddId_Verify: addRoleOption.id
                        }, { where: { guildId: interaction.guild.id } });
                    } else {
                        await Logging.update({
                            channelId_AfterVerify: welcomeChannelOption.id,
                            staffRoleId_Verify: staffRoleOption.id,
                            roleAddId_Verify: addRoleOption.id,
                            roleRemoveId_Verify: removeRoleOption.id
                        }, { where: { guildId: interaction.guild.id } });

                        settingsEmbed.addFields(
                            { name: "**Role to Remove:**", value: removeRoleOption.toLocaleString(), inline: true },
                        );
                    };

                    return interaction.reply({
                        embeds: [settingsEmbed],
                        ephemeral: true,
                    });
                case (en.settings.default.setup.verification_system.menu.name):
                    if (staffRoleOption.name === "@everyone" | addRoleOption.name === "@everyone" | removeRole === "@everyone") {
                        settingsEmbed.setDescription(loggingPreset.SettingsError)
                        settingsEmbed.addFields(
                            { name: "**Role provided**", value: "The roleOptions (@everyone) cannot be used!", inline: true },
                        );

                        return interaction.reply({
                            embeds: [settingsEmbed],
                            ephemeral: true,
                        });
                    };

                    settingsEmbed.setDescription(loggingPreset.SettingsUpdated)
                    settingsEmbed.addFields(
                        { name: "**Welcome Channel:**", value: welcomeChannelOption.toLocaleString(), inline: true },
                        { name: "**Receive Channel**", value: receiveChannelOption.toLocaleString(), inline: true },
                        { name: "**Staff Role:**", value: staffRoleOption.toLocaleString(), inline: true },
                        { name: "**Role to Add:**", value: addRoleOption.toLocaleString(), inline: true },
                    );

                    if (!removeRoleOption) {
                        await Logging.update({
                            channelId_AfterVerify: welcomeChannelOption.id,
                            channelId_ReceiveVerification: receiveChannelOption.id,
                            staffRoleId_Verify: staffRoleOption.id,
                            roleAddId_Verify: addRoleOption.id
                        }, { where: { guildId: interaction.guild.id } });
                    } else {
                        await Logging.update({
                            channelId_AfterVerify: welcomeChannelOption.id,
                            channelId_ReceiveVerification: receiveChannelOption.id,
                            staffRoleId_Verify: staffRoleOption.id,
                            roleAddId_Verify: addRoleOption.id,
                            roleRemoveId_Verify: removeRoleOption.id
                        }, { where: { guildId: interaction.guild.id } });

                        settingsEmbed.addFields(
                            { name: "**Role to Remove:**", value: removeRoleOption.toLocaleString(), inline: true },
                        );
                    };

                    return interaction.reply({
                        embeds: [settingsEmbed],
                        ephemeral: true,
                    });
            };
        } catch (error) {
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.guildId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(interaction.user.id + " -> " + interaction.user.tag);
            console.log(error);

            await interaction.reply({
                content: languageSet.default.errorOccured,
                ephemeral: true,
            });

            return crashchannelId.send({ content: "**Error in the '" + en.action.default.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
};