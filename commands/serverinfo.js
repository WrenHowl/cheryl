const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'serverinfo' command is loaded.")

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

    let rolemap = [...interaction.guild.roles.cache.values()]

      .filter(role => role.id !== interaction.guild.id && role != role.bot)

      .slice(0, 15)

      .sort((a, b) => b.position - a.position)

      .map(r => r)

      .join("\n");

    if (interaction.guild.roles.cache.size > 44) rolemap += "...";

    if (!rolemap) rolemap = "No role";

    const serverinfo = new MessageEmbed()
      .addField("__**Name**__", "``" + interaction.guild.name + "``")
      .addField("__**ID**__", "``" + interaction.guild.id + "``")
      .addField("__**Owner**__", "<@" + interaction.guild.ownerId + "> ``(" + interaction.guild.ownerId + ")``")
      .addField(
        "__**Created the**__",
        "``" + interaction.channel.guild.createdAt
          .toUTCString()
          .substr(0, 16) + " / " + (checkDays(interaction.channel.guild.createdAt)) + "``"
      )
      .addField(
        "__**Member**__",
        "``" + interaction.guild.memberCount + "``"
      )
      .addField(`__**Roles [${roleCount}]**__`, ">>> " + rolemap)
      .setThumbnail(interaction.guild.iconURL())
      .setColor("00ff00")
      .setTimestamp()

    return interaction.reply({
      embeds: [serverinfo]
    });
  }
};
