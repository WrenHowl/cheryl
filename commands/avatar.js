const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { fr, en, de, sp, nl } = require('../preset/language')
const { logging } = require('../preset/db')

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

        let userOption = interaction.options.getUser(en.avatar.default.user.name);
        let member = userOption ? userOption : interaction.user;

        let avatarEmbed = new EmbedBuilder()
            .setTitle(`${languageSet.avatar.message.embed.title} ${member.username}`)
            .setImage(member.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor('Blue')

        return interaction.reply({
            embeds: [avatarEmbed]
        });
    }
};