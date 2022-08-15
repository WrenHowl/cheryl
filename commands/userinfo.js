const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require("moment")

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'userinfo' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get info about a user.')
        .addUserOption(option => option.setName("user").setDescription("User to get").setRequired(true)),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });

        let roleMap = member.roles.cache
            .filter((roles) => roles.id !== interaction.guild.id)
            .sort((a, b) => b.position - a.position)
            .map((role) => role.toLocaleString())
            .join(", ");

        if (!roleMap) roleMap = "No role";

        let fetchGuild = interaction.client.guilds.cache.get("821241527941726248")

        const staffMember = fetchGuild.members.cache.get(member.user.id)
        let staffCheck = staffMember ? staffMember.roles.cache.has("931038287114678334") : false

        if (staffCheck) staffCheck = "Yes";
        if (!staffCheck) staffCheck = "No";

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

        let verifLog = await Verifier.findOne({ where: { VerifierID: member.user.id } });

        if (verifLog) verifLog = verifLog.ModName;
        if (!verifLog) verifLog = "No data";

        if (member.user.id === "291262778730217472") {
            const userinfoEmbed = new MessageEmbed()
                .setDescription("Owner of **Bad Dragon** & **OCF**")
                .addFields(
                    { name: "__**Name:**__", value: "<@" + member.user.id + ">" },
                    { name: "__**ID:**__", value: "``" + member.user.id + "``" },
                    { name: "__**Verifier:**__", value: "``" + verifLog + "``" },
                    { name: "__**Staff OCF:**__", value: "``" + staffCheck + "``" },
                    { name: "__**Created At**__", value: "``" + moment(member.user.createdAt).format("Do MMMM YYYY hh:ss:mm A") + "``" },
                    { name: "__**Roles:**__", value: roleMap },
                )
                .setThumbnail(member.displayAvatarURL())
                .setColor("2f3136")

            return interaction.reply({
                embeds: [userinfoEmbed]
            })
        }

        const userinfoEmbed = new MessageEmbed()
            .addFields(
                { name: "__**Name:**__", value: "<@" + member.user.id + ">" },
                { name: "__**ID:**__", value: "``" + member.user.id + "``" },
                { name: "__**Verifier:**__", value: "``" + verifLog + "``" },
                { name: "__**Staff OCF:**__", value: "``" + staffCheck + "``" },
                { name: "__**Created At**__", value: "``" + moment(member.user.createdAt).format("Do MMMM YYYY hh:ss:mm A") + "``" },
                { name: "__**Roles:**__", value: roleMap },
            )
            .setThumbnail(member.displayAvatarURL())
            .setColor("2f3136")

        return interaction.reply({
            embeds: [userinfoEmbed]
        })
    }
};