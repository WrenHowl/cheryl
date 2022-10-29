const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const Config = require("../config/config.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.help;
const en = LanguageEN.help;
const de = LanguageDE.help;
const sp = LanguageSP.help;
const nl = LanguageNL.help;

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
    .addStringOption(option => option
      .setName(en.InfoName)
      .setNameLocalizations({
        fr: fr.InfoName,
        de: de.InfoName,
        SpanishES: sp.InfoName,
        nl: nl.InfoName
      })
      .setDescription(en.InfoDescription)
      .setDescriptionLocalizations({
        fr: fr.InfoDescription,
        de: de.InfoDescription,
        SpanishES: sp.InfoDescription,
        nl: nl.InfoDescription
      })
      .addChoices(
        { name: "blacklist", value: "blacklistInfo" },
        { name: "verification", value: "verificationInfo" },
      )),
  execute: async (interaction, bot) => {
    const infoOptions = interaction.options.getString(en.InfoName);

    if (!infoOptions) {
      let arrayStaffCheryl = [
        "blacklist",
        "permission",
      ].join("``, ``");

      let arrayAdminGlobal = [
        "settings",
        "welcomemenu",
      ].join("``, ``");

      let arrayModGlobal = [
        "ban",
        "kick",
        "warn",
        "warns",
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
        "action"
      ].join("``, ``");

      if (arrayStaffCheryl) arrayStaffCheryl = "``" + arrayStaffCheryl + "``";
      if (arrayAdminGlobal) arrayAdminGlobal = "``" + arrayAdminGlobal + "``";
      if (arrayModGlobal) arrayModGlobal = "``" + arrayModGlobal + "``";
      if (arrayUtilGlobal) arrayUtilGlobal = "``" + arrayUtilGlobal + "``";
      if (arrayFunGlobal) arrayFunGlobal = "``" + arrayFunGlobal + "``";

      const helpMenu = new MessageEmbed()
        .setDescription("Here's all the command available on `" + bot.user.username + "`. [Support Discord](" + Config.SupportDiscord + ")")
        .addFields(
          { name: "Staff Cheryl:", value: arrayStaffCheryl },
          { name: "Administration:", value: arrayAdminGlobal },
          { name: "Moderation:", value: arrayModGlobal },
          { name: "Utilities:", value: arrayUtilGlobal },
          { name: "Fun:", value: arrayFunGlobal },
        )
        .setColor(Color.Green)

      return interaction.reply({
        embeds: [helpMenu]
      });

    } else {
      switch (infoOptions) {
        case ("blacklistInfo"):
          const blacklistInfoEmbed = new MessageEmbed()
            .setDescription(
              "**1 - WHAT DOES THE BLACKLIST DO?**\n" +
              "The blacklist contains users who have broken rules in any server, they're all stocked and classed in different types of blacklists:\n\n" +
              "> :yellow_circle: Low - `Racism, Homophobic, etc.`\n" +
              "> :orange_circle: Medium - `Anti-Furry, Anti-LGBTQ, Raiding, etc.`\n" +
              "> :red_circle: High - `Suicidal Threats, Sexual Harassment, Gore, etc.`\n\n" +
              "When a blacklisted user join your server, you will get notified if you have have everything setup. We will not automatically ban, unless you enabled it with `/settings blacklist autoban`.\n\n" +
              "**2 - IS THERE EVIDENCE?**\n" +
              "Yes! We provide evidence for every blacklist.\n\n" +
              "**3 - HOW DO I ENABLE THE BLACKLIST ALERT IN MY SERVER?**\n" +
              "You simply need to do ``/settings blacklist`` and set the blacklist alert to ``Enabled`` and set a channel you wanna receive your alert in." +
              "\n\n*Need help? Join the [Support Discord](" + Config.SupportDiscord + ")!*"
            )
            .setColor(Color.Green)

          return interaction.reply({
            embeds: [blacklistInfoEmbed],
          });
        case ("verificationInfo"):
          const verificationInfoEmbed = new MessageEmbed()
            .setDescription(
              "**1 - HOW TO ENABLE THE VERIFY COMMAND?**\n" +
              "Do ``/settings verification`` and choose either ``menu`` or ``command``. You can set up both, it will work!\n\n" +
              "You selected ``menu``? You need to send the menu in a channel afterwards! Do ``/welcomemenu`` and choose the desired channel!" +
              "\n\n*Need help? Join the [Support Discord](" + Config.SupportDiscord + ")!*"
            )
            .setColor(Color.Green)

          return interaction.reply({
            embeds: [verificationInfoEmbed],
          });
      }
    }
  }
};