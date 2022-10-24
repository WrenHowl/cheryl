const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require("moment")
const Color = require("../config/color.json");

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'userinfo' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get info about a user.')
        .addUserOption(option => option.setName("user").setDescription("User to get info.").setRequired(false)),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const Verifier = sequelize.define("Verifier", {
            VerifierName: {
                type: Sequelize.STRING,
                unique: true,
            },
            VerifierID: {
                type: Sequelize.STRING,
                unique: true,
                primaryKey: true,
            },
            ModName: {
                type: Sequelize.STRING,
                unique: false,
            },
            ModID: {
                type: Sequelize.STRING,
                unique: false,
            },
            GuildID: {
                type: Sequelize.STRING,
                unique: false,
            },
        });

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        }

        let user = interaction.options.getUser("user");
        let MemberData = "";

        if (user) MemberData = user;
        if (!user) MemberData = interaction.member;

        let member = interaction.guild.members.cache.get(MemberData.id) || await interaction.guild.members.fetch(MemberData.id).catch(err => { });

        if (user) CheckDaysCreatedAt = user.createdAt;
        if (!user) CheckDaysCreatedAt = interaction.user.createdAt;

        let guild = bot.guilds.cache.get(interaction.guild.id);
        let JoinedAtData = "";
        let CheckDaysJoinedAt = "";

        if (guild.members.cache.get(MemberData.id)) JoinedAtData = interaction.member.joinedAt;
        if (!guild.members.cache.get(MemberData.id)) JoinedAtData = "No Data Found";
        if (guild.members.cache.get(MemberData.id)) CheckDaysJoinedAt = moment(JoinedAtData).format("Do MMMM YYYY hh:ss:mm A") + " / " + (checkDays(JoinedAtData));
        if (!guild.members.cache.get(MemberData.id)) CheckDaysJoinedAt = "No Data Found";

        let verifLog = await Verifier.findOne({ where: { VerifierID: MemberData.id, GuildID: interaction.guild.id } });

        if (verifLog) verifLog = verifLog.ModName;
        if (!verifLog) verifLog = "No Data Found";

        let roleMap = "";

        if (guild.members.cache.get(MemberData.id)) roleMap = member.roles.cache
            .filter((roles) => roles.id !== interaction.guild.id)
            .sort((a, b) => b.position - a.position)
            .map((role) => role.toLocaleString())
            .join(", ");;
        if (!guild.members.cache.get(MemberData.id)) roleMap = "No Role Found";

        if (!roleMap) roleMap = "No Role Found";

        const userinfoEmbed = new MessageEmbed()
            .addFields(
                { name: "Name:", value: "<@" + MemberData.id + ">" },
                { name: "ID:", value: MemberData.id },
                { name: "Verifier:", value: verifLog },
                { name: "Created At:", value: moment(CheckDaysCreatedAt).format("Do MMMM YYYY hh:ss:mm A") + " / " + (checkDays(CheckDaysCreatedAt)) },
                { name: "Joined At:", value: CheckDaysJoinedAt },
                { name: "Roles:", value: roleMap },
            )
            .setThumbnail(MemberData.displayAvatarURL())
            .setColor(Color.Green)

        return interaction.reply({
            embeds: [userinfoEmbed]
        });
    }
};