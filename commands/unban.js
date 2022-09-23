const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'unban' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user.')
        .addUserOption(option => option.setName("user").setDescription("User to unban").setRequired(true)),
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

        if (PrivatePerms | interaction.member.permissions.has("BAN_MEMBERS")) {
            const user = interaction.options.getUser("user");

            const banList = await interaction.guild.fetchBans();

            const bannedUser = banList.find(user => user.id === user.id);

            switch (user.id) {
                case (!user):
                    return interaction.reply({
                        content: "I can't find this user!",
                        ephemeral: true
                    });
                case (interaction.member.id):
                    return interaction.reply({
                        content: "You can't unban yourself!",
                        ephemeral: true
                    });
                case (bot.user.id):
                    return interaction.reply({
                        content: "You can't unban me!",
                        ephemeral: true
                    });
                case (bannedUser):
                    return interaction.reply({
                        content: "You can't unban someone who isn't ban!",
                        ephemeral: true
                    });
                default:
                    const banMessage = new MessageEmbed()
                        .setDescription("``" + user.tag + "`` has been unban from the server.")
                        .setColor("2f3136")

                    await interaction.reply({
                        embeds: [banMessage],
                        ephemeral: true,
                    });

                    /*if (LoggingData) {
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
                    }*/

                    return interaction.guild.members.unban(user.id);
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