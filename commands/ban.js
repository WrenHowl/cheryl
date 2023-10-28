const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const configPreset = require("../settings/config.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.ban.default.name)
        .setNameLocalizations({
            "fr": fr.ban.default.name,
            "de": de.ban.default.name,
            "es-ES": sp.ban.default.name,
            "nl": nl.ban.default.name
        })
        .setDescription(en.ban.default.description)
        .setDescriptionLocalizations({
            "fr": fr.ban.default.description,
            "de": de.ban.default.description,
            "es-ES": sp.ban.default.description,
            "nl": nl.ban.default.description
        })
        .addUserOption(option => option
            .setName(en.ban.default.user.name)
            .setNameLocalizations({
                "fr": fr.ban.default.user.name,
                "de": de.ban.default.user.name,
                "es-ES": sp.ban.default.user.name,
                "nl": nl.ban.default.user.name
            })
            .setDescription(en.ban.default.user.description)
            .setDescriptionLocalizations({
                "fr": fr.ban.default.user.description,
                "de": de.ban.default.user.description,
                "es-ES": sp.ban.default.user.description,
                "nl": nl.ban.default.user.description
            })
            .setRequired(true))
        .addStringOption(option => option
            .setName(en.ban.default.reason.name)
            .setNameLocalizations({
                "fr": fr.ban.default.reason.name,
                "de": de.ban.default.reason.name,
                "es-ES": sp.ban.default.reason.name,
                "nl": nl.ban.default.reason.name
            })
            .setDescription(en.ban.default.reason.description)
            .setDescriptionLocalizations({
                "fr": fr.ban.default.reason.description,
                "de": de.ban.default.reason.description,
                "es-ES": sp.ban.default.reason.description,
                "nl": nl.ban.default.reason.description
            })
            .setRequired(true)
        ),
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
            let canBotBan = interaction.guild.members.me.permissions.has("BanMembers");
            let canBan = interaction.guild.members.me.permissions.has("BanMembers");

            !canBotBan ? refusingAction = languageSet.ban.permission.bot : refusingAction = languageSet.default.errorOccured;
            !canBan ? refusingAction = languageSet.ban.permission.bot : refusingAction = languageSet.default.errorOccured;

            if (!canBan | !manageChannelPermission) {
                return interaction.reply({
                    content: messageRefusingAction,
                    ephemeral: true,
                });
            };

            let user = interaction.options.getUser(en.ban.default.UserName);
            let reason = interaction.options.getString(en.ban.default.ReasonName);

            let member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(error => { });
            let banList = await interaction.guild.bans.fetch();
            let bannedUser = banList.find(user => user.id === user.id);
            let guild = bot.guilds.cache.get(interaction.guild.id);

            switch (user.id) {
                case (!user):
                    return interaction.reply({
                        content: languageSet.default.unknownUser,
                        ephemeral: true,
                    });
                case (interaction.member.id):
                    return interaction.reply({
                        content: languageSet.ban.message.onWho.myself,
                        ephemeral: true,
                    });
                case (bot.user.id):
                    return interaction.reply({
                        content: languageSet.ban.message.onWho.bot,
                        ephemeral: true,
                    });
                case (interaction.guild.ownerId):
                    return interaction.reply({
                        content: languageSet.ban.message.onWho.owner,
                        ephemeral: true,
                    });
                case (!user.bannable):
                    return interaction.reply({
                        content: languageSet.ban.message.onWho.punishable,
                        ephemeral: true,
                    });
                default:
                    if (guild.members.cache.find(m => m.id === user.id)?.id & member.roles.highest.position >= interaction.member.roles.highest.position) {
                        return interaction.reply({
                            content: languageSet.ban.message.onWho.role,
                            ephemeral: true,
                        });
                    } else if (bannedUser) {
                        return interaction.reply({
                            content: languageSet.ban.message.onWho.punished,
                            ephemeral: true,
                        });
                    };

                    await interaction.reply({
                        content: "*" + user.tag + "* " + languageSet.ban.message.success,
                    });

                    let lgBan = languageSet.ban.message.embed.log;

                    if (loggingData) {
                        if (loggingData.channelId_Ban & interaction.guild.members.me.permissionsIn(loggingData.channelId_Ban).has(['SendMessages', 'ViewChannel'])) {
                            let logMessage = new EmbedBuilder()
                                .setTitle(lgBan.title)
                                .addFields(
                                    { name: lgBan.fields.user, value: "``" + user.tag + "``" },
                                    { name: lgBan.fields.reason, value: "``" + reason + "``" },
                                    { name: lgBan.fields.mod, value: "``" + interaction.user.tag + "``" },
                                )
                                .setFooter(
                                    { text: "ID: " + user.id }
                                )
                                .setTimestamp()
                                .setColor("Red");

                            let logChannel = interaction.guild.channels.cache.get(loggingData.channelId_Ban);

                            await logChannel.send({
                                embeds: [logMessage],
                            });
                        };
                    };

                    await user.send({
                        content: languageSet.ban.message.dm.you + " *" + interaction.guild.name + "* " + languageSet.ban.message.dm.for + " *" + reason + "* " + languageSet.ban.message.dm.by + " *" + interaction.user.tag + "*.",
                    }).catch(() => { return });

                    return interaction.guild.members.ban(user.id, { reason: [reason + " | " + mod] });
            };
        } catch (error) {
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.guildId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(interaction.user.id + " -> " + interaction.user.tag);
            console.log(error);

            await interaction.reply({
                content: languageSet.default.errorOccured,
                ephemeral: true,
            });

            return crashchannelId.send({ content: "**Error in the '" + en.ban.default.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
};