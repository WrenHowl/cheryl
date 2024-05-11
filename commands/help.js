const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const configPreset = require("../config/main.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

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
      const helpButton = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel(languageSet.default.button.discord)
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
          let arrayStaffCheryl = [
            "blacklist",
            "permission",
            "cmd",
            "cop",
          ].join("``, ``");

          let arrayAdminGlobal = [
            "settings",
            "welcomemenu",
            "language",
          ].join("``, ``");

          let arrayModGlobal = [
            "ban",
            "kick",
            "lock",
            "unlock",
            "verify",
          ].join("``, ``");

          let arrayUtilGlobal = [
            "help",
            "ping",
            "profile",
            "serverinfo",
            "staff",
            "report",
          ].join("``, ``");

          let arrayFunGlobal = [
            "avatar",
            "action",
          ].join("``, ``");

          helpEmbed.setDescription("*My prefix in this server is ``c.``*");
          helpEmbed.addFields(
            { name: "Staff Cheryl", value: "``" + arrayStaffCheryl + "``" },
            { name: "Administration", value: "``" + arrayAdminGlobal + "``" },
            { name: "Moderation", value: "``" + arrayModGlobal + "``" },
            { name: "Utilities", value: "``" + arrayUtilGlobal + "``" },
            { name: "Fun", value: "``" + arrayFunGlobal + "``" },
          );

          break;
      };

      return interaction.reply({
        embeds: [helpEmbed],
        components: [helpButton],
      });

    } catch (error) {
      let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
      let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
      console.log(`${interaction.user.id} -> ${interaction.user.username}`);
      console.log(error);

      await interaction.reply({
        content: languageSet.default.errorOccured,
        ephemeral: true,
      });

      return crashchannelId.send({ content: "**Error in the '" + en.help.default.name + "' event:** \n\n```javascript\n" + error + "```" });
    };
  }
};