const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require("moment")

const profilePreset = require("../settings/profile.json");
const configPreset = require("../settings/config.json");
const messagePreset = require("../settings/message.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.Name)
        .setNameLocalizations({
            fr: fr.Name,
            de: de.Name,
            SpanishES: sp.Name,
            nl: nl.Name
        })
        .setDescription(en.Description)
        .setDescriptionLocalizations({
            fr: fr.Description,
            de: de.Description,
            SpanishES: sp.Description,
            nl: nl.Description
        })
        .addUserOption(option => option
            .setName(en.UserName)
            .setNameLocalizations({
                fr: fr.UserName,
                de: de.UserName,
                SpanishES: sp.UserName,
                nl: nl.UserName
            })
            .setDescription(en.UserDescription)
            .setDescriptionLocalizations({
                fr: fr.UserDescription,
                de: de.UserDescription,
                SpanishES: sp.UserDescription,
                nl: nl.UserDescription
            })
            .setRequired(false))
        .addStringOption(option => option
            .setName(en.AgeName)
            .setNameLocalizations({
                fr: fr.AgeName,
                de: de.AgeName,
                SpanishES: sp.AgeName,
                nl: nl.AgeName
            })
            .setDescription(en.AgeDescription)
            .setDescriptionLocalizations({
                fr: fr.AgeDescription,
                de: de.AgeDescription,
                SpanishES: sp.AgeDescription,
                nl: nl.AgeDescription
            })
            .addChoices(
                { name: Age.mn, value: Age.mn },
                { name: Age.ad, value: Age.ad },
            )
            .setRequired(false)),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        try {
            if (!interaction.guild) {
                return interaction.reply({
                    content: "Use this command inside a server only!"
                });
            };

            const CommandFunction = sequelize.define("CommandFunction", {
                name: {
                    type: Sequelize.STRING,
                },
                value: {
                    type: Sequelize.STRING,
                },
            });

            const FindCommand = await CommandFunction.findOne({ where: { name: en.Name } });

            const MessageReason = require("../config/message.json");

            if (FindCommand) {
                if (FindCommand.value === "Disable") {
                    return interaction.reply({
                        content: MessageReason.CommandDisabled,
                        ephemeral: true,
                    });
                };
            };

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
                Verified18: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });
            const Logging = sequelize.define("Logging", {
                GuildID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDVerify: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });

            const ageOptions = interaction.options.getString(en.AgeName);

            let ProfileCheck = await Profile.findOne({ where: { UserID: interaction.user.id } });
            let LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

            if (ageOptions) {
                const ChangeOptions = new EmbedBuilder()
                    .setDescription("Profile Updated")

                if (!ProfileCheck) {
                    await Profile.create({
                        UserName: interaction.user.tag,
                        UserID: interaction.user.id,
                    });
                };

                if (ageOptions) {
                    await Profile.update({
                        Age: ageOptions
                    }, { where: { UserID: interaction.user.id } });

                    ChangeOptions.addFields(
                        { name: "**Age**", value: ageOptions, inline: true },
                    );
                };

                return interaction.reply({
                    embeds: [ChangeOptions],
                    ephemeral: true
                });
            } else {
                function checkDays(date) {
                    let now = new Date();
                    let diff = now.getTime() - date.getTime();
                    let days = Math.floor(diff / 86400000);
                    return days + (days == 1 ? " day" : " days") + " ago";
                };

                let user = interaction.options.getUser("user");

                if (user) {
                    MemberData = user;
                    CheckDaysCreatedAt = user.createdAt;
                    UserPinged = user.id;
                } else {
                    MemberData = interaction.member;
                    CheckDaysCreatedAt = interaction.user.createdAt;
                    UserPinged = interaction.user.id;
                };

                let member = interaction.guild.members.cache.get(MemberData.id) || await interaction.guild.members.fetch(MemberData.id).catch(error => { });

                let guild = bot.guilds.cache.get(interaction.guild.id);

                let verifLog = await Verifier.findOne({ where: { VerifierID: MemberData.id, GuildID: interaction.guild.id } });

                verifLog ? verifLog = "`" + verifLog.ModName + "`" : verifLog = "`No Data Found`";

                if (guild.members.cache.get(MemberData.id)) roleMap = member.roles.cache
                    .filter((roles) => roles.id !== interaction.guild.id)
                    .sort((a, b) => b.position - a.position)
                    .map((role) => role.toLocaleString())
                    .join(", ");;

                if (!guild.members.cache.get(MemberData.id)) roleMap = "`No Role Found`";
                if (!roleMap) roleMap = "`No Role Found`";

                if (guild.members.cache.get(MemberData.id)) JoinedAtData = interaction.member.joinedAt;
                if (guild.members.cache.get(MemberData.id)) CheckDaysJoinedAt = "`" + moment(JoinedAtData).format("Do MMMM YYYY hh:ss:mm A") + " / " + (checkDays(JoinedAtData)) + "`";
                if (!guild.members.cache.get(MemberData.id)) {
                    JoinedAtData = "`No Data Found`";
                    CheckDaysJoinedAt = "`No Data Found`";
                };

                let ProfileCheck2 = await Profile.findOne({ where: { UserID: UserPinged } });

                if (ProfileCheck2) {
                    ProfileCheck2.Age ? ProfileAge = "`" + ProfileCheck2.Age + "`" : ProfileAge = "`No Data Found`";
                    ProfileCheck2.Verified18 ? ProfileVerified = "`True`" : ProfileVerified = "`False`";
                } else {
                    ProfileAge = "`No Data Found`";
                    ProfileVerified = "`False`";
                };

                const userinfoEmbed = new EmbedBuilder()
                    .addFields(
                        { name: "Name", value: MemberData.toString(), inline: true },
                        { name: "ID", value: "`" + MemberData.id + "`", inline: true },
                    );

                if (LoggingData) {
                    if (LoggingData.ChannelIDVerify) {
                        userinfoEmbed.addFields(
                            { name: "Verifier", value: verifLog, inline: true },
                        );
                    };
                };

                userinfoEmbed.addFields(
                    { name: "Created At", value: "`" + moment(CheckDaysCreatedAt).format("Do MMMM YYYY hh:ss:mm A") + " / " + (checkDays(CheckDaysCreatedAt)) + "`" },
                    { name: "Joined At", value: CheckDaysJoinedAt },
                    { name: "Age", value: ProfileAge, inline: true },
                    { name: "Age Verified (18+)", value: ProfileVerified, inline: true },
                    { name: "Roles", value: roleMap },
                )
                    .setThumbnail(MemberData.displayAvatarURL())
                    .setColor(Color.Blue);

                return interaction.reply({
                    embeds: [userinfoEmbed]
                });
            };
        } catch (error) {
            let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
            console.log(error);

            return CrashChannel.send({ content: "**Error in the '" + en.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};