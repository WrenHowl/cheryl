const { MessageEmbed } = require('discord.js');
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
        }),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        try {
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

                    await interaction.channel.permissionOverwrites.edit(interaction.channel.guild.roles.everyone, { SEND_MESSAGES: false });

                    const lockdownSuccess = new MessageEmbed()
                        .setDescription("The channel has been successfully lock.")
                        .setColor(Color.Green)

                    return interaction.reply({ embeds: [lockdownSuccess] });
                } else {
                    return interaction.reply({
                        content: "I need the following permission ```MANAGE_CHANNELS``.",
                        ephemeral: true
                    });
                };
            } else {
                return interaction.reply({
                    content: "You cannot execute this command! You need the following permission ```MANAGE_MESSAGES``.",
                    ephemeral: true
                });
            };
        } catch (error) {
            let fetchGuild = message.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);

            CrashChannel.send({ content: "**Error in the " + en.Name + " Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};