const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.lock;
const en = LanguageEN.lock;
const de = LanguageDE.lock;
const sp = LanguageSP.lock;
const nl = LanguageNL.lock;

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
        }),
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

            if (interaction.member.permissions.has("MANAGE_MESSAGES")) {
                if (interaction.guild.me.permissions.has("MANAGE_CHANNELS")) {

                    await interaction.channel.permissionOverwrites.edit(interaction.channel.guild.roles.everyone, { SEND_MESSAGES: false }, "Lockdown initiated by: " + interaction.user.tag);
                    await interaction.channel.permissionOverwrites.edit(bot.user.id, { SEND_MESSAGES: true });

                    return interaction.reply({
                        content: Language.lock.default.Done,
                    });
                } else {
                    return interaction.reply({
                        content: Language.lock.permission.Me,
                        ephemeral: true,
                    });
                };
            } else {
                return interaction.reply({
                    content: Language.lock.permission.Myself,
                    ephemeral: true
                });
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