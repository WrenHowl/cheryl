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
        })
        .addUserOption(option => option
            .setName(en.UserName)
            .setNameLocalizations({
                fr: fr.Name,
                de: de.Name,
                SpanishES: sp.Name,
                nl: nl.Name
            })
            .setDescription(en.UserDescription)
            .setDescriptionLocalizations({
                fr: fr.UserDescription,
                de: de.UserDescription,
                SpanishES: sp.UserDescription,
                nl: nl.UserDescription
            })
            .setRequired(false)),
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

            const user = interaction.options.getUser(en.UserName);

            let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
            await fetchGuild.members.fetch();

            let MemberData = user ? user : interaction.user;

            const StaffMember = fetchGuild.members.cache.get(MemberData.id);
            let StaffCheck = StaffMember ? StaffMember.roles.cache.has(Config.DevID) | StaffMember.roles.cache.has(Config.StaffID) : false;

            StaffCheck ? Thumbnail = Config.CheckMark : Thumbnail = Config.x;
            StaffCheck ? IsOrIsnt = "is" : IsOrIsnt = "isn't";

            StaffMember.roles.cache.has(Config.DevID) ? StaffRank = "**DEVELOPER**" : StaffRank = "**STAFF**";

            const staffList = new EmbedBuilder()
                .setDescription(MemberData.toString() + " " + IsOrIsnt + " a " + StaffRank + " of **" + bot.user.username + "**")
                .setThumbnail(Thumbnail)
                .setColor(Color.Green);

            return interaction.reply({
                embeds: [staffList]
            });
        } catch (error) {
            let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
            console.log(error);

            return CrashChannel.send({ content: "**Error in the '" + en.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};