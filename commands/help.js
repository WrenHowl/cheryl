const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { fr, en, de, sp, nl } = require('../preset/language')

const configPreset = require("../config/main.json");

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
        { name: "verification", value: "verification-help" },
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
          "* The blacklist contains users who have broken rules in any server, they're all stocked and classed in different types of blacklists:\n" +
          " * :black_circle: High - `Suicidal Threats, Sexual Harassment, Gore, etc.`\n" +
          " * :red_circle: Medium - `Anti-Furry, Anti-LGBTQ, Raiding, etc.`\n" +
          " * :yellow_circle: Low - `Racism, Homophobic, etc.`\n\n" +
          "* When a blacklisted user join your server, you will get notified if you have have everything setup. We will not automatically ban, unless you enabled it with `/settings blacklist autoban`\n" +
          "### 2. Is there evidence?\n" +
          "* Yes! We provide evidence for every blacklist\n" +
          "### 3. How do I enable the blacklist in my server?\n" +
          "* You simply need to do ``/settings blacklist`` and set the blacklist alert to ``Enabled`` and set a channel you wanna receive your alert in"
        );

        break;
      case ("verification-help"):
        helpEmbed.setDescription(
          "### 1. How to enable the verify command?\n" +
          "* Do ``/settings verification`` and choose either ``menu`` or ``command``. You can set up both, it will work!n\n" +
          "* You selected ``menu``? You need to send the menu in a channel afterwards! Do ``/welcomemenu`` and choose the desired channel"
        );

        break;
      default:
        let staffCommand = [
          "blacklist",
          "data",
          "cmd",
        ].join("``, ``");

        let adminCommand = [
          "settings",
          "language",
        ].join("``, ``");

        let modCommand = [
          "ban",
          "kick",
          "lock",
          "unlock",
        ].join("``, ``");

        let utilCommand = [
          "help",
          "profile",
          "staff",
        ].join("``, ``");

        let funCommand = [
          "avatar",
          "action",
        ].join("``, ``");

        helpEmbed.setDescription("*My prefix in this server is `%`*");
        helpEmbed.addFields(
          { name: "Staff Cheryl", value: "``" + staffCommand + "``" },
          { name: "Administration", value: "``" + adminCommand + "``" },
          { name: "Moderation", value: "``" + modCommand + "``" },
          { name: "Utilities", value: "``" + utilCommand + "``" },
          { name: "Fun", value: "``" + funCommand + "``" },
        );

        break;
    };

    return interaction.reply({
      embeds: [helpEmbed],
      components: [helpButton],
    });
  }
};