const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Color = require("../config/color.json");
const Message = require("../config/message.json");
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
                .setRequired(false)))
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
        try {
            let CommandFunction = sequelize.define("CommandFunction", {
                name: {
                    type: Sequelize.STRING,
                },
                value: {
                    type: Sequelize.STRING,
                },
            });

            let FindCommand = await CommandFunction.findOne({ where: { name: en.Name } });

            if (FindCommand) {
                if (FindCommand.value === "Disable") {
                    return interaction.reply({
                        content: Message.CommandDisabled,
                        ephemeral: true,
                    });
                };
            };

            let Blacklist = sequelize.define("Blacklist", {
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
            let Permission = sequelize.define("Permission", {
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
                GuildID: {
                    type: Sequelize.STRING,
                    unique: false,
                }
            });

            let options = interaction.options.getSubcommand();
            let user = interaction.options.getUser(en.AddUserName);
            let reason = interaction.options.getString(en.AddReasonName);
            let risk = interaction.options.getString(en.AddRiskName);

            user ? UserCheck = user.id : UserCheck = interaction.user.id;

            let PermissionCheck = await Permission.findOne({ where: { UserID: interaction.user.id } });
            let GuildCheck = await Permission.findOne({ where: { GuildID: interaction.guild.id } });
            let CheckBlacklist = await Blacklist.findOne({ where: { UserID: UserCheck } });

            PermissionCheck ? StaffCheck = PermissionCheck.BlacklistPermission === "1" : PermissionCheck = false;
            PermissionCheck ? TargetCheck = PermissionCheck.UserID : StaffCheck = false;

            let MessageReason = Message.Blacklist;

            if (risk === "Low") ColorEmbed = Color.RiskLow;
            if (risk === "Medium") ColorEmbed = Color.RiskMedium;
            if (risk === "High") ColorEmbed = Color.RiskHigh;

            const Logging = sequelize.define("Logging", {
                GuildID: {
                    type: Sequelize.STRING,
                },
                ChannelIDBan: {
                    type: Sequelize.STRING,
                },
                Language: {
                    type: Sequelize.STRING,
                },
            });
            const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

            let LanguageData = LoggingData.language;

            if (!LanguageData || LanguageData === "en") Language = LanguageEN;
            if (LanguageData === "fr") Language = LanguageFR;
            if (LanguageData === "de") Language = LanguageDE;
            if (LanguageData === "sp") Language = LanguageSP;
            if (LanguageData === "nl") Language = LanguageNL;

            if (options === "check") {
                if (CheckBlacklist) {
                    let Name = "``" + CheckBlacklist.UserName + "``";
                    let ID = "``" + CheckBlacklist.UserID + "``";
                    let Reason = "``" + CheckBlacklist.Reason + "``";
                    let ModeratorName = "``" + CheckBlacklist.ModName + "``";
                    let ModeratorID = "``" + CheckBlacklist.ModID + "``";

                    CheckBlacklist.Proof ? Evidence = CheckBlacklist.Proof : Evidence = "``No Evidence Found``";

                    let BlacklistEmbed = new MessageEmbed()
                        .addFields(
                            { name: "User", value: Name, inline: true },
                            { name: "ID", value: ID, inline: true },
                            { name: "Reason", value: Reason, inline: true },
                            { name: "Moderator Name", value: ModeratorName, inline: true },
                            { name: "Moderator ID", value: ModeratorID, inline: true },
                            { name: "Evidence", value: Evidence, inline: true }
                        )
                        .setColor(ColorEmbed);

                    return interaction.reply({
                        embeds: [BlacklistEmbed],
                    });
                } else {
                    return interaction.reply({
                        content: MessageReason.NotBlacklisted,
                        ephemeral: true,
                    });
                };
            };

            if (StaffCheck) {
                switch (UserCheck) {
                    case (!user || !interaction.user):
                        return interaction.reply({
                            content: Language.default.UnknownUser,
                            ephemeral: true,
                        });
                    case (interaction.user.id):
                        return interaction.reply({
                            content: Language.default.user.Myself,
                            ephemeral: true,
                        });
                    case (bot.user.id):
                        return interaction.reply({
                            content: Language.default.user.Me,
                            ephemeral: true,
                        });
                    case (TargetCheck):
                        return interaction.reply({
                            content: Language.default.user.Staff,
                            ephemeral: true,
                        });
                    default:
                        let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);

                        switch (options) {
                            case ("add"):
                                if (CheckBlacklist) {
                                    return interaction.reply({
                                        content: MessageReason.AlreadyBlacklisted,
                                        ephemeral: true,
                                    });
                                } else {
                                    let proof = interaction.options.getString(en.AddEvidenceName);
                                    let blacklistChannel = fetchGuild.channels.cache.get(Config.BlacklistChannel);

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
                                        content: MessageReason.AddedToBlacklist,
                                        ephemeral: true,
                                    }).then(() => {
                                        let Name = "``" + user.tag + "``";
                                        let ID = "``" + user.id + "``";
                                        let Reason = "``" + reason + "``";
                                        let ModeratorName = "``" + interaction.user.tag + "``";
                                        let ModeratorID = "``" + interaction.user.id + "``";

                                        proof ? Evidence = proof : Evidence = "``No Evidence Found``";

                                        let InfoBlacklist = new MessageEmbed()
                                            .addFields(
                                                { name: "User", value: Name, inline: true },
                                                { name: "ID", value: ID, inline: true },
                                                { name: "Reason", value: Reason, inline: true },
                                                { name: "Moderator Name", value: ModeratorName, inline: true },
                                                { name: "Moderator ID", value: ModeratorID, inline: true },
                                                { name: "Evidence", value: Evidence, inline: true }
                                            )
                                            .setColor(ColorEmbed);

                                        return blacklistChannel.send({
                                            embeds: [InfoBlacklist]
                                        });
                                    });
                                };
                            case ("remove"):
                                if (!CheckBlacklist) {
                                    return interaction.reply({
                                        content: MessageReason.NotBlacklisted,
                                        ephemeral: true,
                                    });
                                } else {
                                    return interaction.reply({
                                        content: MessageReason.RemovedToBlacklist,
                                        ephemeral: true,
                                    }).then(async () => {
                                        let blacklistChannel = fetchGuild.channels.cache.get(Config.BlacklistChannel);

                                        let Name = "``" + user.tag + "``";
                                        let ID = "``" + user.id + "``";
                                        let Reason = "``" + reason + "``";
                                        let ModeratorName = "``" + interaction.user.tag + "``";
                                        let ModeratorID = "``" + interaction.user.id + "``";

                                        proof ? Evidence = proof : Evidence = "``No Evidence Found``";

                                        let InfoBlacklist = new MessageEmbed()
                                            .addFields(
                                                { name: "User", value: Name, inline: true },
                                                { name: "ID", value: ID, inline: true },
                                                { name: "Reason", value: Reason, inline: true },
                                                { name: "Moderator Name", value: ModeratorName, inline: true },
                                                { name: "Moderator ID", value: ModeratorID, inline: true },
                                                { name: "Evidence", value: Evidence, inline: true }
                                            )
                                            .setColor(ColorEmbed);

                                        await blacklistChannel.send({
                                            embeds: [InfoBlacklist],
                                        });

                                        return Blacklist.destroy({ where: { UserID: UserCheck } });
                                    })
                                };
                            case ("suggest"):
                                if (GuildCheck) {
                                    let proof = interaction.options.getAttachment(en.AddEvidenceName);
                                    let suggestChannel = fetchGuild.channels.cache.get(Config.SuggestBlacklist);

                                    if (CheckBlacklist) {
                                        return interaction.reply({
                                            content: MessageReason.AlreadyBlacklisted,
                                            ephemeral: true,
                                        });
                                    } else {
                                        return interaction.reply({
                                            content: MessageReason.SuggestedToBlacklist,
                                            ephemeral: true,
                                        }).then(() => {
                                            const Name = "``" + user.tag + "``";
                                            const ID = "``" + user.id + "``";
                                            const Reason = "``" + reason + "``";
                                            const ModeratorName = "``" + interaction.user.tag + "``";
                                            const ModeratorID = "``" + interaction.user.id + "``";
                                            const ServerName = "``" + interaction.guild.name + "``";
                                            const ServerID = "``" + interaction.guild.id + "``";

                                            proof ? Evidence = proof : Evidence = Config.x;

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
                                                .setImage(proof.url)
                                                .setColor(Color.Green);

                                            return suggestChannel.send({
                                                embeds: [InfoBlacklist],
                                            });
                                        });
                                    };
                                } else {
                                    return interaction.reply({
                                        content: LanguageEN.blacklist.permission.Server,
                                        ephemeral: true,
                                    });
                                };
                        };
                };
            };
        } catch (error) {
            let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
            console.log("//------------------------------------------------------------------------------//");
            console.log(error);
            console.log("//------------------------------------------------------------------------------//");

            return CrashChannel.send({ content: "**Error in the '" + en.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};