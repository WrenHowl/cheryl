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
        .setName(en.avatar.default.name)
        .setNameLocalizations({
            "fr": fr.avatar.default.name,
            "de": de.avatar.default.name,
            "es-ES": sp.avatar.default.name,
            "nl": nl.avatar.default.name
        })
        .setDescription(en.avatar.default.description)
        .setDescriptionLocalizations({
            "fr": fr.avatar.default.description,
            "de": de.avatar.default.description,
            "es-ES": sp.avatar.default.description,
            "nl": nl.avatar.default.description
        })
        .addUserOption(option => option
            .setName(en.avatar.default.user.name)
            .setNameLocalizations({
                "fr": fr.avatar.default.user.name,
                "de": de.avatar.default.user.name,
                "es-ES": sp.avatar.default.user.name,
                "nl": nl.avatar.default.user.name
            })
            .setDescription(en.avatar.default.user.description)
            .setDescriptionLocalizations({
                "fr": fr.avatar.default.user.description,
                "de": de.avatar.default.user.description,
                "es-ES": sp.avatar.default.user.description,
                "nl": nl.avatar.default.user.description
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
            let userOption = interaction.options.getUser(en.avatar.default.user.name);
            let member = userOption ? user : interaction.user;

            let avatarEmbed = new EmbedBuilder()
                .setTitle(`${en.avatar.message.embed.title} ${member.tag}`)
                .setImage(member.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor("Blue")

            return interaction.reply({
                embeds: [avatarEmbed]
            });
        } catch (error) {
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.guildId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(`${interaction.user.id} -> ${interaction.user.tag}`);
            console.log(error);

            await interaction.reply({
                content: languageSet.default.errorOccured,
                ephemeral: true,
            });

            return crashchannelId.send({ content: "**Error in the '" + en.avatar.default.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
};