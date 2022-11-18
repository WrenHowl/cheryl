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
  execute: async (interaction, bot) => {
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
    }

    let roleCount = interaction.guild.roles.cache.size

    const guild = bot.guilds.cache.get(interaction.guild.id);
    var memberCount = guild.memberCount

    const serverinfo = new MessageEmbed()
      .addFields(
        { name: "Name", value: "``" + interaction.guild.name + "``", inline: true },
        { name: "ID", value: "``" + interaction.guild.id + "``", inline: true },
        { name: "Owner", value: "<@" + interaction.guild.ownerId + "> ``(" + interaction.guild.ownerId + ")``" },
        { name: "Created The", value: "``" + interaction.channel.guild.createdAt.toUTCString().substr(0, 16) + " / " + (checkDays(interaction.channel.guild.createdAt)) + "``" },
        { name: "Member Count", value: "``" + memberCount + "``", inline: true },
        { name: "Roles", value: "``" + roleCount + "``", inline: true },
      )
      .setThumbnail(interaction.guild.iconURL())
      .setColor(Color.Green)

    return interaction.reply({
      embeds: [serverinfo]
    });
  }
};
