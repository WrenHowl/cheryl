const { MessageEmbed } = require('discord.js');
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

            if (interaction.member.permissions.has("KICK_MEMBERS")) {
                if (interaction.guild.me.permissions.has("KICK_MEMBERS")) {
                    const user = interaction.options.getUser(en.UserName);
                    const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(error => { });
                    let guild = bot.guilds.cache.get(interaction.guild.id);

                    switch (member.id) {
                        case (!member):
                            return interaction.reply({
                                content: "I can't find this user!",
                                ephemeral: true
                            });
                        case (interaction.member.id):
                            return interaction.reply({
                                content: "You can't kick yourself!",
                                ephemeral: true
                            });
                        case (bot.user.id):
                            return interaction.reply({
                                content: "You can't kick me!",
                                ephemeral: true
                            });
                        case (!member.kickable):
                            return interaction.reply({
                                content: "I can't kick this user!",
                                ephemeral: true,
                            });
                        default:
                            if (guild.members.cache.find(m => m.id === user.id)?.id) {
                                if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                                    return interaction.reply({
                                        content: "You can't kick this user, because he's higher than you!",
                                        ephemeral: true
                                    });
                                };
                            };

                            const reason = interaction.options.getString(en.ReasonName);
                            const admin = interaction.user.tag;

                            const kickMessage = new MessageEmbed()
                                .setDescription("``" + member.user.tag + "`` has been kicked from the server for ``" + reason + "``.")
                                .setColor(Color.Green)

                            await interaction.reply({
                                embeds: [kickMessage],
                                ephemeral: true
                            });

                            if (LoggingData) {
                                if (LoggingData.ChannelIDKick) {
                                    const logChannel = interaction.guild.channels.cache.get(LoggingData.ChannelIDKick);

                                    const logMessage = new MessageEmbed()
                                        .setTitle("New Kick")
                                        .setDescription("**__User:__** ``" + member.user.tag + "``\n**__Reason:__** ``" + reason + "``\n**__Moderator:__** ``" + admin + "``")
                                        .setFooter({ text: "ID: " + member.id })
                                        .setTimestamp()
                                        .setColor(Color.RiskMedium)

                                    await logChannel.send({ embeds: [logMessage] });
                                };
                            };
                            const kickDM = new MessageEmbed()
                                .setDescription("You have been kicked on ``" + interaction.guild.name + "`` for ``" + reason + "`` by ``" + admin + "``.")
                                .setColor(Color.RiskMedium)

                            await member.send({
                                embeds: [kickDM],
                            }).catch(() => { return });

                            return member.kick({ reason: [reason + " | " + admin] });
                    };
                } else {
                    return interaction.reply({
                        content: "I need the following permissions: ``KICK_MEMBERS``.",
                        ephemeral: true,
                    });
                };
            } else {
                return interaction.reply({
                    content: "You cannot execute this command! You need the following permission ``KICK_MEMBERS``.",
                    ephemeral: true
                });
            };
        } catch (error) {
            let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);

            CrashChannel.send({ content: "**Error in the " + en.Name + " Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};