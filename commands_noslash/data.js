const { en } = require('../preset/language')
const { actionImage } = require('../preset/db')

const configPreset = require("../config/main.json");

module.exports = {
    name: en.data.default.name,
    execute: async (message, EmbedBuilder, args) => {
        if (message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
            if (message.author.id === configPreset.botInfo.ownerId) {
                const actionImageData = await actionImage.findOne({ where: { imageUrl: args[0] } });

                if (!args[0]) {
                    await message.reply({
                        content: "Please send an image link to remove.",
                    });
                };

                await message.delete()

                if (actionImageData) {
                    await message.reply({
                        content: "Image removed",
                    });

                    return actionImage.destroy({ where: { imageUrl: args[0] } });
                } else {
                    return message.reply({
                        content: "Cannot find this image in the database.",
                    });
                };
            };
        };
    }
};