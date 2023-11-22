const configPreset = require("../config/main.json");

const en = require("../languages/en.json");

module.exports = {
    name: en.dataRemove.default.name,
    execute: async (bot, message, args, sequelize, Sequelize) => {
        try {
            if (message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                if (message.author.id === configPreset.botInfo.ownerId) {
                    const ActionImage = sequelize.define("ActionImage", {
                        imageUrl: {
                            type: Sequelize.STRING,
                            unique: false,
                        },
                        category: {
                            type: Sequelize.STRING,
                            unique: false,
                        },
                        messageId: {
                            type: Sequelize.STRING,
                            unique: false,
                        },
                        userTag: {
                            type: Sequelize.STRING,
                            unique: false,
                        },
                        userId: {
                            type: Sequelize.STRING,
                            unique: false,
                        },
                    });

                    const actionImageData = await ActionImage.findOne({ where: { imageUrl: args[0] } });

                    if (args[0]) {
                        if (actionImageData) {
                            await message.reply({
                                content: "Image removed",
                            });

                            return ActionImage.destroy({ where: { imageUrl: args[0] } });
                        } else {
                            return message.reply({
                                content: "Cannot find this image in the database"
                            })
                        }
                    };
                };
            };
        } catch (error) {
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.guildId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(error);

            return crashchannelId.send({ content: "**Error in the '" + en.ban.commandInteraction.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
};