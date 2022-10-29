const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.serverinfo;
const en = LanguageEN.serverinfo;
const de = LanguageDE.serverinfo;
const sp = LanguageSP.serverinfo;
const nl = LanguageNL.serverinfo;

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The '" + en.Name + "' command is loaded.");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Get some information on the server.'),
  execute: async (interaction, bot) => {
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }

    let roleCount = interaction.guild.roles.cache.size

    const guild = bot.guilds.cache.get(interaction.guild.id);
    var memberCount = guild.memberCount

    const serverinfo = new MessageEmbed()
      .addFields(
        { name: "Name:", value: interaction.guild.name },
        { name: "ID:", value: interaction.guild.id },
        { name: "Owner:", value: "<@" + interaction.guild.ownerId + "> *(" + interaction.guild.ownerId + ")*" },
        { name: "Created the:", value: interaction.channel.guild.createdAt.toUTCString().substr(0, 16) + " / " + (checkDays(interaction.channel.guild.createdAt)) },
        { name: "Members", value: memberCount + " ** **" },
        { name: "Roles:", value: roleCount + " ** **" },
      )
      .setThumbnail(interaction.guild.iconURL())
      .setColor(Color.Green)

    return interaction.reply({
      embeds: [serverinfo]
    });
  }
};
