const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { fr, en, de, sp, nl } = require('../preset/language')
const configPreset = require("../config/main.json");

// Display a list of command that the bot as.

module.exports = {
  data: new SlashCommandBuilder()
    .setName(en.help.default.name)
    .setNameLocalizations({
      "fr": fr.help.default.name,
      "de": de.help.default.name,
      "es-ES": sp.help.default.name,
      "nl": nl.help.default.name
    })
    .setDescription(en.help.default.description)
    .setDescriptionLocalizations({
      "fr": fr.help.default.description,
      "de": de.help.default.description,
      "es-ES": sp.help.default.description,
      "nl": nl.help.default.description
    })
    .addStringOption(option => option
      .setName(en.help.default.info.name)
      .setNameLocalizations({
        "fr": fr.help.default.info.name,
        "de": de.help.default.info.name,
        "es-ES": sp.help.default.info.name,
        "nl": nl.help.default.info.name
      })
      .setDescription(en.help.default.info.description)
      .setDescriptionLocalizations({
        "fr": fr.help.default.info.description,
        "de": de.help.default.info.description,
        "es-ES": sp.help.default.info.description,
        "nl": nl.help.default.info.description
      })
      .addChoices(
        { name: "blacklist", value: "blacklist-help" },
      )),
  execute: async (interaction) => {
    const helpButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(en.default.button.discord)
          .setURL(configPreset.other.discordLink)
          .setStyle(ButtonStyle.Link),
      );

    const infoOptions = interaction.options.getString(en.help.default.info.name);

    const helpEmbed = new EmbedBuilder()
      .setColor("Green")

    switch (infoOptions) {
      case ("blacklist-help"):
        helpEmbed.setDescription(
          "### 1. How does the blacklist work?\n" +
          "* Users who have violated rules on any server are included on the blacklist; they are categorized and stocked in several blacklist kinds:\n" +
          " * :black_circle: High - `Suicidal Threats, Sexual Harassment, Gore, etc.`\n" +
          " * :red_circle: Medium - `Anti-Furry, Anti-LGBTQ, Raiding, etc.`\n" +
          " * :yellow_circle: Low - `Racism, Homophobic, etc.`\n\n" +
          "* If everything is set up correctly, you will be notified when a person on your blacklist joins your server.\n" +
          "### 2. Do we provide evidence?\n" +
          "* Yes! We provide evidence for every blacklist.\n" +
          "### 3. How do I enable the blacklist on my server?\n" +
          "* There isn't anything customizable right now. For it, a website is being developed."
        );

        break;
      default:
        helpEmbed.setDescription(
          "The list of command is available on https://cheryl-bot.ca/commands.\n\n" +
          "There will also be a dashboard there in the future where users may adjust and personalize the bot."
        )
        break;
    };

    return interaction.reply({
      embeds: [helpEmbed],
      components: [helpButton],
    });
  }
};