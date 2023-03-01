const Discord = require('discord.js');
const Color = require("../config/color.json");
const Message = require("../config/message.json");
const Config = require("../config/config.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

module.exports = {
    name: LanguageEN.unban.Name,
    execute: async (bot, message, args, EmbedBuilder, sequelize, Sequelize) => {
        try {
            if (message.guild.members.guild.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                const CommandFunction = sequelize.define("CommandFunction", {
                    name: {
                        type: Sequelize.STRING,
                    },
                    value: {
                        type: Sequelize.STRING,
                    },
                });

                const FindCommand = await CommandFunction.findOne({ where: { name: LanguageEN.unban.Name } });

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
                    ChannelIDUnban: {
                        type: Sequelize.STRING,
                    },
                    Language: {
                        type: Sequelize.STRING,
                    },
                });
                const LoggingData = await Logging.findOne({ where: { GuildID: message.guild.id } });

                let LanguageData = LoggingData.language;

                if (!LanguageData || LanguageData === "en") Language = LanguageEN;
                if (LanguageData === "fr") Language = LanguageFR;
                if (LanguageData === "de") Language = LanguageDE;
                if (LanguageData === "sp") Language = LanguageSP;
                if (LanguageData === "nl") Language = LanguageNL;

                if (message.member.permissions.has("BAN_MEMBERS")) {
                    if (message.guild.me.permissions.has("BAN_MEMBERS")) {
                        const ErrorEmbed = new EmbedBuilder()
                            .setTitle("Ban Syntax")
                            .setDescription("**Utilisation:** ``" + Config.Prefix + en.Name + " <@user> <reason>``")
                            .setColor(Color.Blue);

                        if (!args[0]) {
                            return message.reply({
                                embeds: [ErrorEmbed],
                            });
                        };

                        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await message.guild.members.fetch(args[0]).catch(error => { });


                        if (!user) {
                            return message.reply({
                                embeds: [ErrorEmbed],
                            });
                        };

                        const banList = await message.guild.bans.fetch();
                        const bannedUser = banList.find(user => user.id === user.id);

                        switch (user.id) {
                            case (!user):
                                return message.reply({
                                    content: Language.default.UnknownUser,
                                });
                            case (message.author.id):
                                return message.reply({
                                    content: Language.unban.default.Myself,
                                });
                            case (bot.user.id):
                                return message.reply({
                                    content: Language.unban.default.Me,
                                });
                            default:
                                if (bannedUser) {
                                    return message.reply({
                                        content: Language.unban.default.Punished,
                                    });
                                } else {
                                    await message.reply({
                                        content: "``" + user.tag + "`` " + Language.unban.server.Message + ".",
                                    });

                                    if (LoggingData) {
                                        if (LoggingData.ChannelIDUnban) {
                                            if (message.guild.members.guild.me.permissionsIn(LoggingData.ChannelIDUnban).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                                                const logChannel = message.guild.channels.cache.get(LoggingData.ChannelIDUnban);

                                                const logMessage = new EmbedBuilder()
                                                    .setTitle(Language.unban.server.New)
                                                    .addFields(
                                                        { name: Language.unban.server.User, value: "``" + user.tag + "``" },
                                                        { name: Language.unban.server.Mod, value: "``" + mod + "``" },
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
                                    return message.guild.members.unban(user.id);
                                };
                        };
                    } else {
                        return message.reply({
                            content: Language.unban.permission.Me,
                        });
                    };
                } else {
                    return message.reply({
                        content: Language.unban.permission.Myself,
                    });
                };
            };
        } catch (error) {
            let fetchGuild = bot.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
            console.log("//------------------------------------------------------------------------------//");
            console.log(error);
            console.log("//------------------------------------------------------------------------------//");

            return CrashChannel.send({ content: "**Error in the '" + LanguageEN.unban.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};