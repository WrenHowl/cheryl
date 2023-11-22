const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const configPreset = require("../config/main.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

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
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const Logging = sequelize.define("Logging", {
            guildId: {
                type: Sequelize.STRING,
            },
            language: {
                type: Sequelize.STRING,
            },
        });

        let loggingData = await Logging.findOne({ where: { guildId: interaction.guild.id } });

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
        }

        try {
            let user = interaction.options.getUser(en.staff.default.user.name);
            let userCheck = user ? user : interaction.user;

            let fetchGuild = interaction.client.guilds.cache.get(configPreset.botInfo.guildId);
            await fetchGuild.members.fetch();
            let staffGet = fetchGuild.members.cache.get(userCheck.id);

            const staffEmbed = new EmbedBuilder()

            let staffRole = staffGet ? staffGet.roles.cache.has(configPreset.staffRoleId.developer) | staffGet.roles.cache.has(configPreset.staffRoleId.staff) : false;

            if (staffGet & staffRole) {
                staffEmbed.setThumbnail(configPreset.other.isStaff);
                isStaff = "is";
                staffEmbed.setColor("Green");
                staffGet.roles.cache.has(configPreset.staffRoleId.developer) ? staffRank = "DEVELOPER" : staffRank = "STAFF";
            } else if (!staffGet | staffRole) {
                staffEmbed.setThumbnail(configPreset.other.isNotStaff);
                isStaff = "isn't";
                staffEmbed.setColor("Red");
                staffRank = "STAFF";
            }

            staffEmbed.setDescription(`${userCheck.toString()} ${isStaff} a **${staffRank}** of **${bot.user.username}**`);

            return interaction.reply({
                embeds: [staffEmbed],
            });
        } catch (error) {
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.guildId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(`${interaction.user.id} -> ${interaction.user.tag}`);
            console.log(error)

            await interaction.reply({
                content: languageSet.default.errorOccured,
                ephemeral: true,
            });

            return crashchannelId.send({ content: "**Error in the '" + en.blacklist.default.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
};