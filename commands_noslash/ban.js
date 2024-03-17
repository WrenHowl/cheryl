const configPreset = require("../config/main.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

module.exports = {
    name: en.ban.default.name,
    execute: async (bot, message, args, EmbedBuilder, sequelize, Sequelize) => {
        const Logging = sequelize.define("Logging", {
            guildId: {
                type: Sequelize.STRING,
            },
            language: {
                type: Sequelize.STRING,
            },
            channelId_Ban: {
                type: Sequelize.STRING,
            },
        });

        let loggingData = await Logging.findOne({ where: { guildId: interaction.guild.id } });

        switch (loggingData.language) {
            case ("en"):
                languagePreset = en;
                break;
            case ("fr"):
                languagePreset = fr;
                break;
            case ("de"):
                languagePreset = de;
                break;
            case ("sp"):
                languagePreset = sp;
                break;
            case ("nl"):
                languagePreset = nl;
                break;
            default:
                languagePreset = en;
                break;
        }

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
            if (!message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) return;

            let botCanBan = message.guild.me.permissions.has("BanMembers");
            let memberCanBan = message.guild.me.permissions.has("BanMembers");

            if (!botCanBan | !memberCanBan) {
                !botCanBan ? refusingAction = languageSet.ban.permission.bot : refusingAction = languageSet.default.errorOccured;
                !memberCanBan ? refusingAction = languageSet.ban.permission.bot : refusingAction = languageSet.default.errorOccured;

                return interaction.reply({
                    content: messageRefusingAction,
                    ephemeral: true,
                });
            };

            let guild = await bot.guilds.cache.get(message.guild.id);
            let user = await bot.users.fetch(args[0]) || message.mentions.members.first();
            let reason = await args.slice(1).join(' ');

            let banList = await message.guild.bans.fetch();
            let bannedUser = await banList.get(user.id);

            const embed = new EmbedBuilder()

            if (!args[0] | !user | !reason) {
                embed.setTitle("Ban Syntax");
                embed.setDescription("**Utilisation:** ``" + Config.Prefix + "ban <@user> <reason>``");
                embed.setColor(Color.Blue);

                return message.reply({
                    embeds: [embed],
                });
            };

            switch (user.id) {
                case (!user):
                    return message.reply({
                        content: languagePreset.default.unknownUser,
                    });
                case (message.author.id):
                    return message.reply({
                        content: languageSet.ban.message.onWho.isThemself,
                    });
                case (bot.user.id):
                    return message.reply({
                        content: languageSet.ban.message.onWho.isBot,
                    });
                case (message.guild.ownerId):
                    return message.reply({
                        content: languageSet.ban.message.onWho.isOwner,
                    });
                case (!user.bannable):
                    return message.reply({
                        content: languageSet.ban.message.onWho.isPunishable,
                    });
                default:
                    if (guild.members.cache.find(m => m.id === user.id)?.id) {
                        if (member.roles.highest.position >= message.member.roles.highest.position) {
                            return message.reply({
                                content: languagePreset.ban.default.role,
                            });
                        };
                    } else if (bannedUser) {
                        return message.reply({
                            content: languagePreset.ban.default.punished,
                        });
                    };

                    const mod = message.author.tag;

                    await message.reply({
                        content: "*" + user.tag + "* " + languagePreset.ban.server.message
                    });

                    if (loggingData.ChannelIDBan) {
                        if (!message.guild.members.guild.me.permissionsIn(loggingData.channeldId_Ban).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) return;

                        const logChannel = message.guild.channels.cache.get(loggingData.channeldId_Ban);

                        const logMessage = new EmbedBuilder()
                            .setTitle(languagePreset.ban.server.New)
                            .addFields(
                                { name: languagePreset.ban.server.user, value: "``" + user.tag + "``" },
                                { name: languagePreset.ban.server.reason, value: "``" + reason + "``" },
                                { name: languagePreset.ban.server.mod, value: "``" + mod + "``" },
                            )
                            .setFooter({
                                text: "ID: " + user.id
                            })
                            .setTimestamp()
                            .setColor("Red");

                        await logChannel.send({
                            embeds: [logMessage],
                        });
                    };

                    await user.send({
                        content: languagePreset.ban.dm.you + " *" + message.guild.name + "* " + languagePreset.ban.dm.for + " *" + reason + "* " + languagePreset.ban.dm.by + " *" + mod + "*",
                    }).catch(() => { return });

                    return message.guild.members.ban(user.id, { reason: [reason + " | " + mod] });
            };

        } catch (error) {
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.guildId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(error);

            return crashchannelId.send({ content: "**Error in the '" + en.ban.default.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
};