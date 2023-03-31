const Discord = require('discord.js');
const Config = require("../config/config.json");
const Message = require("../config/message.json");
const Color = require("../config/color.json");
const FR = require("../languages/fr.json");
const EN = require("../languages/en.json");
const DE = require("../languages/de.json");
const SP = require("../languages/sp.json");
const NL = require("../languages/nl.json");

module.exports = {
    name: EN.ban.Name,
    execute: async (bot, message, args, EmbedBuilder, sequelize, Sequelize) => {
        try {
            if (message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                const CommandFunction = sequelize.define("CommandFunction", {
                    name: {
                        type: Sequelize.STRING,
                    },
                    value: {
                        type: Sequelize.STRING,
                    },
                });
                const FindCommand = await CommandFunction.findOne({ where: { name: EN.ban.Name } });

                if (FindCommand) {
                    if (FindCommand.value === "Disable") {
                        return message.reply({
                            content: Message.CommandDisabled,
                        });
                    };
                };

                //

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
                const LoggingData = await Logging.findOne({ where: { GuildID: message.guild.id } });

                let LanguageData = LoggingData.language;

                if (!LanguageData || LanguageData === "en") Language = EN;
                if (LanguageData === "fr") Language = FR;
                if (LanguageData === "de") Language = DE;
                if (LanguageData === "sp") Language = SP;
                if (LanguageData === "nl") Language = NL;

                //

                if (message.member.permissions.has("BAN_MEMBERS")) {
                    if (message.guild.me.permissions.has("BAN_MEMBERS")) {
                        const ErrorEmbed = new EmbedBuilder()
                            .setTitle("Ban Syntax")
                            .setDescription("**Utilisation:** ``" + Config.Prefix + "ban <@user> <reason>``")
                            .setColor(Color.Blue);

                        if (!args[0]) {
                            return message.reply({
                                embeds: [ErrorEmbed],
                            });
                        };

                        let user = await bot.users.fetch(args[0]) || message.mentions.members.first();

                        let reason = args.slice(1).join(' ');

                        if (!user || !reason) {
                            return message.reply({
                                embeds: [ErrorEmbed],
                            });
                        };

                        let guild = bot.guilds.cache.get(message.guild.id);
                        let banList = await message.guild.bans.fetch();
                        let bannedUser = banList.get(user.id);

                        switch (user.id) {
                            case (!user):
                                return message.reply({
                                    content: Language.default.UnknownUser,
                                });
                            case (message.author.id):
                                return message.reply({
                                    content: Language.ban.default.Myself,
                                });
                            case (bot.user.id):
                                return message.reply({
                                    content: Language.ban.default.Me,
                                });
                            case (message.guild.ownerId):
                                return message.reply({
                                    content: Language.ban.default.Owner,
                                });
                            case (!user.bannable):
                                return message.reply({
                                    content: Language.ban.default.Punishable,
                                });
                            default:
                                if (guild.members.cache.find(m => m.id === user.id)?.id) {
                                    if (member.roles.highest.position >= message.member.roles.highest.position) {
                                        return message.reply({
                                            content: Language.ban.default.Role,
                                        });
                                    };
                                } else if (bannedUser) {
                                    return message.reply({
                                        content: Language.ban.default.Punished,
                                    });
                                };

                                const mod = message.author.tag;

                                await message.reply({
                                    content: "``" + user.tag + "`` " + Language.ban.server.Message + " ``" + reason + "``.",
                                });

                                if (LoggingData) {
                                    if (LoggingData.ChannelIDBan) {
                                        if (message.guild.members.guild.me.permissionsIn(LoggingData.ChannelIDBan).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                                            const logChannel = message.guild.channels.cache.get(LoggingData.ChannelIDBan);

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
                                    content: Language.ban.dm.you + " ``" + message.guild.name + "`` " + Language.ban.dm.for + " ``" + reason + "`` " + Language.ban.dm.by + " ``" + mod + "``.",
                                }).catch(() => { return });

                                return message.guild.members.ban(user.id, { reason: [reason + " | " + mod] });
                        };
                    } else {
                        return message.reply({
                            content: Language.ban.permission.Me,
                        });
                    };
                } else {
                    return message.reply({
                        content: Language.ban.permission.Myself,
                    });
                };
            };
        } catch (error) {
            let FetchGuild = bot.guilds.cache.get(Config.guildId);
            let CrashChannel = FetchGuild.channels.cache.get(Config.CrashChannel);
            console.log("//------------------------------------------------------------------------------//");
            console.log(error);
            console.log("//------------------------------------------------------------------------------//");

            return CrashChannel.send({ content: "**Error in the '" + EN.ban.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};