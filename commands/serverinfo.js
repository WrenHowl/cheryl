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

    /*let rolemap = [...interaction.guild.roles.cache.values()]

      .filter(role => role.id !== interaction.guild.id && role != role.bot)

      .slice(0, 15)

      .sort((a, b) => b.position - a.position)

      .map(r => r)

      .join("\n");*/

    // if (interaction.guild.roles.cache.size > 44) rolemap += "...";

    // if (!rolemap) rolemap = "No role";

    const serverinfo = new MessageEmbed()
      .addFields(
        { name: "__**Name**__", value: "``" + interaction.guild.name + "``", inline: true },
        { name: "__**ID**__", value: "``" + interaction.guild.id + "``", inline: true },
        { name: "__**Owner**__", value: "<@" + interaction.guild.ownerId + "> ``(" + interaction.guild.ownerId + ")``", inline: true },
        { name: "__**Created the**__", value: "``" + interaction.channel.guild.createdAt.toUTCString().substr(0, 16) + " / " + (checkDays(interaction.channel.guild.createdAt)) + "``", inline: true },
        { name: "__**Member**__", value: "``" + interaction.guild.memberCount + "``", inline: true },
        { name: `__**Roles**__`, value: "``" + roleCount + "``", inline: true },
      )
      .setThumbnail(interaction.guild.iconURL())
      .setColor("2f3136")
      .setTimestamp()

    return interaction.reply({
      embeds: [serverinfo]
    });
  }
};
