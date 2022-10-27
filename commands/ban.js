const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");

const fr = LanguageFR.ban;
const en = LanguageEN.ban;

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The '" + en.Name + "' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.Name)
        .setNameLocalizations({
            "fr": fr.Name
        })
        .setDescription(en.Description)
        .setDescriptionLocalizations({
            "fr": fr.Description
        })
        .addUserOption(option => option
            .setName(en.UserName)
            .setNameLocalizations({
                "fr": fr.UserName
            })
            .setDescription(en.UserDescription)
            .setDescriptionLocalizations({
                "fr": fr.UserDescription
            })
            .setRequired(true))
        .addStringOption(option => option
            .setName(en.ReasonName)
            .setNameLocalizations({
                "fr": fr.ReasonName
            })
            .setDescription(en.ReasonDescription)
            .setDescriptionLocalizations({
                "fr": fr.ReasonDescription
            })
            .setRequired(true)
        ),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const Logging = sequelize.define("Logging", {
            GuildID: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDReport: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDBan: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDEnterServer: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDWelcome: {
                type: Sequelize.STRING,
                unique: false,
            },
            StaffRoleReport: {
                type: Sequelize.STRING,
                unique: false,
            },
            StaffRoleVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            RoleToAddVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            RoleToRemoveVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            EnableDisableBlacklistLogger: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDBlacklist: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDWarn: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDUnban: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDKick: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDReceiveVerification: {
                type: Sequelize.STRING,
                unique: false,
            },
            AutoBanStatus: {
                type: Sequelize.STRING,
                unique: false,
            }
        });
        const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

        if (interaction.member.permissions.has("BAN_MEMBERS")) {
            if (interaction.guild.me.permissions.has("BAN_MEMBERS")) {
                const user = interaction.options.getUser(en.UserName);
                const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });
                const banList = await interaction.guild.bans.fetch();
                const bannedUser = banList.find(user => user.id === user.id);
                let guild = bot.guilds.cache.get(interaction.guild.id);

                switch (user.id) {
                    case (!user):
                        return interaction.reply({
                            content: "I can't find this user!",
                            ephemeral: true,
                        });
                    case (interaction.member.id):
                        return interaction.reply({
                            content: "You can't ban yourself!",
                            ephemeral: true,
                        });
                    case (bot.user.id):
                        return interaction.reply({
                            content: "You can't ban me!",
                            ephemeral: true,
                        });
                    case (interaction.guild.ownerId):
                        return interaction.reply({
                            content: "You can't ban the owner!",
                            ephemeral: true,
                        });
                    case (!user.bannable):
                        return interaction.reply({
                            content: "I can't ban this user!",
                            ephemeral: true,
                        });
                    default:
                        if (guild.members.cache.find(m => m.id === user.id)?.id) {
                            if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                                return interaction.reply({
                                    content: "You can't ban this user, because they're higher than you!",
                                    ephemeral: true
                                });
                            }
                        } else if (bannedUser) {
                            return interaction.reply({
                                content: "You can't ban this user, since they are banned already!",
                                ephemeral: true
                            });
                        }

                        const reason = interaction.options.getString(en.ReasonName);
                        const admin = interaction.user.tag;

                        const banMessage = new MessageEmbed()
                            .setDescription("``" + user.tag + "`` has been banned from the server for ``" + reason + "``.")
                            .setColor(Color.Green)

                        await interaction.reply({
                            embeds: [banMessage],
                            ephemeral: true,
                        });

                        if (LoggingData) {
                            if (LoggingData.ChannelIDBan) {
                                if (interaction.guild.members.guild.me.permissionsIn(LoggingData.ChannelIDBan).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                                    const logChannel = interaction.guild.channels.cache.get(LoggingData.ChannelIDBan);

                                    const logMessage = new MessageEmbed()
                                        .setTitle("New Ban")
                                        .setDescription("**__User:__** ``" + user.tag + "``\n**__Reason:__** ``" + reason + "``\n**__Moderator:__** ``" + admin + "``")
                                        .setFooter({ text: "ID: " + user.id })
                                        .setTimestamp()
                                        .setColor(Color.RiskHigh)

                                    await logChannel.send({
                                        embeds: [logMessage],
                                    });
                                };
                            };
                        };

                        const banDM = new MessageEmbed()
                            .setDescription("You have been banned on ``" + interaction.guild.name + "`` for ``" + reason + "`` by ``" + admin + "``.")
                            .setColor(Color.RiskHigh)

                        await user.send({
                            embeds: [banDM],
                        }).catch(() => { return });

                        return interaction.guild.members.ban(user.id, { reason: [reason + " | " + admin] });
                }
            } else {
                return interaction.reply({
                    content: "I need the following permissions: ``BAN_MEMBERS``.",
                    ephemeral: true,
                });
            };
        } else {
            return interaction.reply({
                content: "You cannot execute this command! You need the following permission ``BAN_MEMBERS``.",
                ephemeral: true
            })
        }

    }
};