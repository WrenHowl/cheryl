const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const configPreset = require("../settings/config.json");
const messagePreset = require("../settings/message.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

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
    }),
  execute: async (interaction, bot, sequelize, Sequelize) => {
    try {
      if (!interaction.guild) {
        return interaction.reply({
          content: "Use this command inside a server only!"
        });
      };

      const CommandFunction = sequelize.define("CommandFunction", {
        name: {
          type: Sequelize.STRING,
        },
        value: {
          type: Sequelize.STRING,
        },
      });

      const FindCommand = await CommandFunction.findOne({ where: { name: en.Name } });

      const MessageReason = require("../config/message.json");

      if (FindCommand) {
        if (FindCommand.value === "Disable") {
          return interaction.reply({
            content: MessageReason.CommandDisabled,
            ephemeral: true,
          });
        };
      };

      function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
      };

      let roleCount = interaction.guild.roles.cache.size;

      const guild = bot.guilds.cache.get(interaction.guild.id);
      var memberCount = guild.memberCount;

      const serverinfo = new EmbedBuilder()
        .addFields(
          { name: "Name", value: "``" + interaction.guild.name + "``", inline: true },
          { name: "ID", value: "``" + interaction.guild.id + "``", inline: true },
          { name: "Owner", value: "<@" + interaction.guild.ownerId + "> ``(" + interaction.guild.ownerId + ")``" },
          { name: "Created The", value: "``" + interaction.channel.guild.createdAt.toUTCString().substr(0, 16) + " / " + (checkDays(interaction.channel.guild.createdAt)) + "``" },
          { name: "Member Count", value: "``" + memberCount + "``", inline: true },
          { name: "Roles", value: "``" + roleCount + "``", inline: true },
        )
        .setThumbnail(interaction.guild.iconURL())
        .setColor(Color.Green);

      return interaction.reply({
        embeds: [serverinfo]
      });
    } catch (error) {
      let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
      let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
      console.log(error);

      return CrashChannel.send({ content: "**Error in the '" + en.Name + "' Command:** \n\n```javascript\n" + error + "```" });
    };
  }
};
