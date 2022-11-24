const { MessageEmbed, Message } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.avatar;
const en = LanguageEN.avatar;
const de = LanguageDE.avatar;
const sp = LanguageSP.avatar;
const nl = LanguageNL.avatar;

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
            .setRequired(false)),
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

        const user = interaction.options.getUser(en.UserName);

        let MemberData = user ? user : interaction.user;

        const AvatarShown = new MessageEmbed()
            .setTitle("Avatar of " + MemberData.tag)
            .setImage(MemberData.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(Color.Green)

        return interaction.reply({
            embeds: [AvatarShown]
        });
    }
};