const configPreset = require("../config/main.json");

const en = require("../languages/en.json");

module.exports = {
    name: en.cmd.default.name,
    execute: async (bot, message, sequelize, Sequelize) => {
        const CommandFunction = sequelize.define("CommandFunction", {
            name: {
                type: Sequelize.STRING,
            },
            value: {
                type: Sequelize.STRING,
            },
        });

        let statusCommand = await CommandFunction.findOne({ where: { name: en.dataRemove.default.name } });

        if (!statusCommand) {
            return CommandFunction.create({
                name: en.dataRemove.default.name,
                value: "Enable",
            });
        };

        try {
            if (message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {

                if (message.author.id === configPreset.botInfo.ownerId) {
                    let deleteReply = setTimeout(() => reply.delete(), 2500);
                    let statusSelection = args[1];

                    let arrayCmd = [
                        "blacklist",
                        "permission",
                        "settings",
                        "welcomemenu",
                        "ban",
                        "kick",
                        "warn",
                        "warns",
                        "lock",
                        "unlock",
                        "verify",
                        "help",
                        "ping",
                        "profile",
                        "serverinfo",
                        "staff",
                        "ticket",
                        "report",
                        "avatar",
                        "action",
                        "language"
                    ];
                    let status = [
                        "Enable",
                        "Disable"
                    ];

                    setTimeout(() => message.delete(), 1500)

                    if (!args[0]) {
                        return message.reply("You need to select a command to disable globally").then((reply) => {
                            deleteReply;
                        });
                    };

                    if (!arrayCmd.includes(args[0])) {
                        return message.reply("This command doesn't exist.").then((reply) => {
                            deleteReply;
                        });
                    };

                    if (status.includes(statusSelection)) {
                        return message.reply("Please choose if you want to enable/disable the command.").then((reply) => {
                            deleteReply;
                        });
                    };

                    switch (statusSelection) {
                        case ("Enable"):
                            await CommandFunction.update({ value: statusSelection }, { where: { name: args[0] } });

                            return message.reply("This command has been successfully enabled.").then((reply) => {
                                deleteReply;
                            });
                        case ("Disable"):
                            await CommandFunction.update({ value: statusSelection }, { where: { name: args[0] } });

                            return message.reply("This command has been successfully disabled.").then((reply) => {
                                deleteReply;
                            });
                        default:
                            return message.reply("Please choose between ``Enable`` OR ``Disable``.").then((reply) => {
                                deleteReply;
                            });
                    }
                };
            };
        } catch (error) {
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.guildId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(error);

            return crashchannelId.send({ content: "**Error in the '" + en.cmd.default.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
};