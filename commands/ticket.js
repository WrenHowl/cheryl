const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
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
            .setName("setup")
            .setDescription("Setup the ticket system.")
            .addNumberOption(option => option
                .setName("panelid")
                .setDescription("Set the panel ID to easily retrieve it when needed.")
                .setRequired(true))),
    execute: async (interaction, bot, sequelize, Sequelize) => {
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
    }
};