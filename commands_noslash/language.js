const { en } = require('../preset/language')
const { logging } = require('../preset/db')

module.exports = {
    name: en.language.default.name,
    execute: async (message, EmbedBuilder, args) => {


        if (message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
            const loggingData = await logging.findOne({ where: { guildId: message.guild.id } });

            if (message.member.permissions.has("MANAGE_GUILD")) {
                return message.reply({
                    content: "You cannot execute this command! You need the following permission ``MANAGE_GUILD``.",
                });
            };

            let language = [
                "en",
                "fr",
                "nl",
                "de",
                "sp",
            ];

            if (!loggingData) {
                await logging.create({
                    guildId: message.guild.id,
                });
            };

            if (!args[0] || !args.length < 1) {
                return message.reply({
                    content: "Here is the available languages:\n\n``en``, ``fr``, ``nl``, ``de``, ``sp``",
                });
            };

            if (!language.includes(args[0])) {
                return message.reply({
                    content: "I cannot find this language, are you sure you picked one of the available language?",
                });
            }

            await logging.update({
                language: args[0],
            }, { where: { guildId: message.guild.id } });

            return message.reply({
                content: "The language of the server has been succesfuly changed for ``" + args[0] + "``.",
            });
        };
    }
}