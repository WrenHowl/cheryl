const Discord = require('discord.js');
const Config = require("../config/config.json");
const LanguageEN = require("../languages/en.json");

module.exports = {
    name: LanguageEN.cmd.Name,
    execute: async (bot, message, args, sequelize, Sequelize) => {
        try {
            if (message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                const CommandFunction = sequelize.define("CommandFunction", {
                    name: {
                        type: Sequelize.STRING,
                    },
                    value: {
                        type: Sequelize.STRING,
                    },
                });

                if (message.author.id === Config.ownerId) {
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

                    let EnableDisable = [
                        "Enable",
                        "Disable"
                    ];

                    if (args[0]) {
                        if (arrayCmd.includes(args[0])) {
                            if (EnableDisable.includes(args[1])) {
                                if (args[1] === "Enable") {
                                    setTimeout(() => message.delete(), 1500)

                                    await CommandFunction.update({ value: args[1] }, { where: { name: args[0] } });

                                    return message.reply("This command has been successfully enabled.").then((reply) => {
                                        setTimeout(() => reply.delete(), 2500)
                                    });
                                } else if (args[1] === "Disable") {
                                    setTimeout(() => message.delete(), 1500)

                                    await CommandFunction.update({ value: args[1] }, { where: { name: args[0] } });

                                    return message.reply("This command has been successfully disabled.").then((reply) => {
                                        setTimeout(() => reply.delete(), 2500)
                                    });
                                } else {
                                    setTimeout(() => message.delete(), 1500)

                                    return message.reply("Please choose between ``Enable`` OR ``Disable``.").then((reply) => {
                                        setTimeout(() => reply.delete(), 2500)
                                    });
                                }
                            } else {
                                setTimeout(() => message.delete(), 1500)

                                return message.reply("Please choose if you want to enable/disable the command.").then((reply) => {
                                    setTimeout(() => reply.delete(), 2500)
                                });
                            };
                        } else {
                            setTimeout(() => message.delete(), 1500)

                            return message.reply("This command doesn't exist.").then((reply) => {
                                setTimeout(() => reply.delete(), 2500)
                            });
                        };
                    } else {
                        setTimeout(() => message.delete(), 1500)

                        return message.reply("You need to select a command to disable globally.").then((reply) => {
                            setTimeout(() => reply.delete(), 2500)
                        });
                    };
                };
            };
        } catch (error) {
            let fetchGuild = bot.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);

            return CrashChannel.send({ content: "**Error in the " + LanguageEN.cmd.Name + " Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};