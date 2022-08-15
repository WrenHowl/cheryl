const { MessageActionRow, MessageEmbed, MessageButton, BitField } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'ban' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user.')
        .addUserOption(option => option.setName("user").setDescription("User to ban").setRequired(true))
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
            BanByPassRole: {
                type: Sequelize.STRING,
                unique: false,
            },
        });
        const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

        const PrivatePerms = interaction.member.roles.cache.some(role => role.name === "Moderation") | interaction.member.roles.cache.some(role => role.name === "Management");

        if (PrivatePerms | interaction.member.roles.cache.some(role => role.id === LoggingData.BanByPassRole) | interaction.member.permissions.has("BAN_MEMBERS")) {
            const user = interaction.options.getUser("user");
            const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });

            switch (member.id) {
                case (!member):
                    return interaction.reply({
                        content: "I can't find this user!",
                        ephemeral: true
                    });
                case (interaction.member.id):
                    return interaction.reply({
                        content: "You can't ban yourself!",
                        ephemeral: true
                    });
                case (bot.user.id):
                    return interaction.reply({
                        content: "You can't ban me!",
                        ephemeral: true
                    });
                case (member.roles.highest.position >= interaction.member.roles.highest.position):
                    return interaction.reply({
                        content: "You can't ban this user, because he's higher than you!",
                        ephemeral: true
                    });
                case (!member.kickable):
                    return interaction.reply({
                        content: "I can't ban this user!",
                        ephemeral: true,
                    });
                case ("610309745714135040"):
                    return interaction.reply({
                        content: "You can't ban him Mega.",
                        ephemeral: true,
                    });
                default:
                    const reason = interaction.options.getString("reason");
                    const admin = interaction.user.tag;

                    const banMessage = new MessageEmbed()
                        .setDescription("``" + member.user.tag + "`` has been banned from the server for ``" + reason + "``")
                        .setColor("2f3136")

                    await interaction.reply({
                        embeds: [banMessage],
                        ephemeral: true,
                    });

                    if (LoggingData) {
                        if (LoggingData.ChannelIDBan) {
                            const logChannel = interaction.guild.channels.cache.get(LoggingData.ChannelIDBan);

                            const logMessage = new MessageEmbed()
                                .setTitle("New Ban")
                                .setDescription("**__User:__** ``" + user.tag + "``\n**__Reason:__** ``" + reason + "``\n**__Moderator:__** ``" + admin + "``")
                                .setFooter({ text: "ID: " + user.id })
                                .setTimestamp()
                                .setColor("2f3136")

                            await logChannel.send({
                                embeds: [logMessage],
                            });
                        }
                    }

                    const buttonBan = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('Permanent Invite Link')
                                .setStyle('LINK')
                                .setURL("https://discord.gg/ocf"),
                        );

                    const banDM = new MessageEmbed()
                        .setDescription("You have been banned on ``" + interaction.guild.name + "`` for ``" + reason + "`` by ``" + admin + "``.")
                        .setColor("2f3136")

                    if (interaction.guild.id === "821241527941726248") {
                        await member.send({
                            embeds: [banDM],
                            components: [buttonBan],
                        }).catch(() => { return });

                        return member.ban({ reason: [reason + " | " + admin] });
                    };

                    await member.send({
                        embeds: [banDM],
                    }).catch(() => { return });

                    return member.ban({ reason: [reason + " | " + admin] });
            }
        } else {
            if (interaction.guild.id === "821241527941726248") {
                return interaction.reply({
                    content: "You cannot execute this command! You need the following roles ``Moderation`` or ``Management``.",
                    ephemeral: true
                })
            }

            return interaction.reply({
                content: "You cannot execute this command! You need the following permission ``BAN_MEMBERS``.",
                ephemeral: true
            })
        }
    }
};