const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { fr, en, de, sp, nl } = require('../preset/language')

const configPreset = require("../config/main.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.staff.default.name)
        .setNameLocalizations({
            "fr": en.staff.default.name,
            "de": de.staff.default.name,
            "es-ES": sp.staff.default.name,
            "nl": nl.staff.default.name
        })
        .setDescription(en.staff.default.description)
        .setDescriptionLocalizations({
            "fr": fr.staff.default.description,
            "de": de.staff.default.description,
            "es-ES": sp.staff.default.description,
            "nl": nl.staff.default.description
        })
        .addUserOption(option => option
            .setName(en.staff.default.user.name)
            .setNameLocalizations({
                "fr": fr.staff.default.user.name,
                "de": de.staff.default.user.name,
                "es-ES": sp.staff.default.user.name,
                "nl": nl.staff.default.user.name
            })
            .setDescription(en.staff.default.user.description)
            .setDescriptionLocalizations({
                "fr": fr.staff.default.user.description,
                "de": de.staff.default.user.description,
                "es-ES": sp.staff.default.user.description,
                "nl": nl.staff.default.user.description
            })
            .setRequired(false)),
    execute: async (interaction) => {
        let loggingData = await logging.findOne({ where: { guildId: interaction.guild.id } });

        switch (loggingData.language) {
            case ("en"):
                languageSet = en;
                break;
            case ("fr"):
                languageSet = fr;
                break;
            case ("de"):
                languageSet = de;
                break;
            case ("sp"):
                languageSet = sp;
                break;
            case ("nl"):
                languageSet = nl;
                break;
            default:
                languageSet = en;
                break;
        };

        let user = interaction.options.getUser(en.staff.default.user.name);
        let userCheck = user ? user : interaction.user;
        let fetchGuild = interaction.client.guilds.cache.get(configPreset.botInfo.supportServerId);
        await fetchGuild.members.fetch();

        let staffGet = fetchGuild.members.cache.get(userCheck.id);
        let staffRole = staffGet ? staffGet.roles.cache.some(
            role => role.id === configPreset.staffRoleId.leadDeveloper)
            | staffGet.roles.cache.some(
                role => role.id === configPreset.staffRoleId.developer)
            | staffGet.roles.cache.some(
                role => role.id === configPreset.staffRoleId.staff) :
            false;

        const staffEmbed = new EmbedBuilder()

        if (staffRole) {
            staffEmbed.setThumbnail(configPreset.other.isStaff);
            isStaff = "is";
            staffEmbed.setColor("Green");

            if (staffGet.roles.cache.some(role => role.id === configPreset.staffRoleId.leadDeveloper)) {
                staffRank = "LEAD DEVELOPER";
            } else if (staffGet.roles.cache.some(role => role.id === configPreset.staffRoleId.developer)) {
                staffRank = "DEVELOPER";
            } else {
                staffRank = "STAFF";
            };
        } else {
            staffEmbed.setThumbnail(configPreset.other.isNotStaff);
            isStaff = "isn't";
            staffEmbed.setColor("Red");
            staffRank = "STAFF";
        };

        staffEmbed.setDescription(`${userCheck.toString()} ${isStaff} a **${staffRank}** of **${bot.user.username}**`);

        return interaction.reply({
            embeds: [staffEmbed],
        });
    }
};