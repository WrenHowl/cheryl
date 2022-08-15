const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'welcomemessage' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("welcomemessage")
        .setDescription('Send your verification message in a channel.')
        .addChannelOption(option => option.setName("channel").setDescription("Channel to send the verification message").setRequired(true)),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        if (message.member.permissions.has("MANAGE_GUILD")) {

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
                ChannelIDKick: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDReceiveVerification: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });

            const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

            if (!LoggingData) {
                return interaction.reply({
                    content: "There's some setting that aren't setup on that server for that command. Please use ``/settings`` to start setting it up.",
                    ephemeral: true,
                });
            } else if (!LoggingData.ChannelIDReceiveVerification | !LoggingData.ChannelIDVerify | !LoggingData.RoleToAddVerify | !LoggingData.RoleToRemoveVerify | !LoggingData.StaffRoleVerify) {
                return interaction.reply({
                    content: "There's some setting that aren't setup on that server for that command. Please use ``/settings`` to start setting it up.",
                    ephemeral: true,
                });
            }

            const channelToSend = message.guild.channels.cache.get();

            const buttonToVerify = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('buttonToVerify')
                        .setLabel('✅ Verify')
                        .setStyle('SUCCESS'),
                );

            const secondMessage = new MessageEmbed()
                .setTitle("Verification")
                .setDescription(
                    `Welcome to **` + message.guild.name + `**, to gain access to the server, please click on the button below to start your verification.\n` +
                    `\nWhen you're doing your verification, please add details and take your time. There's chance you don't get accepted if you don't put any "efforts" on it.\n` +
                    `\n> **__Verification time:__** 　 1-20 minutes\n` +
                    `\n*When clicking on the button 'Verify' you accept the <#898360656175198249> and it's consequences if you're breaking them.*`
                )
                .setColor("2f3136")

            return channelToSend.send({
                embeds: [secondMessage],
                components: [buttonToVerify],
            });
        }
    }
};