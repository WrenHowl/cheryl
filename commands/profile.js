const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require("moment")
const Color = require("../config/color.json");
const Profile = require("../config/profile.json")
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.profile;
const en = LanguageEN.profile;
const de = LanguageDE.profile;
const sp = LanguageSP.profile;
const nl = LanguageNL.profile;

const Age = Profile.age;
const Pronouns = Profile.pronouns;
const Gender = Profile.gender;

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The '" + en.Name + "' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.Name)
        .setNameLocalizations({
            "fr": fr.Name,
        })
        .setDescription(en.Description)
        .setDescriptionLocalizations({
            "fr": fr.Description,
        })
        .addUserOption(option => option
            .setName(en.UserName)
            .setNameLocalizations({
                "fr": fr.UserName,
            })
            .setDescription(en.UserDescription)
            .setDescriptionLocalizations({
                "fr": fr.UserDescription,
            })
            .setRequired(false))
        .addStringOption(option => option
            .setName(en.PronounsName)
            .setNameLocalizations({
                "fr": fr.PronounsName,
            })
            .setDescription(en.PronounsDescription)
            .setDescriptionLocalizations({
                "fr": fr.PronounsDescription,
            })
            .addChoices(
                { name: Pronouns.th, value: Pronouns.th },
                { name: Pronouns.he, value: Pronouns.he },
                { name: Pronouns.sh, value: Pronouns.sh }
            )
            .setRequired(false))
        .addStringOption(option => option
            .setName(en.GenderName)
            .setNameLocalizations({
                "fr": fr.GenderName,
            })
            .setDescription(en.GenderDescription)
            .setDescriptionLocalizations({
                "fr": fr.GenderDescription,
            })
            .addChoices(
                { name: Gender.ml, value: Gender.ml },
                { name: Gender.fl, value: Gender.fl },
                { name: Gender.gf, value: Gender.gf },
                { name: Gender.tm, value: Gender.tm },
                { name: Gender.tf, value: Gender.tf },
                { name: Gender.ag, value: Gender.ag },
                { name: Gender.nb, value: Gender.nb }
            )
            .setRequired(false))
        .addStringOption(option => option
            .setName(en.AgeName)
            .setNameLocalizations({
                "fr": fr.AgeName,
            })
            .setDescription(en.AgeDescription)
            .setDescriptionLocalizations({
                "fr": fr.AgeDescription,
            })
            .addChoices(
                { name: Age.mn, value: Age.mn },
                { name: Age.ad, value: Age.ad },
            )
            .setRequired(false)),
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
        const Profile = sequelize.define("Profile", {
            UserName: {
                type: Sequelize.STRING,
                unique: false,
            },
            UserID: {
                type: Sequelize.STRING,
                unique: false,
            },
            Age: {
                type: Sequelize.STRING,
                unique: false,
            },
            Pronouns: {
                type: Sequelize.STRING,
                unique: false,
            },
            Gender: {
                type: Sequelize.STRING,
                unique: false,
            },
        })

        const pronounsOptions = interaction.options.getString(fr.PronounsName);
        const genderOptions = interaction.options.getString(fr.GenderName);
        const ageOptions = interaction.options.getString(fr.AgeName);

        let ProfileCheck = await Profile.findOne({ where: { UserID: interaction.user.id } })

        if (pronounsOptions || genderOptions || ageOptions) {
            if (!pronounsOptions & !ageOptions) {
                if (!ProfileCheck) {
                    const createData = await Profile.create({
                        UserName: interaction.user.tag,
                        UserID: interaction.user.id,
                        Gender: pronounsOptions,
                    });
                } else {
                    const updateData = await Profile.update({ Gender: genderOptions }, { where: { UserID: interaction.user.id } })
                }

                const pronounsEmbed = new MessageEmbed()
                    .setDescription("Profile Updated")
                    .addFields(
                        { name: "**Gender**", value: genderOptions, inline: true },
                    );

                return interaction.reply({
                    embeds: [pronounsEmbed],
                    ephemeral: true
                });
            }

            if (!genderOptions & !ageOptions) {
                if (!ProfileCheck) {
                    const createData = await Profile.create({
                        UserName: interaction.user.tag,
                        UserID: interaction.user.id,
                        Pronouns: pronounsOptions,
                    });
                } else {
                    const updateData = await Profile.update({ Pronouns: pronounsOptions }, { where: { UserID: interaction.user.id } })
                }

                const pronounsEmbed = new MessageEmbed()
                    .setDescription("Profile Updated")
                    .addFields(
                        { name: "**Pronoun**", value: pronounsOptions, inline: true },
                    );

                return interaction.reply({
                    embeds: [pronounsEmbed],
                    ephemeral: true
                });
            }

            if (!genderOptions || !pronounsOptions) {
                if (!ProfileCheck) {
                    const createData = await Profile.create({
                        UserName: interaction.user.tag,
                        UserID: interaction.user.id,
                        Age: ageOptions,
                    });
                } else {
                    const updateData = await Profile.update({ Age: ageOptions }, { where: { UserID: interaction.user.id } })
                }

                const pronounsEmbed = new MessageEmbed()
                    .setDescription("Profile Updated")
                    .addFields(
                        { name: "**Age**", value: ageOptions, inline: true },
                    );

                return interaction.reply({
                    embeds: [pronounsEmbed],
                    ephemeral: true
                });
            }

            if (!ProfileCheck) {
                const createData = await Profile.create({
                    UserName: interaction.user.tag,
                    UserID: interaction.user.id,
                    Age: ageOptions,
                    Pronouns: pronounsOptions,
                    Gender: genderOptions,
                });
            } else {
                const updateData = await Profile.update({ Age: ageOptions, Pronouns: pronounsOptions, Gender: genderOptions }, { where: { UserID: interaction.user.id } })
            }

            const pronounsEmbed = new MessageEmbed()
                .setDescription("Profile Updated")
                .addFields(
                    { name: "**Age**", value: ageOptions, inline: true },
                    { name: "**Pronoun**", value: pronounsOptions, inline: true },
                    { name: "**Gender**", value: genderOptions, inline: true },
                );

            return interaction.reply({
                embeds: [pronounsEmbed],
                ephemeral: true
            });
        }

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        }

        let user = interaction.options.getUser("user");
        let MemberData = "";
        let UserPinged = "";

        if (user) {
            MemberData = user;
            CheckDaysCreatedAt = user.createdAt;
            UserPinged = user.id;
        }

        if (!user) {
            MemberData = interaction.member;
            CheckDaysCreatedAt = interaction.user.createdAt;
            UserPinged = interaction.user.id;
        }

        let member = interaction.guild.members.cache.get(MemberData.id) || await interaction.guild.members.fetch(MemberData.id).catch(err => { });

        let guild = bot.guilds.cache.get(interaction.guild.id);

        let verifLog = await Verifier.findOne({ where: { VerifierID: MemberData.id, GuildID: interaction.guild.id } });

        if (verifLog) verifLog = "`" + verifLog.ModName + "`";
        if (!verifLog) verifLog = "`No Data Found`";

        let roleMap = "";

        if (guild.members.cache.get(MemberData.id)) roleMap = member.roles.cache
            .filter((roles) => roles.id !== interaction.guild.id)
            .sort((a, b) => b.position - a.position)
            .map((role) => role.toLocaleString())
            .join(", ");;

        if (!guild.members.cache.get(MemberData.id)) roleMap = "`No Role Found`";
        if (!roleMap) roleMap = "`No Role Found`";

        let JoinedAtData = "";
        let CheckDaysJoinedAt = "";

        if (guild.members.cache.get(MemberData.id)) JoinedAtData = interaction.member.joinedAt;
        if (guild.members.cache.get(MemberData.id)) CheckDaysJoinedAt = "`" + moment(JoinedAtData).format("Do MMMM YYYY hh:ss:mm A") + " / " + (checkDays(JoinedAtData)) + "`";
        if (!guild.members.cache.get(MemberData.id)) {
            JoinedAtData = "`No Data Found`";
            CheckDaysJoinedAt = "`No Data Found`";
        }

        let ProfileCheck2 = await Profile.findOne({ where: { UserID: UserPinged } })

        if (ProfileCheck2) ProfilePronouns = "`" + ProfileCheck2.Pronouns + "`";
        if (!ProfileCheck2 || !ProfileCheck2.Pronouns) ProfilePronouns = "`No Data Found`";

        if (ProfileCheck2) ProfileGender = "`" + ProfileCheck2.Gender + "`";
        if (!ProfileCheck2 || !ProfileCheck2.Gender) ProfileGender = "`No Data Found`";

        if (ProfileCheck2) ProfileAge = "`" + ProfileCheck2.Age + "`";
        if (!ProfileCheck2 || !ProfileCheck2.Age) ProfileAge = "`No Data Found`";

        const userinfoEmbed = new MessageEmbed()
            .addFields(
                { name: "Name", value: MemberData.toString(), inline: true },
                { name: "ID", value: "`" + MemberData.id + "`", inline: true },
                { name: "Verifier", value: verifLog, inline: true },
                { name: "Created At", value: "`" + moment(CheckDaysCreatedAt).format("Do MMMM YYYY hh:ss:mm A") + " / " + (checkDays(CheckDaysCreatedAt)) + "`" },
                { name: "Joined At", value: CheckDaysJoinedAt },
                { name: "Age", value: ProfileAge, inline: true },
                { name: "Pronouns", value: ProfilePronouns, inline: true },
                { name: "Gender", value: ProfileGender, inline: true },
                { name: "Roles", value: roleMap },
            )
            .setThumbnail(MemberData.displayAvatarURL())
            .setColor(Color.Green)

        return interaction.reply({
            embeds: [userinfoEmbed]
        });
    }
};