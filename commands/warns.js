const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'warns' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warns')
        .setDescription('Check warns of a user.')
        .addUserOption(option => option.setName("user").setDescription("User to check warns").setRequired(false)),
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

        const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

        const user = interaction.options.getUser("user");

        let MemberData = "";

        if (user) MemberData = user;
        if (!user) MemberData = interaction.user;

        let member = interaction.guild.members.cache.get(MemberData.id) || await interaction.guild.members.fetch(MemberData.id).catch(err => { });

        switch (MemberData.id) {
            case (!MemberData):
                return interaction.reply({
                    content: "I can't find this user!",
                    ephemeral: true
                });
            case (bot.user.id):
                return interaction.reply({
                    content: "You can't check my warns!",
                    ephemeral: true
                });
            default:
                /*const ShowWarns = new MessageEmbed()
                    .setDescription("Warns of ``" + user.tag + "``")
                    .setColor("2f3136")*/

                return interaction.reply({
                    content: "Currently unavailable"
                })
        }
    }
}