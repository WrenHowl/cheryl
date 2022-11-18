const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const LanguageEN = require("../languages/en.json");

const en = LanguageEN.language;

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The '" + en.Name + "' command is loaded.");

module.exports = {
    name: en.Name,
    execute: async (bot, message, args, MessageEmbed, sequelize, Sequelize) => {
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
    }
};