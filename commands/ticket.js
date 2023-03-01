const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const Message = require("../config/message.json");
const Config = require("../config/config.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.ticket;
const en = LanguageEN.ticket;
const de = LanguageDE.ticket;
const sp = LanguageSP.ticket;
const nl = LanguageNL.ticket;

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
            .setName("setup")
            .setDescription("Setup the ticket system.")
            .addNumberOption(option => option
                .setName("panelid")
                .setDescription("Set the panel ID to easily retrieve it when needed.")
                .setRequired(true))),
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

            if (interaction.member.permissions.has("MANAGE_MESSAGES")) {
                if (interaction.guild.me.permissions.has("MANAGE_CHANNELS")) {

                } else {
                    return interaction.reply({
                        content: "I need the following permission ```MANAGE_CHANNELS``.",
                        ephemeral: true,
                    });
                };
            } else {
                return interaction.reply({
                    content: "You cannot execute this command! You need the following permission ```MANAGE_MESSAGES``.",
                    ephemeral: true,
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