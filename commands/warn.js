const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'warn' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a user.')
        .addUserOption(option => option.setName("user").setDescription("User to warn").setRequired(true))
        .addStringOption(option => option
            .setName('reason')
            .setDescription('Choose a reason')
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

        if (interaction.member.permissions.has("MODERATE_MEMBERS")) {
            const user = interaction.options.getUser("user");
            const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(error => { });

            const Warns = sequelize.define("Warns", {
                UserName: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                UserID: {
                    type: Sequelize.STRING,
                    unique: false,
                    primaryKey: false,
                },
                ModName: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ModID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                Reason: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                GuildID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });

            let guild = bot.guilds.cache.get(interaction.guild.id);
            let userInServer = null;

            if (guild.members.cache.get(user.id)) userInServer = member.roles.highest.position >= interaction.member.roles.highest.position;
            if (!guild.members.cache.get(user.id)) userInServer;

            switch (user.id) {
                case (!user):
                    return interaction.reply({
                        content: "I can't find this user!",
                        ephemeral: true
                    });
                case (interaction.member.id):
                    return interaction.reply({
                        content: "You can't warn yourself!",
                        ephemeral: true
                    });
                case (bot.user.id):
                    return interaction.reply({
                        content: "You can't warn me!",
                        ephemeral: true
                    });
                case (userInServer):
                    return interaction.reply({
                        content: "You can't warn this user, because he's higher than you!",
                        ephemeral: true
                    });
                default:
                    const reason = interaction.options.getString("reason");
                    const admin = interaction.user;

                    const WarnMessage = new MessageEmbed()
                        .setDescription("``" + user.tag + "`` has been warned for ``" + reason + "``")
                        .setColor("2f3136")

                    await interaction.reply({
                        embeds: [WarnMessage],
                        ephemeral: true
                    })

                    if (LoggingData) {
                        if (LoggingData.ChannelIDWarn) {
                            if (interaction.guild.members.guild.me.permissionsIn(LoggingData.ChannelIDWarn).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                                const LogChannel = interaction.guild.channels.cache.get(LoggingData.ChannelIDWarn)

                                const LogMessage = new MessageEmbed()
                                    .setTitle("New Warn")
                                    .setDescription("**__User:__** ``" + user.tag + "``\n**__Reason:__** ``" + reason + "``\n**__Moderator:__** ``" + admin.tag + "``")
                                    .setFooter({ text: "ID: " + user.id })
                                    .setTimestamp()
                                    .setColor("2f3136")

                                await LogChannel.send({
                                    embeds: [LogMessage]
                                })
                            }
                        }
                    }

                    const WarnDm = new MessageEmbed()
                        .setDescription("You have been warned on ``" + interaction.guild.name + "`` for ``" + reason + "`` by ``" + admin + "``.")
                        .setColor("2f3136")

                    await member.send({
                        embeds: [WarnDm],
                    }).catch(() => {
                        return;
                    })

                    const NewWarn = await Warns.create({
                        UserName: user.tag,
                        UserID: user.id,
                        ModName: admin.tag,
                        ModID: admin.id,
                        Reason: reason,
                        GuildID: interaction.guild.id,
                    })
            }
        } else {
            if (interaction.guild.id === "821241527941726248") {
                return interaction.reply({
                    content: "You cannot execute this command! You need the following roles ``Moderation`` or ``Management``.",
                    ephemeral: true
                })
            }

            return interaction.reply({
                content: "You cannot execute this command! You need the following permission ``MODERATE_MEMBERS``.",
                ephemeral: true
            })
        }
    }
};