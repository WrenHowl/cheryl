const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config/config.json');
const message = require('../config/message.json');
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.permission;
const en = LanguageEN.permission;
const de = LanguageDE.permission;
const sp = LanguageSP.permission;
const nl = LanguageNL.permission;

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
        .addSubcommand(subcommand => subcommand
            .setName(en.UserName)
            .setNameLocalizations({
                fr: fr.UserName,
                de: de.UserName,
                SpanishES: sp.UserName,
                nl: nl.UserName
            })
            .setDescription(en.UserDescription)
            .setDescriptionLocalizations({
                fr: fr.UserDescription,
                de: de.UserDescription,
                SpanishES: sp.UserDescription,
                nl: nl.UserDescription
            })
            .addUserOption(option => option
                .setName(en.UserUserName)
                .setNameLocalizations({
                    fr: fr.UserUserName,
                    de: de.UserUserName,
                    SpanishES: sp.UserUserName,
                    nl: nl.UserUserName
                })
                .setDescription(en.UserUserDescription)
                .setDescriptionLocalizations({
                    fr: fr.UserUserDescription,
                    de: de.UserUserDescription,
                    SpanishES: sp.UserUserDescription,
                    nl: nl.UserUserDescription
                })
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.UserOptionsName)
                .setNameLocalizations({
                    fr: fr.UserOptionsName,
                    de: de.UserOptionsName,
                    SpanishES: sp.UserOptionsName,
                    nl: nl.UserOptionsName
                })
                .setDescription(en.UserOptionsDescription)
                .setDescriptionLocalizations({
                    fr: fr.UserOptionsDescription,
                    de: de.UserOptionsDescription,
                    SpanishES: sp.UserOptionsDescription,
                    nl: nl.UserOptionsDescription
                })
                .setRequired(true)
                .addChoices(
                    { name: 'add', value: 'addOptions' },
                    { name: 'remove', value: 'removeOptions' },
                ))
            .addStringOption(option => option
                .setName(en.UserPermissionName)
                .setNameLocalizations({
                    fr: fr.UserPermissionName,
                    de: de.UserPermissionName,
                    SpanishES: sp.UserPermissionName,
                    nl: nl.UserPermissionName
                })
                .setDescription(en.UserPermissionDescription)
                .setDescriptionLocalizations({
                    fr: fr.UserPermissionDescription,
                    de: de.UserPermissionDescription,
                    SpanishES: sp.UserPermissionDescription,
                    nl: nl.UserPermissionDescription
                })
                .setRequired(true)
                .addChoices(
                    { name: 'Blacklist', value: "blacklistPermission" },
                )))
        .addSubcommand(subcommand => subcommand
            .setName(en.ServerName)
            .setNameLocalizations({
                fr: fr.ServerName,
                de: de.ServerName,
                SpanishES: sp.ServerName,
                nl: nl.ServerName
            })
            .setDescription(en.ServerDescription)
            .setDescriptionLocalizations({
                fr: fr.ServerDescription,
                de: de.ServerDescription,
                SpanishES: sp.ServerDescription,
                nl: nl.ServerDescription
            })
            .addStringOption(option => option
                .setName(en.ServerUserName)
                .setNameLocalizations({
                    fr: fr.ServerUserName,
                    de: de.ServerUserName,
                    SpanishES: sp.ServerUserName,
                    nl: nl.ServerUserName
                })
                .setDescription(en.ServerUserDescription)
                .setDescriptionLocalizations({
                    fr: fr.ServerUserDescription,
                    de: de.ServerUserDescription,
                    SpanishES: sp.ServerUserDescription,
                    nl: nl.ServerUserDescription
                })
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.ServerOptionsName)
                .setNameLocalizations({
                    fr: fr.ServerOptionsName,
                    de: de.ServerOptionsName,
                    SpanishES: sp.ServerOptionsName,
                    nl: nl.ServerOptionsName
                })
                .setDescription(en.ServerOptionsDescription)
                .setDescriptionLocalizations({
                    fr: fr.ServerOptionsDescription,
                    de: de.ServerOptionsDescription,
                    SpanishES: sp.ServerOptionsDescription,
                    nl: nl.ServerOptionsDescription
                })
                .setRequired(true)
                .addChoices(
                    { name: 'add', value: 'addOptions' },
                    { name: 'remove', value: 'removeOptions' },
                ))
            .addStringOption(option => option
                .setName(en.ServerPermissionName)
                .setNameLocalizations({
                    fr: fr.ServerPermissionName,
                    de: de.ServerPermissionName,
                    SpanishES: sp.ServerPermissionName,
                    nl: nl.ServerPermissionName
                })
                .setDescription(en.ServerPermissionDescription)
                .setDescriptionLocalizations({
                    fr: fr.ServerPermissionDescription,
                    de: de.ServerPermissionDescription,
                    SpanishES: sp.ServerPermissionDescription,
                    nl: nl.ServerPermissionDescription
                })
                .setRequired(true)
                .addChoices(
                    { name: 'Blacklist', value: "blacklistPermission" },
                ))),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        if (interaction.user.id === config.ownerId) {
            const Permission = sequelize.define("Permission", {
                UserName: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                UserID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                GuildID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                BlacklistPermission: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });

            let option = interaction.options.getSubcommand();
            const options = interaction.options.getString("options");
            const addOptions = interaction.options.getString("whitelist");

            switch (option) {
                case ("user"):
                    const user = interaction.options.getUser("user");
                    const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });

                    switch (member.id) {
                        case (!member):
                            return interaction.reply({
                                content: "I can't find this user!",
                                ephemeral: true
                            })
                        case (bot.user.id):
                            return interaction.reply({
                                content: "You can't whitelist me!",
                                ephemeral: true
                            })
                        default:
                            switch (options) {
                                case ("addOptions"):
                                    switch (addOptions) {
                                        case ("blacklistPermission"):
                                            if (user) PermissionCheck = await Permission.findOne({ where: { UserID: user.id } });

                                            if (PermissionCheck) {
                                                const PermissionChange = await Permission.update({ BlacklistPermission: true }, { where: { UserID: user.id } })
                                            } else {
                                                const PermissionCreate = await Permission.create({
                                                    UserName: user.tag,
                                                    UserID: user.id,
                                                    BlacklistPermission: true,
                                                });
                                            }

                                            return interaction.reply({
                                                content: message.AddedWhitelistBlacklist,
                                                ephemeral: true,
                                            })
                                    };
                                case ("removeOptions"):
                                    switch (addOptions) {
                                        case ("blacklistPermission"):
                                            if (interaction.user.id === config.ownerId) {
                                                if (user) PermissionCheck = await Permission.findOne({ where: { UserID: user.id } });

                                                if (PermissionCheck) {
                                                    const PermissionChange = await Permission.update({ BlacklistPermission: false }, { where: { UserID: user.id } })
                                                } else {
                                                    const PermissionCreate = await Permission.create({
                                                        UserName: user.tag,
                                                        UserID: user.id,
                                                        BlacklistPermission: false,
                                                    });
                                                }

                                                return interaction.reply({
                                                    content: message.RemovedWhitelistBlacklist,
                                                    ephemeral: true,
                                                })
                                            };
                                    }
                            }
                    };
                case ("server"):
                    const server = interaction.options.getString("server");

                    switch (options) {
                        case ("addOptions"):
                            switch (addOptions) {
                                case ("blacklistPermission"):
                                    if (server) PermissionCheck = await Permission.findOne({ where: { GuildID: server } });

                                    if (PermissionCheck) {
                                        const PermissionChange = await Permission.update({ BlacklistPermission: true }, { where: { GuildID: server } })
                                    } else {
                                        const PermissionCreate = await Permission.create({
                                            GuildID: server,
                                            BlacklistPermission: true,
                                        });
                                    }

                                    return interaction.reply({
                                        content: message.AddedWhitelistBlacklist,
                                        ephemeral: true,
                                    })
                            };
                        case ("removeOptions"):
                            switch (addOptions) {
                                case ("blacklistPermission"):
                                    if (interaction.user.id === config.ownerId) {
                                        if (user) PermissionCheck = await Permission.findOne({ where: { GuildID: server } });

                                        if (PermissionCheck) {
                                            const PermissionChange = await Permission.update({ BlacklistPermission: false }, { where: { GuildID: server } })
                                        } else {
                                            const PermissionCreate = await Permission.create({
                                                GuildID: server,
                                                BlacklistPermission: false,
                                            });
                                        }

                                        return interaction.reply({
                                            content: message.RemovedWhitelistBlacklist,
                                            ephemeral: true,
                                        })
                                    };
                            }
                    };
            }
        }
    }
};