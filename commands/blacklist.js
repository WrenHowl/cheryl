const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Color = require("../config/color.json");
const message = require("../config/message.json");
const Config = require("../config/config.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.blacklist;
const en = LanguageEN.blacklist;
const de = LanguageDE.blacklist;
const sp = LanguageSP.blacklist;
const nl = LanguageNL.blacklist;

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
        .addSubcommand(subcommand => subcommand
            .setName(en.AddName)
            .setNameLocalizations({
                fr: fr.AddName,
                de: de.AddName,
                SpanishES: sp.AddName,
                nl: nl.AddName
            })
            .setDescription(en.AddDescription)
            .setDescriptionLocalizations({
                fr: fr.AddDescription,
                de: de.AddDescription,
                SpanishES: sp.AddDescription,
                nl: nl.AddDescription
            })
            .addUserOption(option => option
                .setName(en.AddUserName)
                .setNameLocalizations({
                    fr: fr.AddUserName,
                    de: de.AddUserName,
                    SpanishES: sp.AddUserName,
                    nl: nl.AddUserName
                })
                .setDescription(en.AddUserDescription)
                .setDescriptionLocalizations({
                    fr: fr.AddUserDescription,
                    de: de.AddUserDescription,
                    SpanishES: sp.AddUserDescription,
                    nl: nl.AddUserDescription
                })
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.AddReasonName)
                .setNameLocalizations({
                    fr: fr.AddReasonName,
                    de: de.AddReasonName,
                    SpanishES: sp.AddReasonName,
                    nl: nl.AddReasonName
                })
                .setDescription(en.AddReasonDescription)
                .setDescriptionLocalizations({
                    fr: fr.AddReasonDescription,
                    de: de.AddReasonDescription,
                    SpanishES: sp.AddReasonDescription,
                    nl: nl.AddReasonDescription
                })
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.AddRiskName)
                .setNameLocalizations({
                    fr: fr.AddRiskName,
                    de: de.AddRiskName,
                    SpanishES: sp.AddRiskName,
                    nl: nl.AddRiskName
                })
                .setDescription(en.AddRiskDescription)
                .setDescriptionLocalizations({
                    fr: fr.AddRiskDescription,
                    de: de.AddRiskDescription,
                    SpanishES: sp.AddRiskDescription,
                    nl: nl.AddRiskDescription
                })
                .setRequired(true)
                .addChoices(
                    { name: 'low', value: 'Low' },
                    { name: 'medium', value: 'Medium' },
                    { name: 'high', value: 'High' },
                ))
            .addStringOption(option => option
                .setName(en.AddEvidenceName)
                .setNameLocalizations({
                    fr: fr.AddEvidenceName,
                    de: de.AddEvidenceName,
                    SpanishES: sp.AddEvidenceName,
                    nl: nl.AddEvidenceName
                })
                .setDescription(en.AddEvidenceDescription)
                .setDescriptionLocalizations({
                    fr: fr.AddEvidenceDescription,
                    de: de.AddEvidenceDescription,
                    SpanishES: sp.AddEvidenceDescription,
                    nl: nl.AddEvidenceDescription
                })
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(en.RemoveName)
            .setNameLocalizations({
                fr: fr.RemoveName,
                de: de.RemoveName,
                SpanishES: sp.RemoveName,
                nl: nl.RemoveName
            })
            .setDescription(en.RemoveDescription)
            .setDescriptionLocalizations({
                fr: fr.RemoveDescription,
                de: de.RemoveDescription,
                SpanishES: sp.RemoveDescription,
                nl: nl.RemoveDescription
            })
            .addUserOption(option => option
                .setName(en.RemoveUserName)
                .setNameLocalizations({
                    fr: fr.RemoveUserName,
                    de: de.RemoveUserName,
                    SpanishES: sp.RemoveUserName,
                    nl: nl.RemoveUserName
                })
                .setDescription(en.RemoveUserDescription)
                .setDescriptionLocalizations({
                    fr: fr.RemoveUserDescription,
                    de: de.RemoveUserDescription,
                    SpanishES: sp.RemoveUserDescription,
                    nl: nl.RemoveUserDescription
                })
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(en.CheckName)
            .setNameLocalizations({
                fr: fr.CheckName,
                de: de.CheckName,
                SpanishES: sp.CheckName,
                nl: nl.CheckName
            })
            .setDescription(en.CheckDescription)
            .setDescriptionLocalizations({
                fr: fr.CheckDescription,
                de: de.CheckDescription,
                SpanishES: sp.CheckDescription,
                nl: nl.CheckDescription
            })
            .addUserOption(option => option
                .setName(en.CheckUserName)
                .setNameLocalizations({
                    fr: fr.CheckUserName,
                    de: de.CheckUserName,
                    SpanishES: sp.CheckUserName,
                    nl: nl.CheckUserName
                })
                .setDescription(en.CheckUserDescription)
                .setDescriptionLocalizations({
                    fr: fr.CheckUserDescription,
                    de: de.CheckUserDescription,
                    SpanishES: sp.CheckUserDescription,
                    nl: nl.CheckUserDescription
                })
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(en.SuggestName)
            .setNameLocalizations({
                fr: fr.SuggestName,
                de: de.SuggestName,
                SpanishES: sp.SuggestName,
                nl: nl.SuggestName
            })
            .setDescription(en.SuggestDescription)
            .setDescriptionLocalizations({
                fr: fr.SuggestDescription,
                de: de.SuggestDescription,
                SpanishES: sp.SuggestDescription,
                nl: nl.SuggestDescription
            })
            .addUserOption(option => option
                .setName(en.SuggestUserName)
                .setNameLocalizations({
                    fr: fr.SuggestUserName,
                    de: de.SuggestUserName,
                    SpanishES: sp.SuggestUserName,
                    nl: nl.SuggestUserName
                })
                .setDescription(en.SuggestUserDescription)
                .setDescriptionLocalizations({
                    fr: fr.SuggestUserDescription,
                    de: de.SuggestUserDescription,
                    SpanishES: sp.SuggestUserDescription,
                    nl: nl.SuggestUserDescription
                })
                .setRequired(true))
            .addStringOption(option => option
                .setName(en.SuggestReasonName)
                .setNameLocalizations({
                    fr: fr.SuggestReasonName,
                    de: de.SuggestReasonName,
                    SpanishES: sp.SuggestReasonName,
                    nl: nl.SuggestReasonName
                })
                .setDescription(en.SuggestReasonDescription)
                .setDescriptionLocalizations({
                    fr: fr.SuggestReasonDescription,
                    de: de.SuggestReasonDescription,
                    SpanishES: sp.SuggestReasonDescription,
                    nl: nl.SuggestReasonDescription
                })
                .setRequired(true))
            .addAttachmentOption(option => option
                .setName(en.SuggestEvidenceName)
                .setNameLocalizations({
                    fr: fr.SuggestEvidenceName,
                    de: de.SuggestEvidenceName,
                    SpanishES: sp.SuggestEvidenceName,
                    nl: nl.SuggestEvidenceName
                })
                .setDescription(en.SuggestEvidenceDescription)
                .setDescriptionLocalizations({
                    fr: fr.SuggestEvidenceDescription,
                    de: de.SuggestEvidenceDescription,
                    SpanishES: sp.SuggestEvidenceDescription,
                    nl: nl.SuggestEvidenceDescription
                })
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
                    let fetchGuild = interaction.client.guilds.cache.get(Config.guildId)
                    const blacklistChannel = fetchGuild.channels.cache.get(Config.BlacklistChannel)

                    if (risk === "Low") ColorEmbed = Color.RiskLow;
                    if (risk === "Medium") ColorEmbed = Color.RiskMedium;
                    if (risk === "High") ColorEmbed = Color.RiskHigh;

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
                                    await Blacklist.create({
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
                                        const Name = "``" + user.tag + "``";
                                        const ID = "``" + user.id + "``";
                                        const Reason = "``" + reason + "``";
                                        const ModeratorName = "``" + interaction.user.tag + "``";
                                        const ModeratorID = "``" + interaction.user.id + "``";

                                        proof ? Evidence = proof : Evidence = "``No Evidence Found``"

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
                                    return interaction.reply({
                                        content: "The user has been successfully removed of the blacklist.",
                                        ephemeral: true,
                                    }).then(async () => {

                                        const blacklistChannel = fetchGuild.channels.cache.get(Config.BlacklistChannel)

                                        const Name = "``" + user.tag + "``";
                                        const ID = "``" + user.id + "``";
                                        const Reason = "``" + reason + "``";
                                        const ModeratorName = "``" + interaction.user.tag + "``";
                                        const ModeratorID = "``" + interaction.user.id + "``";

                                        proof ? Evidence = proof : Evidence = "``No Evidence Found``"

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

                                        await blacklistChannel.send({
                                            embeds: [InfoBlacklist]
                                        })

                                        return Blacklist.destroy({ where: { UserID: user.id } });
                                    })
                            };
                    }
                }

                if (PermissionCheck3) {
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