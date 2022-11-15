const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.verify;
const en = LanguageEN.verify;
const de = LanguageDE.verify;
const sp = LanguageSP.verify;
const nl = LanguageNL.verify;

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The '" + en.Name + "' command is loaded.");

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
        .addUserOption((option) => option
            .setName("user")
            .setDescription("Member to verify.")
            .setRequired(true))
        .addStringOption(option => option
            .setName("name")
            .setDescription("Change the member username.")
            .setRequired(false)),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const Logging = sequelize.define("Logging", {
            GuildID: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDEnterServer: {
                type: Sequelize.STRING,
                unique: false,
            },
            StaffRoleVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            RoleToAddVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            RoleToRemoveVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
        });
        const Verification_Count = sequelize.define("Verification_Count", {
            ModName: {
                type: Sequelize.STRING,
                unique: false,
            },
            ModID: {
                type: Sequelize.STRING,
                unique: false,
            },
            Usage_Count: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false,
            },
            GuildID: {
                type: Sequelize.STRING,
                unique: false,
            },
        });
        const Verifier = sequelize.define("Verifier", {
            VerifierName: {
                type: Sequelize.STRING,
                unique: false,
            },
            VerifierID: {
                type: Sequelize.STRING,
                unique: false,
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
        const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

        if (!LoggingData) {
            return interaction.reply({
                content: "There's some setting that aren't setup on that server for that command. Please use ``/settings`` to start setting it up.",
                ephemeral: true,
            });
        } else if (!LoggingData.ChannelIDVerify | !LoggingData.RoleToAddVerify | !LoggingData.RoleToRemoveVerify | !LoggingData.StaffRoleVerify) {
            return interaction.reply({
                content: "There's some setting that aren't setup on that server for that command. Please use ``/settings`` to start setting it up.",
                ephemeral: true,
            });
        };

        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });
        const name = interaction.options.getString("name");

        if (interaction.member.roles.cache.some(role => role.id === LoggingData.StaffRoleVerify) | interaction.member.permissions.has("MODERATE_MEMBERS")) {
            switch (member.id) {
                case (!member):
                    return interaction.reply({
                        content: "I can't find this user!",
                        ephemeral: true
                    });
                case (interaction.member.id):
                    return interaction.reply({
                        content: "You can't verify yourself!",
                        ephemeral: true
                    });
                case (bot.user.id):
                    return interaction.reply({
                        content: "You can't verify me!",
                        ephemeral: true
                    });
                default:
                    const VerifierData = await Verifier.findOne({ where: { VerifierID: member.user.id } });

                    if (VerifierData) {
                        if (VerifierData.GuildID === interaction.guild.id) {
                            return interaction.reply({
                                content: "User is already verified.",
                                ephemeral: true,
                            });
                        }
                    };

                    await Verifier.create({
                        VerifierName: member.user.tag,
                        VerifierID: member.user.id,
                        ModName: interaction.user.tag,
                        ModID: interaction.user.id,
                        GuildID: interaction.guild.id,
                    });

                    const Verification_CountData = await Verification_Count.findOne({ where: { ModID: interaction.user.id, GuildID: interaction.guild.id } });

                    let VerificationCount = ""

                    if (Verification_CountData) {
                        if (Verification_CountData.GuildID === interaction.guild.id) {
                            await Verification_CountData.increment('Usage_Count');

                            VerificationCount = Verification_CountData.Usage_Count;
                        };
                    } else {
                        await Verification_Count.create({
                            ModID: interaction.user.id,
                            ModName: interaction.user.tag,
                            GuildID: interaction.guild.id,
                        });

                        VerificationCount = "1";
                    };

                    const SetRoleSuccess = new MessageEmbed()
                        .setDescription(user.toLocaleString() + " is now verified!\n\n> You verified ``" + VerificationCount + "`` members.")
                        .setColor(Color.Green)

                    await interaction.reply({ embeds: [SetRoleSuccess], ephemeral: true });

                    await member.setNickname(name);

                    await member.roles.add(LoggingData.RoleToAddVerify);
                    await member.roles.remove(LoggingData.RoleToRemoveVerify);

                    const GeneralMessage = interaction.guild.channels.cache.get(LoggingData.ChannelIDVerify)

                    return GeneralMessage.send({ content: "Welcome " + user.toLocaleString() + " to **" + interaction.guild.name + "**!" });
            }
        } else {
            await interaction.reply({
                content: "You cannot execute this command! You need the following permission ``MODERATE_MEMBERS`` or the role <@&" + LoggingData.StaffRoleVerify + ">",
                ephemeral: true
            });
        };
    }
};