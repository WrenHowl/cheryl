const configPreset = require("../settings/config.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

module.exports = {
    name: en.language.default.Name,
    execute: async (bot, message, args, sequelize, Sequelize) => {
        try {
            if (message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {

                const Logging = sequelize.define("Logging", {
                    GuildID: {
                        type: Sequelize.STRING,
                        unique: false,
                    },
                    Language: {
                        type: Sequelize.STRING,
                        unique: false,
                    },
                });

                const LoggingData = await Logging.findOne({ where: { GuildID: message.guild.id } });

                if (message.member.permissions.has("MANAGE_GUILD")) {
                    let LanguageList = [
                        "en",
                        "fr",
                        "nl",
                        "de",
                        "sp",
                    ];

                    if (!LoggingData) {
                        await LoggingData.create({
                            GuildID: message.guild.id,
                        });
                    };

                    if (args[0] || args.length < 1) {
                        if (LanguageList.includes(args[0])) {
                            await LoggingData.update({
                                Language: args[0],
                            }, { where: { GuildID: message.guild.id } });

                            return message.reply({
                                content: "The language of the server has been succesfuly changed for ``" + args[0] + "``.",
                            });
                        } else {
                            return message.reply({
                                content: "I cannot find this language, are you sure you picked one of the available language?",
                            });
                        };
                    } else {
                        return message.reply({
                            content: "Here is the available languages:\n\n``en``, ``fr``, ``nl``, ``de``, ``sp``",
                        });
                    };
                } else {
                    return message.reply({
                        content: "You cannot execute this command! You need the following permission ``MANAGE_GUILD``.",
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