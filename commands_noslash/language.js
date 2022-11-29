const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Config = require("../config/config.json");
const LanguageEN = require("../languages/en.json");

const en = LanguageEN.language;

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The '" + en.Name + "' command is loaded.");

module.exports = {
    name: en.Name,
    execute: async (bot, message, args, MessageEmbed, sequelize, Sequelize) => {
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

                const FindCommand = await CommandFunction.findOne({ where: { name: en.Name } });
                const MessageReason = require("../config/message.json");

                if (FindCommand) {
                    if (FindCommand.value === "Disable") {
                        return message.reply({
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

                    if (args[0]) {
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
            let fetchGuild = message.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
            console.log("//------------------------------------------------------------------------------//");
            console.log(error);
            console.log("//------------------------------------------------------------------------------//");

            return CrashChannel.send({ content: "**Error in the " + en.Name + " Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};