const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.kick;
const en = LanguageEN.kick;
const de = LanguageDE.kick;
const sp = LanguageSP.kick;
const nl = LanguageNL.kick;

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
            const MessageReason = require("../config/message.json");

            if (FindCommand) {
                if (FindCommand.value === "Disable") {
                    return interaction.reply({
                        content: MessageReason.CommandDisabled,
                        ephemeral: true,
                    });
                };
            };

            const Logging = sequelize.define("Logging", {
                GuildID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDKick: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });
            const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

            let LanguageData = LoggingData.language;

            if (!LanguageData || LanguageData === "en") Language = LanguageEN;
            if (LanguageData === "fr") Language = LanguageFR;
            if (LanguageData === "de") Language = LanguageDE;
            if (LanguageData === "sp") Language = LanguageSP;
            if (LanguageData === "nl") Language = LanguageNL;

            if (interaction.member.permissions.has("KICK_MEMBERS")) {
                if (interaction.guild.me.permissions.has("KICK_MEMBERS")) {
                    const user = interaction.options.getUser(en.UserName);
                    const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(error => { });
                    let guild = bot.guilds.cache.get(interaction.guild.id);

                    switch (member.id) {
                        case (!member):
                            return interaction.reply({
                                content: Language.default.UnknownUser,
                                ephemeral: true,
                            });
                        case (interaction.member.id):
                            return interaction.reply({
                                content: Language.kick.default.Myself,
                                ephemeral: true,
                            });
                        case (bot.user.id):
                            return interaction.reply({
                                content: Language.kick.default.Me,
                                ephemeral: true,
                            });
                        case (interaction.guild.ownerId):
                            return interaction.reply({
                                content: Language.kick.default.Owner,
                                ephemeral: true,
                            });
                        case (!member.kickable):
                            return interaction.reply({
                                content: Language.kick.default.Punishable,
                                ephemeral: true,
                            });
                        default:
                            if (guild.members.cache.find(member => member.id === member.id)?.id) {
                                if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                                    return interaction.reply({
                                        content: Language.kick.default.Role,
                                        ephemeral: true,
                                    });
                                };
                            };

                            const reason = interaction.options.getString(en.ReasonName);
                            const mod = interaction.user.tag;

                            const kickMessage = new EmbedBuilder()
                                .setDescription("``" + user.tag + "`` " + Language.kick.server.Message + " ``" + reason + "``.")
                                .setColor(Color.Green);

                            await interaction.reply({
                                embeds: [kickMessage],
                                ephemeral: true,
                            });

                            if (LoggingData) {
                                if (LoggingData.ChannelIDKick) {
                                    const logChannel = interaction.guild.channels.cache.get(LoggingData.ChannelIDKick);

                                    const logMessage = new EmbedBuilder()
                                        .setTitle(Language.ban.server.New)
                                        .addFields(
                                            { name: Language.kick.server.User, value: "``" + user.tag + "``" },
                                            { name: Language.kick.server.Reason, value: "``" + reason + "``" },
                                            { name: Language.kick.server.Mod, value: "``" + mod + "``" },
                                        )
                                        .setFooter({
                                            text: "ID: " + user.id
                                        })
                                        .setTimestamp()
                                        .setColor(Color.RiskMedium);

                                    await logChannel.send({
                                        embeds: [logMessage],
                                    });
                                };
                            };
                            const kickDM = new EmbedBuilder()
                                .setDescription(Language.kick.dm.you + " ``" + interaction.guild.name + "`` " + Language.kick.dm.for + " ``" + reason + "`` " + Language.kick.dm.by + " ``" + mod + "``.")
                                .setColor(Color.RiskMedium);

                            await member.send({
                                embeds: [kickDM],
                            }).catch(() => { return });

                            return member.kick({ reason: [reason + " | " + mod] });
                    };
                } else {
                    return interaction.reply({
                        content: Language.kick.permission.Me,
                        ephemeral: true,
                    });
                };
            } else {
                return interaction.reply({
                    content: Language.kick.permission.Myself,
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