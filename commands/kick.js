const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const configPreset = require("../settings/config.json");
const messagePreset = require("../settings/message.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

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
            const CommandFunction = sequelize.define("CommandFunction", {
                name: {
                    type: Sequelize.STRING,
                },
                value: {
                    type: Sequelize.STRING,
                },
            });
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

            let FindCommand = await CommandFunction.findOne({ where: { name: en.Name } });

            if (FindCommand | !interaction.guild) {
                FindCommand.value === "Disable" ? messageRefusing = Message.CommandDisabled : false;
                !interaction.guild ? messageRefusing = "You can only use this command in a server." : false;

                return interaction.reply({
                    content: messageRefusing,
                    ephemeral: true,
                });
            };

            let LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

            switch (LoggingData.language) {
                case ("en"):
                    Language = LanguageEN;
                case ("fr"):
                    Language = LanguageFR;
                case ("de"):
                    Language = LanguageDE;
                case ("sp"):
                    Language = LanguageSP;
                case ("nl"):
                    Language = LanguageNL;
                default:
                    Language = LanguageEN;
            }

            if (interaction.member.permissions.has("KICK_MEMBERS")) {
                if (interaction.guild.me.permissions.has("KICK_MEMBERS")) {
                    const user = interaction.options.getUser(en.UserName);
                    const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(error => { });
                    let guild = bot.guilds.cache.get(interaction.guild.id);

                    switch (member.id) {
                        case (!member):
                            return interaction.reply({
                                content: LoggingData.default.UnknownUser,
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
            console.log(error);

            return CrashChannel.send({ content: "**Error in the '" + en.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};