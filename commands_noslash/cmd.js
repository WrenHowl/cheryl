const { en } = require('../preset/language')
const { commandFunction } = require('../preset/db')

const configPreset = require("../config/main.json");

module.exports = {
    name: en.cmd.default.name,
    execute: async (message, EmbedBuilder, args) => {
        if (message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {

            if (message.author.id === configPreset.botInfo.ownerId) {
                let commandList = [
                    "blacklist",
                    "settings",
                    "ban",
                    "kick",
                    "lock",
                    "unlock",
                    "verify",
                    "help",
                    "profile",
                    "staff",
                    "avatar",
                    "action",
                    "language"
                ];
                let status = [
                    true,
                    false
                ];

                setTimeout(() => message.delete(), 1500)

                function deleteReply(reply) {
                    setTimeout(() => reply.delete(), 2500);
                };

                console.log(args)

                if (!args[0]) {
                    return message.reply("You need to select a command to disable globally").then((reply) => {
                        deleteReply(reply);
                    });
                };

                if (!commandList.includes(args[1])) {
                    return message.reply("This command doesn't exist.").then((reply) => {
                        deleteReply(reply);
                    });
                };

                if (status.includes(args[2])) {
                    return message.reply("Please choose if you want to enable/disable the command.").then((reply) => {
                        deleteReply(reply);
                    });
                };

                bool = parseInt(args[2])

                switch (bool) {
                    case (1):
                        await commandFunction.update({ value: bool }, { where: { name: args[0] } });

                        return message.reply("This command has been successfully enabled.").then((reply) => {
                            deleteReply(reply);
                        });
                    case (0):
                        await commandFunction.update({ value: bool }, { where: { name: args[0] } });

                        return message.reply("This command has been successfully disabled.").then((reply) => {
                            deleteReply(reply);
                        });
                    default:
                        return message.reply('Please choose between `' + true + '` OR `' + false + '`.').then((reply) => {
                            deleteReply(reply);
                        });
                }
            };
        };
    }
};