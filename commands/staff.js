const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const Config = require("../config/config.json");
const Message = require('../config/message.json');
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.staff;
const en = LanguageEN.staff;
const de = LanguageDE.staff;
const sp = LanguageSP.staff;
const nl = LanguageNL.staff;

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

            const staffList = new MessageEmbed()
                .setDescription(MemberData.toString() + " " + IsOrIsnt + " a staff member of `" + bot.user.username + "`")
                .setThumbnail(Thumbnail)
                .setColor(Color.Green);

            return interaction.reply({
                embeds: [staffList]
            });
        } catch (error) {
            let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);

            CrashChannel.send({ content: "**Error in the " + en.Name + " Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};