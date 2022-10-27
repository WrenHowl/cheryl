const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Color = require("../config/color.json");
const message = require("../config/message.json");
const Config = require("../config/config.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");

const fr = LanguageFR.blacklist;
const en = LanguageEN.blacklist;

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The '" + en.Name + "' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.Name)
        .setDescription(en.Description)
        .addSubcommand(subcommand => subcommand
            .setName(en.AddName)
            .setDescription(en.AddDescription)
            .addUserOption(option => option
                .setName(en.AddUserName)
                .setDescription(en.AddUserDescription)
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.AddReasonName)
                .setDescription(en.AddReasonDescription)
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.AddRiskName)
                .setDescription(en.AddRiskDescription)
                .setRequired(true)
                .addChoices(
                    { name: 'low', value: 'Low' },
                    { name: 'medium', value: 'Medium' },
                    { name: 'high', value: 'High' },
                ))
            .addStringOption(option => option
                .setName(en.AddEvidenceName)
                .setDescription(en.AddEvidenceDescription)
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(en.RemoveName)
            .setDescription(en.RemoveDescription)
            .addUserOption(option => option
                .setName(en.RemoveUserName)
                .setDescription(en.RemoveUserDescription)
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(en.CheckName)
            .setDescription(en.CheckDescription)
            .addUserOption(option => option
                .setName(en.CheckUserName)
                .setDescription(en.CheckUserDescription)
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(en.SuggestName)
            .setDescription(en.SuggestDescription)
            .addUserOption(option => option
                .setName(en.SuggestUserName)
                .setDescription(en.SuggestUserDescription)
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.SuggestReasonName)
                .setDescription(en.SuggestReasonDescription)
                .setRequired(true))
            .addAttachmentOption(option => option
                .setName(en.SuggestEvidenceName)
                .setDescription(en.SuggestEvidenceDescription)
                .setRequired(true))),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const Blacklist = sequelize.define("Blacklist", {
            UserName: {
                type: Sequelize.STRING,
                unique: true,
            },
            UserID: {
                type: Sequelize.STRING,
                unique: true,
            },
            ModName: {
                type: Sequelize.STRING,
                unique: false,
            },
            ModID: {
                type: Sequelize.STRING,
                unique: false,
            },
            Reason: {
                type: Sequelize.STRING,
                unique: false,
            },
            Proof: {
                type: Sequelize.STRING,
                unique: false,
            },
            Risk: {
                type: Sequelize.STRING,
                unique: false,
            },
        });
        const Permission = sequelize.define("Permission", {
            UserName: {
                type: Sequelize.STRING,
                unique: false,
            },
            UserID: {
                type: Sequelize.STRING,
                unique: false,
            },
            BlacklistPermission: {
                type: Sequelize.STRING,
                unique: false,
            },
        });

        const options = interaction.options.getSubcommand();
        const user = interaction.options.getUser(en.AddUserName);
        const reason = interaction.options.getString(en.AddReasonName);
        const risk = interaction.options.getString(en.AddRiskName);

        let PermissionCheck = await Permission.findOne({ where: { UserID: interaction.user.id } });
        let PermissionCheck2 = await Permission.findOne({ where: { UserID: user.id } });
        let PermissionCheck3 = await Permission.findOne({ where: { guildId: interaction.guild.id } });

        if (user) CheckBlacklist = await Blacklist.findOne({ where: { UserID: user.id } });

        if (PermissionCheck) PermissionCheck = PermissionCheck.BlacklistPermission === "1";
        if (!PermissionCheck) PermissionCheck = "";

        if (PermissionCheck2 === null) PermissionDouble = "";
        if (PermissionCheck2) PermissionDouble = PermissionCheck2.UserID;

        switch (options) {
            case ("check"):
                if (user) {
                    if (CheckBlacklist) {
                        if (CheckBlacklist.Risk === "Low") ColorEmbed = Color.RiskLow;
                        if (CheckBlacklist.Risk === "Medium") ColorEmbed = Color.RiskMedium;
                        if (CheckBlacklist.Risk === "High") ColorEmbed = Color.RiskHigh;

                        const Name = "``" + CheckBlacklist.UserName + "``";
                        const ID = "``" + CheckBlacklist.UserID + "``";
                        const Reason = "``" + CheckBlacklist.Reason + "``";
                        const ModeratorName = "``" + CheckBlacklist.ModName + "``";
                        const ModeratorID = "``" + CheckBlacklist.ModID + "``";

                        if (CheckBlacklist.Proof) Evidence = CheckBlacklist.Proof;
                        if (!CheckBlacklist.Proof) Evidence = "``None``";

                        const InfoBlacklist = new MessageEmbed()
                            .addFields(
                                { name: "User", value: Name, inline: true },
                                { name: "ID", value: ID, inline: true },
                                { name: "Reason", value: Reason, inline: true },
                                { name: "Moderator Name", value: ModeratorName, inline: true },
                                { name: "Moderator ID", value: ModeratorID, inline: true },
                                { name: "Evidence", value: Evidence, inline: true }
                            )
                            .setColor(ColorEmbed)

                        return interaction.reply({
                            embeds: [InfoBlacklist],
                        });
                    } else {
                        return interaction.reply({
                            content: "This user isn't blacklisted.",
                        });
                    }
                };
            default:
                if (PermissionCheck & options === "add" | options === "remove") {
                    const proof = interaction.options.getString(en.AddEvidenceName);

                    switch (options) {
                        case ("add"):
                            if (CheckBlacklist) {
                                return interaction.reply({
                                    content: "This user is blacklisted already.",
                                    ephemeral: true,
                                });
                            }

                            switch (user.id) {
                                case (!user):
                                    return interaction.reply({
                                        content: "I can't find this user!",
                                        ephemeral: true
                                    });
                                case (interaction.user.id):
                                    return interaction.reply({
                                        content: "You can't blacklist yourself!",
                                        ephemeral: true
                                    });
                                case (bot.user.id):
                                    return interaction.reply({
                                        content: "You can't blacklist me!",
                                        ephemeral: true
                                    });
                                case (PermissionDouble):
                                    return interaction.reply({
                                        content: "You can't blacklist a staff!",
                                        ephemeral: true
                                    });
                                default:
                                    const BlacklistData = await Blacklist.create({
                                        UserName: user.tag,
                                        UserID: user.id,
                                        ModName: interaction.user.tag,
                                        ModID: interaction.user.id,
                                        Reason: reason,
                                        Proof: proof,
                                        Risk: risk,
                                    });

                                    return interaction.reply({
                                        content: message.AddedToBlacklist,
                                        ephemeral: true,
                                    }).then(() => {
                                        let fetchGuild = interaction.client.guilds.cache.get(Config.guildId)

                                        const blacklistChannel = fetchGuild.channels.cache.get(Config.BlacklistChannel)

                                        if (risk === "Low") ColorEmbed = Color.RiskLow;
                                        if (risk === "Medium") ColorEmbed = Color.RiskMedium;
                                        if (risk === "High") ColorEmbed = Color.RiskHigh;

                                        const Name = "``" + user.tag + "``";
                                        const ID = "``" + user.id + "``";
                                        const Reason = "``" + reason + "``";
                                        const ModeratorName = "``" + interaction.user.tag + "``";
                                        const ModeratorID = "``" + interaction.user.id + "``";

                                        if (proof) Evidence = proof;
                                        if (!proof) Evidence = "``None``";

                                        const InfoBlacklist = new MessageEmbed()
                                            .addFields(
                                                { name: "User", value: Name, inline: true },
                                                { name: "ID", value: ID, inline: true },
                                                { name: "Reason", value: Reason, inline: true },
                                                { name: "Moderator Name", value: ModeratorName, inline: true },
                                                { name: "Moderator ID", value: ModeratorID, inline: true },
                                                { name: "Evidence", value: Evidence, inline: true }
                                            )
                                            .setColor(ColorEmbed)

                                        return blacklistChannel.send({
                                            embeds: [InfoBlacklist]
                                        })
                                    })
                            };
                        case ("remove"):
                            if (!CheckBlacklist) {
                                return interaction.reply({
                                    content: "This user isn't blacklisted.",
                                    ephemeral: true,
                                });
                            }

                            switch (user.id) {
                                case (!user):
                                    return interaction.reply({
                                        content: "I can't find this user!",
                                        ephemeral: true
                                    });
                                case (interaction.user.id):
                                    return interaction.reply({
                                        content: "You can't unblacklist yourself!",
                                        ephemeral: true
                                    });
                                case (bot.user.id):
                                    return interaction.reply({
                                        content: "You can't unblacklist me!",
                                        ephemeral: true
                                    });
                                default:
                                    const unblacklistUser = Blacklist.destroy({ where: { UserID: user.id } });

                                    return interaction.reply({
                                        content: "The user has been successfully removed of the blacklist.",
                                        ephemeral: true,
                                    });
                            };
                    }
                } else if (PermissionCheck3) {
                    const proof2 = interaction.options.getAttachment(en.AddEvidenceName);

                    switch (options) {
                        case ("suggest"):
                            if (CheckBlacklist) {
                                return interaction.reply({
                                    content: "This user is blacklisted already.",
                                    ephemeral: true,
                                });
                            }

                            switch (user.id) {
                                case (!user):
                                    return interaction.reply({
                                        content: "I can't find this user!",
                                        ephemeral: true
                                    });
                                case (interaction.user.id):
                                    return interaction.reply({
                                        content: "You can't suggest to blacklist yourself!",
                                        ephemeral: true
                                    });
                                case (bot.user.id):
                                    return interaction.reply({
                                        content: "You can't suggest to blacklist me!",
                                        ephemeral: true
                                    });
                                case (PermissionDouble):
                                    return interaction.reply({
                                        content: "You can't suggest to blacklist a staff!",
                                        ephemeral: true
                                    });
                                default:
                                    return interaction.reply({
                                        content: message.SuggestedToBlacklist,
                                        ephemeral: true,
                                    }).then(() => {
                                        let fetchGuild = interaction.client.guilds.cache.get(Config.guildId)

                                        const blacklistChannel = fetchGuild.channels.cache.get(Config.ReceiveSuggestedBlacklist)

                                        if (risk === "Low") ColorEmbed = Color.RiskLow;
                                        if (risk === "Medium") ColorEmbed = Color.RiskMedium;
                                        if (risk === "High") ColorEmbed = Color.RiskHigh;

                                        const Name = "``" + user.tag + "``";
                                        const ID = "``" + user.id + "``";
                                        const Reason = "``" + reason + "``";
                                        const ModeratorName = "``" + interaction.user.tag + "``";
                                        const ModeratorID = "``" + interaction.user.id + "``";
                                        const ServerName = "``" + interaction.guild.name + "``";
                                        const ServerID = "``" + interaction.guild.id + "``";

                                        if (proof2) Evidence = proof2;
                                        if (!proof2) Evidence = Config.x;

                                        const InfoBlacklist = new MessageEmbed()
                                            .addFields(
                                                { name: "User", value: Name, inline: true },
                                                { name: "ID", value: ID, inline: true },
                                                { name: "Reason", value: Reason, inline: true },
                                                { name: "Moderator Name", value: ModeratorName, inline: true },
                                                { name: "Moderator ID", value: ModeratorID, inline: true },
                                                { name: "Server Name", value: ServerName, inline: true },
                                                { name: "Server ID", value: ServerID, inline: true },
                                            )
                                            .setImage(proof2.url)
                                            .setColor(Color.Green)

                                        return blacklistChannel.send({
                                            embeds: [InfoBlacklist]
                                        })
                                    })
                            };
                    }
                } else {
                    return interaction.reply({
                        content: "You cannot execute this command! Only the ``Whitelisted User/Server`` are allowed to use it.",
                        ephemeral: true
                    })
                };
        }
    }
};