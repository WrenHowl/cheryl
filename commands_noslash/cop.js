const Discord = require('discord.js');
const Config = require("../config/config.json");
const LanguageEN = require("../languages/en.json");

module.exports = {
    name: LanguageEN.cop.Name,
    execute: async (bot, message, args, sequelize, Sequelize) => {
        try {
            if (message.guild.members.guild.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                if (message.author.id === Config.ownerId) {
                    const ActionImage = sequelize.define("ActionImage", {
                        ImageURL: {
                            type: Sequelize.STRING,
                            unique: false,
                        },
                        Category: {
                            type: Sequelize.STRING,
                            unique: false,
                        },
                        MessageID: {
                            type: Sequelize.STRING,
                            unique: false,
                        },
                        UserName: {
                            type: Sequelize.STRING,
                            unique: false,
                        },
                        UserID: {
                            type: Sequelize.STRING,
                            unique: false,
                        },
                    });

                    const ActionImageData = await ActionImage.findOne({ where: { ImageURL: args[0] } });

                    if (args[0]) {
                        if (ActionImageData) {
                            await message.reply({
                                content: "Image removed.",
                            });

                            return ActionImage.destroy({ where: { ImageURL: args[0] } });
                        };
                    };
                };
            };
        } catch (error) {
            let fetchGuild = bot.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);

            return CrashChannel.send({ content: "**Error in the '" + LanguageEN.cop.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};