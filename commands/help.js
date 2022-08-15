const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'help' command is loaded.")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show a help menu!'),
  execute: async (interaction, bot) => {

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

    if (interaction.guild.id === "821241527941726248") {
      const help = new MessageEmbed()
        .setDescription("Here's all the command available on *" + bot.user.username + "*. [Support Discord!](https://discord.gg/ocf)")
        .addFields(
          { name: "__**Administration:**__", value: arrayAdmin, inline: true },
          { name: "__**Moderation:**__", value: arrayMod, inline: true },
          { name: "__**Utilities:**__", value: arrayUtil, inline: true },
          { name: "__**Fun:**__", value: arrayFun, inline: true },
        )

      return interaction.reply({ embeds: [help] });
    }

    const help = new MessageEmbed()
      .setDescription("Here's all the command available on *" + bot.user.username + "*. [Support Discord!](https://discord.gg/ocf)")
      .addFields(
        { name: "__**Administration:**__", value: arrayAdminGlobal, inline: true },
        { name: "__**Moderation:**__", value: arrayModGlobal, inline: true },
        { name: "__**Utilities:**__", value: arrayUtilGlobal, inline: true },
        { name: "__**Fun:**__", value: arrayFun, inline: true },
      )

    return interaction.reply({ embeds: [help] });
  }
};