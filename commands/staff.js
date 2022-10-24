const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Config = require("../config/config.json");
const Color = require("../config/color.json");

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'staff' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('staff')
        .setDescription('Show the staff of Cheryl.')
        .addUserOption(option => option
            .setName("user")
            .setDescription("Check if a user is a staff of Cheryl.")
            .setRequired(false)),
    execute: async (interaction, bot) => {
        const user = interaction.options.getUser("user");

        let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
        await fetchGuild.members.fetch();

        let DevId = "1030630693413343324";
        let StaffId = "1030518144088932413";

        let MemberData = "";

        if (user) MemberData = user;
        if (!user) MemberData = interaction.user;

        const StaffMember = fetchGuild.members.cache.get(MemberData.id)
        let StaffCheck = StaffMember ? StaffMember.roles.cache.has(StaffId) | StaffMember.roles.cache.has(DevId) : false

        if (StaffCheck) StaffCheck = "Yes";
        if (!StaffCheck) StaffCheck = "No";

        if (StaffCheck === "Yes") {
            const staffList = new MessageEmbed()
                .setDescription("<@" + MemberData.id + "> is a staff member of `" + bot.user.username + "`")
                .setThumbnail(Config.CheckMark)
                .setColor(Color.Green)

            return interaction.reply({
                embeds: [staffList]
            });
        } else {
            const staffList = new MessageEmbed()
                .setDescription("<@" + MemberData.id + "> isn't a staff member of `" + bot.user.username + "`")
                .setThumbnail(Config.x)
                .setColor(Color.RiskHigh)

            return interaction.reply({
                embeds: [staffList]
            });
        }
    }
};