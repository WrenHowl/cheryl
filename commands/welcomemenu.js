const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'welcomemenu' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("welcomemenu")
        .setDescription('Send your verification message in a channel.')
        .addChannelOption(option => option.setName("welcome").setDescription("Channel to send the verification message").setRequired(true))
        .addChannelOption(option => option.setName("rules").setDescription("Channel of the rules to mention in this message").setRequired(true)),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const welcomeOptions = interaction.options.getChannel("welcome");
        const rulesOptions = interaction.options.getChannel("rules");

        if (interaction.member.permissions.has("MANAGE_GUILD")) {
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
            } else if (!LoggingData.ChannelIDReceiveVerification | !LoggingData.ChannelIDVerify | !LoggingData.RoleToAddVerify | !LoggingData.StaffRoleVerify) {
                return interaction.reply({
                    content: "There's some setting that aren't setup on that server for that command. Please use ``/settings`` to start setting it up.",
                    ephemeral: true,
                });
            }

            await interaction.reply({
                content: "Welcome message/menu sent!",
                ephemeral: true,
            });

            const channelToSend = interaction.guild.channels.cache.get(welcomeOptions.id);

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
                    `Welcome to **` + interaction.guild.name + `**, to gain access to the server, please click on the button below to start your verification.\n` +
                    `\nWhen you're doing your verification, please add details and take your time. There's chance you don't get accepted if you don't put any "efforts" on it.\n` +
                    `\n> :warning: If the button doesn't do anything, please make sure your discord is updated!\n` +
                    `\n*When clicking on the button 'Verify' you accept the <#` + rulesOptions.id + `> and it's consequences if you're breaking them.*`
                )
                .setColor("2f3136")

            return channelToSend.send({
                embeds: [secondMessage],
                components: [buttonToVerify],
            });
        }
    }
};