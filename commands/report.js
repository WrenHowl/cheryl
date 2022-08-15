const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'report' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report a user.')
        .addUserOption(option => option.setName("user").setDescription("User to report").setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Choose a reason')
                .setRequired(true)
                .addChoices(
                    { name: 'Self Promotion or Spam', value: 'Self Promotion or Spam' },
                    { name: 'Threats, intimidation, racism or homophobic', value: 'Threats, intimidation, racism or homophobic' },
                    { name: 'To young to use Discord', value: 'To young to use Discord' },
                    { name: 'NSFW or Political topics', value: 'NSFW or Political topics' },
                    { name: 'Blocking an Administrator', value: 'Blocking an Administrator' },
                    { name: 'Leak of private information', value: 'Leak of private information' },
                    { name: 'Troll or Anti-Furry', value: 'Troll or Anti-Furry' },
                    { name: 'Multiples warnings', value: 'Multiples warnings' },
                    { name: 'Drama', value: 'Drama' },
                    { name: 'Other', value: 'Other' },
                )),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });

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

        if (!LoggingData) {
            return interaction.reply({
                content: "There's some setting that aren't setup on that server for that command. Please use ``/settings`` to start setting it up.",
                ephemeral: true,
            });
        } else if (!LoggingData.ChannelIDReport | !LoggingData.StaffRoleReport) {
            return interaction.reply({
                content: "There's some setting that aren't setup on that server for that command. Please use ``/settings`` to start setting it up.",
                ephemeral: true,
            });
        };

        switch (member.id) {
            case (!member):
                return interaction.reply({
                    content: "I can't find this user!",
                    ephemeral: true
                });
            case (interaction.member.id):
                return interaction.reply({
                    content: "You can't report yourself!",
                    ephemeral: true
                });
            case (bot.user.id):
                return interaction.reply({
                    content: "You can't report me!",
                    ephemeral: true
                });
            default:
                const reason = interaction.options.getString("reason");

                const banMessage = new MessageEmbed()
                    .setDescription("You have successfully reported ``" + member.user.tag + "`` for ``" + reason + "``")
                    .setColor("2f3136")

                await interaction.reply({
                    embeds: [banMessage],
                    ephemeral: true
                });

                const logChannel = interaction.guild.channels.cache.get(LoggingData.ChannelIDReport);

                const logMessage = new MessageEmbed()
                    .setTitle("New report")
                    .setDescription("Report made by ``" + interaction.user.tag + "`` on ``" + member.user.tag + "`` for ``" + reason + "``")
                    .setTimestamp()
                    .setFooter({
                        text: "ID: " + member.user.id,
                    })
                    .setColor("2f3136")

                if (!LoggingData.StaffRoleReport) {
                    return logChannel.send({
                        embeds: [logMessage],
                    });
                }

                return logChannel.send({
                    content: "<@&" + LoggingData.StaffRoleReport + ">",
                    embeds: [logMessage],
                });
        }
    }
};