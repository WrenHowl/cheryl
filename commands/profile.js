const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { fr, en, de, sp, nl } = require('../preset/language')

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.profile.default.name)
        .setNameLocalizations({
            "fr": fr.profile.default.name,
            "de": de.profile.default.name,
            "es-ES": sp.profile.default.name,
            "nl": nl.profile.default.name
        })
        .setDescription(en.profile.default.description)
        .setDescriptionLocalizations({
            "fr": fr.profile.default.description,
            "de": de.profile.default.description,
            "es-ES": sp.profile.default.description,
            "nl": nl.profile.default.description
        })
        .addUserOption(option => option
            .setName(en.profile.default.user.name)
            .setNameLocalizations({
                "fr": fr.profile.default.user.name,
                "de": de.profile.default.user.name,
                "es-ES": sp.profile.default.user.name,
                "nl": nl.profile.default.user.name
            })
            .setDescription(en.profile.default.user.description)
            .setDescriptionLocalizations({
                "fr": fr.profile.default.user.description,
                "de": de.profile.default.user.description,
                "es-ES": sp.profile.default.user.description,
                "nl": nl.profile.default.user.description
            })
            .setRequired(false))
        .addStringOption(option => option
            .setName(en.profile.default.choice.age.name)
            .setNameLocalizations({
                "fr": fr.profile.default.choice.age.name,
                "de": de.profile.default.choice.age.name,
                "es-ES": sp.profile.default.choice.age.name,
                "nl": nl.profile.default.choice.age.name
            })
            .setDescription(en.profile.default.choice.age.description)
            .setDescriptionLocalizations({
                "fr": fr.profile.default.choice.age.description,
                "de": de.profile.default.choice.age.description,
                "es-ES": sp.profile.default.choice.age.description,
                "nl": nl.profile.default.choice.age.description
            })
            .addChoices(
                { name: en.profile.default.choice.age.list.minor, value: "minor" },
                { name: en.profile.default.choice.age.list.adult, value: "adult" },
            )
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
        }

        const ageOptions = interaction.options.getString(en.profile.default.choice.age.name);
        const profileData = await profile.findOne({ where: { userId: interaction.user.id } });

        const profileEmbed = new EmbedBuilder()

        if (ageOptions) {
            if (!profileData) {
                await profile.create({
                    userTag: interaction.user.tag,
                    userId: interaction.user.id,
                });
            };

            profileEmbed.setDescription(languageSet.profile.default.choice.message.option.embed.description);
            profileEmbed.addFields(
                { name: en.profile.default.choice.age, value: ageOptions, inline: true },
            );

            await profile.update({
                age: ageOptions
            }, { where: { userId: interaction.user.id } });

            return interaction.reply({
                embeds: [optionEmbed],
                ephemeral: true
            });
        };

        let user = interaction.options.getUser(en.profile.default.user.name);

        // If no user mentionned return self
        if (user) {
            memberData = user;
            userData = user.id;
        } else {
            memberData = interaction.member;
            userData = interaction.user.id;
        };

        let profileTargetData = await profile.findOne({ where: { userId: userData } });
        let verifierData = await verifier.findOne({ where: { userId: memberData.id, guildId: interaction.guild.id } });
        let member = interaction.guild.members.cache.get(memberData.id) || await interaction.guild.members.fetch(memberData.id).catch(error => { });

        profileEmbed.addFields(
            { name: languageSet.profile.default.choice.message.option.embed.name, value: memberData.toString(), inline: true },
            { name: languageSet.profile.default.choice.message.option.embed.id, value: "`" + memberData.id + "`", inline: true },
            { name: '\u200b', value: '\u200b', inline: true },
        )
        profileEmbed.setThumbnail(memberData.displayAvatarURL())
        profileEmbed.setColor("Blue");

        if (profileTargetData) {
            profileTargetData.verified18 === 1 ? isVerified18 = "Yes" : isVerified18 = "No";
            profileEmbed.addFields(
                { name: languageSet.profile.default.choice.message.option.embed.age, value: "`" + profileTargetData.age + "`", inline: true },
                { name: languageSet.profile.default.choice.message.option.embed.verified18, value: "`" + isVerified18 + "`", inline: true },
                { name: '\u200b', value: '\u200b', inline: true },
            );
        };

        if (loggingData.channelId_Verify) {
            profileEmbed.addFields(
                { name: languageSet.profile.default.choice.message.option.embed.verifier, value: verifierData.staffName, inline: true },
            );
        };

        if (interaction.guild.members.cache.get(memberData.id)) {
            roleMap = member.roles.cache
                .filter((roles) => roles.id !== interaction.guild.id)
                .sort((a, b) => b.position - a.position)
                .map((role) => role.toLocaleString())
                .join(", ");
            profileEmbed.addFields(
                { name: languageSet.profile.default.choice.message.option.embed.roles, value: roleMap },
            );
        };

        return interaction.reply({
            embeds: [profileEmbed],
        });
    }
};