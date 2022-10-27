const { MessageEmbed, Message } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");

const fr = LanguageFR.avatar;
const en = LanguageEN.avatar;

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The '" + en.Name + "' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.Name)
        .setNameLocalizations({
            "fr": fr.Name
        })
        .setDescription(en.Description)
        .setDescriptionLocalizations({
            "fr": fr.Description
        })
        .addUserOption(option => option
            .setName(en.UserName)
            .setNameLocalizations({
                "fr": fr.UserName
            })
            .setDescription(en.UserDescription)
            .setDescriptionLocalizations({
                "fr": fr.UserDescription
            })
            .setRequired(false)),
    execute: async (interaction, bot) => {
        const user = interaction.options.getUser(en.UserName);

        let MemberData = "";

        if (user) MemberData = user;
        if (!user) MemberData = interaction.user;

        const AvatarShown = new MessageEmbed()
            .setTitle("Avatar of " + MemberData.tag)
            .setImage(MemberData.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(Color.Green)

        return interaction.reply({
            embeds: [AvatarShown]
        });
    }
};