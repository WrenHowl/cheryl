const configPreset = require("../settings/config.json");
const messagePreset = require("../settings/message.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

module.exports = {
    name: en.ban.default.name,
    execute: async (bot, message, args, EmbedBuilder, sequelize, Sequelize) => {
        try {
            if (message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
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

                let loggingData = await Logging.findOne({ where: { guildId: message.guild.id } });

                let botCanBan = message.guild.me.permissions.has("BanMembers");
                let memberCanBan = message.guild.me.permissions.has("BanMembers");

                let user = await bot.users.fetch(args[0]) || message.mentions.members.first();
                let reason = args.slice(1).join(' ');
                let guild = bot.guilds.cache.get(message.guild.id);
                let banList = await message.guild.bans.fetch();
                let bannedUser = banList.get(user.id);

                !botCanBan ? refusingAction = messagePreset.Ticket.cantManageChannels : refusingAction = messagePreset.Ticket.Error;
                !memberCanBan ? refusingAction = messagePreset.Ticket.PermissionMember.ban : refusingAction = messagePreset.Ticket.Error;

                switch (loggingData.language) {
                    case ("en"):
                        languageSet = en;
                    case ("fr"):
                        languageSet = fr;
                    case ("de"):
                        languageSet = de;
                    case ("sp"):
                        languageSet = sp;
                    case ("nl"):
                        languageSet = nl;
                    default:
                        languageSet = en;
                }

                if (!canBan | !manageChannelPermission) {
                    return interaction.reply({
                        content: messageRefusingAction,
                        ephemeral: true,
                    });
                };

                if (!args[0] | !user | !reason) {
                    const errorEmbed = new EmbedBuilder()
                        .setTitle("Ban Syntax")
                        .setDescription("**Utilisation:** ``" + Config.Prefix + "ban <@user> <reason>``")
                        .setColor(Color.Blue);

                    return message.reply({
                        embeds: [errorEmbed],
                    });
                };

                switch (user.id) {
                    case (!user):
                        return message.reply({
                            content: languageSet.default.unknownUser,
                        });
                    case (message.author.id):
                        return message.reply({
                            content: languageSet.ban.default.myself,
                        });
                    case (bot.user.id):
                        return message.reply({
                            content: languageSet.ban.default.bot,
                        });
                    case (message.guild.ownerId):
                        return message.reply({
                            content: languageSet.ban.default.owner,
                        });
                    case (!user.bannable):
                        return message.reply({
                            content: languageSet.ban.default.punishable,
                        });
                    default:
                        if (guild.members.cache.find(m => m.id === user.id)?.id) {
                            if (member.roles.highest.position >= message.member.roles.highest.position) {
                                return message.reply({
                                    content: languageSet.ban.default.role,
                                });
                            };
                        } else if (bannedUser) {
                            return message.reply({
                                content: languageSet.ban.default.punished,
                            });
                        };

                        const mod = message.author.tag;

                        await message.reply({
                            content: "*" + user.tag + "* " + languageSet.ban.server.message
                        });

                        if (loggingData.ChannelIDBan) {
                            if (!message.guild.members.guild.me.permissionsIn(loggingData.channeldId_Ban).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) return;

                            const logChannel = message.guild.channels.cache.get(loggingData.channeldId_Ban);

                            const logMessage = new EmbedBuilder()
                                .setTitle(languageSet.ban.server.New)
                                .addFields(
                                    { name: languageSet.ban.server.user, value: "``" + user.tag + "``" },
                                    { name: languageSet.ban.server.reason, value: "``" + reason + "``" },
                                    { name: languageSet.ban.server.mod, value: "``" + mod + "``" },
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
                            content: languageSet.ban.dm.you + " *" + message.guild.name + "* " + languageSet.ban.dm.for + " *" + reason + "* " + languageSet.ban.dm.by + " *" + mod + "*",
                        }).catch(() => { return });

                        return message.guild.members.ban(user.id, { reason: [reason + " | " + mod] });
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