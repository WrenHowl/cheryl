const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const Config = require("../config/config.json");
const Message = require('../config/message.json');
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
                    { name: 'add', value: 'Add_Options' },
                    { name: 'remove', value: 'Remove_Options' },
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
                    { name: 'Blacklist', value: "Blacklist_Permission" },
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
                    { name: 'add', value: 'Add_Options' },
                    { name: 'remove', value: 'Remove_Options' },
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
                    { name: 'Blacklist', value: "Blacklist_Permission" },
                ))),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        try {
            if (!interaction.guild) {
                return interaction.reply({
                    content: "Use this command inside a server only!"
                });
            };

            const CommandFunction = sequelize.define("CommandFunction", {
                name: {
                    type: Sequelize.STRING,
                },
                value: {
                    type: Sequelize.STRING,
                },
            });

            const FindCommand = await CommandFunction.findOne({ where: { name: en.Name } });
            const MessageReason = require("../config/message.json");

            if (FindCommand) {
                if (FindCommand.value === "Disable") {
                    return interaction.reply({
                        content: MessageReason.CommandDisabled,
                        ephemeral: true,
                    });
                };
            };

            if (interaction.user.id === Config.ownerId) {
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
                const options = interaction.options.getString(en.UserOptionsName);
                const addOptions = interaction.options.getString(en.UserPermissionName);

                let MessageReason = Message.Permission;

                switch (option) {
                    case (en.UserName):
                        const user = interaction.options.getUser(en.UserName);
                        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(error => { });

                        switch (member.id) {
                            case (!member):
                                return interaction.reply({
                                    content: "I can't find this user!",
                                    ephemeral: true
                                });
                            case (bot.user.id):
                                return interaction.reply({
                                    content: "You can't whitelist me!",
                                    ephemeral: true
                                });
                            default:
                                switch (options) {
                                    case ("Add_Options"):
                                        switch (addOptions) {
                                            case ("Blacklist_Permission"):
                                                const PermissionCheck = await Permission.findOne({ where: { UserID: user.id } });

                                                if (PermissionCheck) {
                                                    return interaction.reply({
                                                        content: MessageReason.AlreadyWhitelistedBlacklist,
                                                        ephemeral: true
                                                    });
                                                };

                                                PermissionCheck ? await Permission.update({ BlacklistPermission: true }, { where: { UserID: user.id } }) :
                                                    await Permission.create({
                                                        UserName: user.tag,
                                                        UserID: user.id,
                                                        BlacklistPermission: true,
                                                    });

                                                return interaction.reply({
                                                    content: MessageReason.AddedWhitelistBlacklist,
                                                    ephemeral: true,
                                                });
                                        };
                                    case ("Remove_Options"):
                                        switch (addOptions) {
                                            case ("Blacklist_Permission"):
                                                const PermissionCheck = await Permission.findOne({ where: { UserID: user.id } });

                                                if (PermissionCheck) {
                                                    return interaction.reply({
                                                        content: MessageReason.AlreadyWhitelistedBlacklist,
                                                        ephemeral: true
                                                    });
                                                };

                                                PermissionCheck ? await Permission.update({ BlacklistPermission: false }, { where: { UserID: user.id } }) :
                                                    await Permission.create({
                                                        UserName: user.tag,
                                                        UserID: user.id,
                                                        BlacklistPermission: false,
                                                    });

                                                return interaction.reply({
                                                    content: MessageReason.RemovedWhitelistBlacklist,
                                                    ephemeral: true,
                                                });
                                        };
                                };
                        };
                    case ("server"):
                        const server = interaction.options.getString(en.ServerName);

                        switch (options) {
                            case ("Add_Options"):
                                switch (addOptions) {
                                    case ("Blacklist_Permission"):
                                        const PermissionCheck = await Permission.findOne({ where: { GuildID: server } });

                                        if (PermissionCheck) {
                                            return interaction.reply({
                                                content: MessageReason.AlreadyWhitelistedBlacklist,
                                                ephemeral: true
                                            });
                                        };

                                        PermissionCheck ? await Permission.update({ BlacklistPermission: true }, { where: { GuildID: interaction.guild.id } }) :
                                            await Permission.create({
                                                GuildID: server,
                                                BlacklistPermission: true,
                                            });

                                        return interaction.reply({
                                            content: MessageReason.AddedWhitelistBlacklist,
                                            ephemeral: true,
                                        });
                                };
                            case ("Remove_Options"):
                                switch (addOptions) {
                                    case ("Blacklist_Permission"):
                                        const PermissionCheck = await Permission.findOne({ where: { GuildID: server } });

                                        if (!PermissionCheck) {
                                            return interaction.reply({
                                                content: MessageReason.AlreadyWhitelistedBlacklist,
                                                ephemeral: true
                                            });
                                        };

                                        PermissionCheck ? await Permission.update({ BlacklistPermission: true }, { where: { GuildID: interaction.guild.id } }) :
                                            await Permission.create({
                                                GuildID: server,
                                                BlacklistPermission: true,
                                            });

                                        return interaction.reply({
                                            content: MessageReason.RemovedWhitelistBlacklist,
                                            ephemeral: true,
                                        });
                                };
                        };
                };
            } else {
                return interaction.reply({
                    content: "You do not have access to this command.",
                    ephemeral: true
                });
            };
        } catch (error) {
            let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
            console.log("//------------------------------------------------------------------------------//");
            console.log(error);
            console.log("//------------------------------------------------------------------------------//");

            return CrashChannel.send({ content: "**Error in the '" + en.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};