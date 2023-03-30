const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const Message = require("../config/message.json");
const Config = require("../config/config.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.ban;
const en = LanguageEN.ban;
const de = LanguageDE.ban;
const sp = LanguageSP.ban;
const nl = LanguageNL.ban;

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
        .addUserOption(option => option
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
            .setRequired(true))
        .addStringOption(option => option
            .setName(en.ReasonName)
            .setNameLocalizations({
                fr: fr.ReasonName,
                de: de.ReasonName,
                SpanishES: sp.ReasonName,
                nl: nl.ReasonName
            })
            .setDescription(en.ReasonDescription)
            .setDescriptionLocalizations({
                fr: fr.ReasonDescription,
                de: de.ReasonDescription,
                SpanishES: sp.ReasonDescription,
                nl: nl.ReasonDescription
            })
            .setRequired(true)
        ),
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

            if (FindCommand) {
                if (FindCommand.value === "Disable") {
                    return interaction.reply({
                        content: Message.CommandDisabled,
                        ephemeral: true,
                    });
                };
            };

            const Logging = sequelize.define("Logging", {
                GuildID: {
                    type: Sequelize.STRING,
                },
                ChannelIDBan: {
                    type: Sequelize.STRING,
                },
                Language: {
                    type: Sequelize.STRING,
                },
            });
            const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

            let LanguageData = LoggingData.language;

            if (!LanguageData || LanguageData === "en") Language = LanguageEN;
            if (LanguageData === "fr") Language = LanguageFR;
            if (LanguageData === "de") Language = LanguageDE;
            if (LanguageData === "sp") Language = LanguageSP;
            if (LanguageData === "nl") Language = LanguageNL;

            if (interaction.member.permissions.has("BanMembers")) {
                if (interaction.guild.members.me.permissions.has("BanMembers")) {
                    let user = interaction.options.getUser(en.UserName);
                    let member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(error => { });
                    let banList = await interaction.guild.bans.fetch();
                    let bannedUser = banList.find(user => user.id === user.id);
                    let guild = bot.guilds.cache.get(interaction.guild.id);

                    switch (user.id) {
                        case (!user):
                            return interaction.reply({
                                content: Language.default.UnknownUser,
                                ephemeral: true,
                            });
                        case (interaction.member.id):
                            return interaction.reply({
                                content: Language.ban.default.Myself,
                                ephemeral: true,
                            });
                        case (bot.user.id):
                            return interaction.reply({
                                content: Language.ban.default.Me,
                                ephemeral: true,
                            });
                        case (interaction.guild.ownerId):
                            return interaction.reply({
                                content: Language.ban.default.Owner,
                                ephemeral: true,
                            });
                        case (!user.bannable):
                            return interaction.reply({
                                content: Language.ban.default.Punishable,
                                ephemeral: true,
                            });
                        default:
                            if (guild.members.cache.find(m => m.id === user.id)?.id) {
                                if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                                    return interaction.reply({
                                        content: Language.ban.default.Role,
                                        ephemeral: true,
                                    });
                                };
                            } else if (bannedUser) {
                                return interaction.reply({
                                    content: Language.ban.default.Punished,
                                    ephemeral: true,
                                });
                            };

                            const reason = interaction.options.getString(en.ReasonName);
                            const mod = interaction.user.tag;

                            await interaction.reply({
                                content: "***" + user.tag + "*** " + Language.ban.server.Message,
                            });

                            if (LoggingData) {
                                if (LoggingData.ChannelIDBan) {
                                    if (interaction.guild.members.me.permissionsIn(LoggingData.ChannelIDBan).has(['SendMessages', 'ViewChannel'])) {
                                        const logChannel = interaction.guild.channels.cache.get(LoggingData.ChannelIDBan);

                                        const logMessage = new EmbedBuilder()
                                            .setTitle(Language.ban.server.New)
                                            .addFields(
                                                { name: Language.ban.server.User, value: "``" + user.tag + "``" },
                                                { name: Language.ban.server.Reason, value: "``" + reason + "``" },
                                                { name: Language.ban.server.Mod, value: "``" + mod + "``" },
                                            )
                                            .setFooter({
                                                text: "ID: " + user.id
                                            })
                                            .setTimestamp()
                                            .setColor(Color.RiskHigh);

                                        await logChannel.send({
                                            embeds: [logMessage],
                                        });
                                    };
                                };
                            };

                            await user.send({
                                conmtent: Language.ban.dm.you + " ``" + interaction.guild.name + "`` " + Language.ban.dm.for + " ``" + reason + "`` " + Language.ban.dm.by + " ``" + mod + "``.",
                            }).catch(() => { return });

                            return interaction.guild.members.ban(user.id, { reason: [reason + " | " + mod] });
                    };
                } else {
                    return interaction.reply({
                        content: Language.ban.permission.Me,
                        ephemeral: true,
                    });
                };
            } else {
                return interaction.reply({
                    content: Language.ban.permission.Myself,
                    ephemeral: true
                });
            };
        } catch (error) {
            let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
            console.log(error);

            return CrashChannel.send({ content: "**Error in the '" + en.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};