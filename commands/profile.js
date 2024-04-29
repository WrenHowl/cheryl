const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require("moment")

const configPreset = require("../config/main.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

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
            const Verifier = sequelize.define("Verifier", {
                userTag: {
                    type: Sequelize.STRING,
                    unique: true,
                },
                userId: {
                    type: Sequelize.STRING,
                    unique: true,
                },
                staffTag: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                staffId: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                guildId: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });
            const Profile = sequelize.define("Profile", {
                userTag: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                userId: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                age: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                verified18: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });

            const ageOptions = interaction.options.getString(en.profile.default.choice.age.name);
            const profileData = await Profile.findOne({ where: { userId: interaction.user.id } });

            if (ageOptions) {
                if (!profileData) {
                    await Profile.create({
                        userTag: interaction.user.tag,
                        userId: interaction.user.id,
                    });
                };

                const optionEmbed = new EmbedBuilder()
                    .setDescription(languageSet.profile.default.choice.message.option.embed.description);

                await Profile.update({
                    age: ageOptions
                }, { where: { userId: interaction.user.id } });
                console.log(ageOptions)
                optionEmbed.addFields(
                    { name: en.profile.default.choice.age, value: ageOptions, inline: true },
                );

                return interaction.reply({
                    embeds: [optionEmbed],
                    ephemeral: true
                });
            } else {
                const guild = bot.guilds.cache.get(interaction.guild.id);

                /*function checkDays(date) {
                    let now = new Date();
                    let diff = now.getTime() - date.getTime();
                    let days = Math.floor(diff / 86400000);
                    return days + (days == 1 ? " day" : " days") + " ago";
                };*/

                let user = interaction.options.getUser(en.profile.default.user.name);

                if (user) {
                    memberData = user;
                    createdAt = user.createdAt;
                    joinedAt = user.joinedAt;
                    userData = user.id;
                } else {
                    memberData = interaction.member;
                    createdAt = interaction.user.createdAt;
                    joinedAt = interaction.user.joinedAt;
                    userData = interaction.user.id;
                };

                let profileTargetData = await Profile.findOne({ where: { userId: userData } });
                const verifierData = await Verifier.findOne({ where: { userId: memberData.id, guildId: interaction.guild.id } });
                let member = interaction.guild.members.cache.get(memberData.id) || await interaction.guild.members.fetch(memberData.id).catch(error => { });

                const infoEmbed = new EmbedBuilder()
                    .addFields(
                        { name: languageSet.profile.default.choice.message.option.embed.name, value: memberData.toString(), inline: false },
                        { name: languageSet.profile.default.choice.message.option.embed.id, value: "`" + memberData.id + "`", inline: true },
                    )
                    .setThumbnail(memberData.displayAvatarURL())
                    .setColor("Blue");

                if (profileTargetData) {
                    profileTargetData.verified18 === 1 ? isVerified18 = "Yes" : isVerified18 = "No";
                    infoEmbed.addFields(
                        { name: languageSet.profile.default.choice.message.option.embed.age, value: "`" + profileTargetData.age + "`", inline: true },
                        { name: languageSet.profile.default.choice.message.option.embed.verified18, value: "`" + isVerified18 + "`", inline: true },
                    );
                };

                if (loggingData.channelId_Verify) {
                    infoEmbed.addFields(
                        { name: languageSet.profile.default.choice.message.option.embed.verifier, value: verifierData.staffName, inline: true },
                    );
                };

                /*infoEmbed.addFields(
                    { name: languageSet.profile.default.choice.message.option.embed.createdAt, value: "`" + moment(createdAt).format("Do MMMM YYYY hh:ss:mm A") + " / " + (checkDays(createdAt)) + "`" },
                );*/

                if (guild.members.cache.get(memberData.id)) {
                    roleMap = member.roles.cache
                        .filter((roles) => roles.id !== interaction.guild.id)
                        .sort((a, b) => b.position - a.position)
                        .map((role) => role.toLocaleString())
                        .join(", ");
                    infoEmbed.addFields(
                        //{ name: languageSet.profile.default.choice.message.option.embed.joinedAt, value: "`" + moment(joinedAt).format("Do MMMM YYYY hh:ss:mm A") + " / " + (checkDays(joinedAt)) + "`" },
                        { name: languageSet.profile.default.choice.message.option.embed.roles, value: roleMap },
                    );
                };

                return interaction.reply({
                    embeds: [infoEmbed],
                });
            };
        } catch (error) {
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(`${interaction.user.id} -> ${interaction.user.username}`);
            console.log(error);

            await interaction.reply({
                content: languageSet.default.errorOccured,
                ephemeral: true,
            });

            return crashchannelId.send({ content: "**Error in the '" + en.profile.default.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
};