const configPreset = require("../settings/config.json");
const messagePreset = require("../settings/message.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

module.exports = {
    name: en.unban.default.name,
    execute: async (bot, message, args, EmbedBuilder, sequelize, Sequelize) => {
        try {
            if (message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
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
                            .setDescription("**Utilisation:** ``" + configPreset.botInfo.messagePrefix + en.unban.default.name + " <@user> <reason>``")
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
                                            if (message.guild.members.me.permissionsIn(LoggingData.ChannelIDUnban).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
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
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.guildId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(error);

            return crashchannelId.send({ content: "**Error in the '" + en.ban.commandInteraction.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
}