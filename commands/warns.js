const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const configPreset = require("../settings/config.json");

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
            .setName("user")
            .setDescription("User to check warns")
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

            const Logging = sequelize.define("Logging", {
                GuildID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDWarn: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });
            const Warns = sequelize.define("Warns", {
                UserName: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                UserID: {
                    type: Sequelize.STRING,
                    unique: false,
                    primaryKey: false,
                },
                ModName: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ModID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                Reason: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                GuildID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });

            const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

            const user = interaction.options.getUser("user");

            user ? MemberData = user : MemberData = interaction.user;

            let member = interaction.guild.members.cache.get(MemberData.id) || await interaction.guild.members.fetch(MemberData.id).catch(err => { });

            switch (MemberData.id) {
                case (!MemberData):
                    return interaction.reply({
                        content: "I can't find this user!",
                        ephemeral: true,
                    });
                case (bot.user.id):
                    return interaction.reply({
                        content: "You can't check my warns!",
                        ephemeral: true,
                    });
                default:
                    /*const ShowWarns = new MessageEmbed()
                        .setDescription("Warns of ``" + user.tag + "``")
                        .setColor("2f3136");*/

                    return interaction.reply({
                        content: "Currently unavailable"
                    });
            };
        } catch (error) {
            let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
            console.log(error);

            return CrashChannel.send({ content: "**Error in the '" + en.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
}