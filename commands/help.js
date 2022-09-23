const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'help' command is loaded.")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show a help menu!')
    .addStringOption(option => option
      .setName("info")
      .setDescription("Display the information about certain things/commands.")
      .addChoices(
        { name: "blacklist", value: "blacklistInfo" },
        { name: "verification", value: "verificationInfo" },
      )),
  execute: async (interaction, bot) => {
    const infoOptions = interaction.options.getString("info");

    if (!infoOptions) {
      let arrayAdmin = [
        "promote",
        "blacklist",
      ].join("``, ``");

      let arrayAdminGlobal = [
        "N/A",
      ].join("``, ``");

      let arrayMod = [
        "ban",
        "kick",
        "warn",
        "lockdown",
        "unlockdown",
        "verify",
        "whitelist",
      ].join("``, ``");

      let arrayModGlobal = [
        "ban",
        "kick",
        "warn",
        "lockdown",
        "unlockdown",
        "verify",
      ].join("``, ``");

      let arrayUtil = [
        "ping",
        "userinfo",
        "serverinfo",
        "staff",
      ].join("``, ``");

      let arrayUtilGlobal = [
        "ping",
        "userinfo",
        "serverinfo",
        "staff",
      ].join("``, ``");

      let arrayFun = [
        "boop",
        "pat",
      ].join("``, ``");

      if (arrayAdmin) arrayAdmin = "``" + arrayAdmin + "``";
      if (arrayMod) arrayMod = "``" + arrayMod + "``";
      if (arrayUtil) arrayUtil = "``" + arrayUtil + "``";
      if (arrayFun) arrayFun = "``" + arrayFun + "``";

      if (arrayAdminGlobal) arrayAdminGlobal = "``" + arrayAdminGlobal + "``";
      if (arrayModGlobal) arrayModGlobal = "``" + arrayModGlobal + "``";
      if (arrayUtilGlobal) arrayUtilGlobal = "``" + arrayUtilGlobal + "``";

      switch (interaction.guild.id) {
        case ("821241527941726248"):
          const helpMenu1 = new MessageEmbed()
            .setDescription("Here's all the command available on *" + bot.user.username + "*. [Support Discord!](https://discord.gg/ocf)")
            .addFields(
              { name: "__**Administration:**__", value: arrayAdmin, inline: true },
              { name: "__**Moderation:**__", value: arrayMod, inline: true },
              { name: "__**Utilities:**__", value: arrayUtil, inline: true },
              { name: "__**Fun:**__", value: arrayFun, inline: true },
            )

          return interaction.reply({ embeds: [helpMenu1] });
        default:
          const helpMenu2 = new MessageEmbed()
            .setDescription("Here's all the command available on *" + bot.user.username + "*. [Support Discord!](https://discord.gg/ocf)")
            .addFields(
              { name: "__**Administration:**__", value: arrayAdminGlobal, inline: true },
              { name: "__**Moderation:**__", value: arrayModGlobal, inline: true },
              { name: "__**Utilities:**__", value: arrayUtilGlobal, inline: true },
              { name: "__**Fun:**__", value: arrayFun, inline: true },
            )

          return interaction.reply({ embeds: [helpMenu2] });
      }
    } else {
      switch (infoOptions) {
        case ("blacklistInfo"):
          const blacklistInfoEmbed = new MessageEmbed()
            .setDescription(
              "**What does the blacklist do?**\n" +
              "The blacklist contains users who have broken rules in any server, they're all stocked and classed in different types of blacklists:\n" +
              "> :yellow_circle: Low ／ `Racism, Homophobic, etc.`\n" +
              "> :orange_circle: Medium ／ `Anti-Furry, Raiding, etc.`\n" +
              "> :red_circle: High ／ `Suicidal Threats, Sexual Harassment, etc.`\n\n" +
              "When a blacklisted user join your server, you'll get notified if you enabled it and set a channel. We will not kick or ban automatically.\n\n" +
              "**Is there proof of it?**\n" +
              "Yes! We only provide proof for High blacklisted users.\n\n" +
              "**How can I enable the blacklist alert in my server?**\n" +
              "You simply need to do ``/settings logging blacklist`` and set the blacklist alert to ``Enabled`` and set a channel." +
              "\n\nNeed help? Join the [Support Discord!](https://discord.gg/ocf)!"
            )

          return interaction.reply({
            embeds: [blacklistInfoEmbed],
          });
        case ("verificationInfo"):
          const verificationInfoEmbed = new MessageEmbed()
            .setDescription(
              "**How to enable the verify command?**\n" +
              "Do ``/settings verification`` and choose either ``menu`` or ``command``. You can set up both, it will work!\n" +
              "> You selected ``menu``? You need to send the menu in a channel afterwards! Do ``/welcomemenu`` and choose the desired channel!" +
              "\n\nNeed help? Join the [Support Discord!](https://discord.gg/ocf)!"
            )

          return interaction.reply({
            embeds: [verificationInfoEmbed],
          });
      }
    }
  }
};