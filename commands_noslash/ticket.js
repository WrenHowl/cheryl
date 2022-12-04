const Discord = require('discord.js');
const Color = require("../config/color.json");
const Message = require("../config/message.json");
const Config = require("../config/config.json");
const FR = require("../languages/fr.json");
const EN = require("../languages/en.json");
const DE = require("../languages/de.json");
const SP = require("../languages/sp.json");
const NL = require("../languages/nl.json");

module.exports = {
    name: EN.ticket.Name,
    execute: async (bot, message, args, MessageEmbed, sequelize, Sequelize) => {
        try {
            if (message.guild.members.guild.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                const CommandFunction = sequelize.define("CommandFunction", {
                    name: {
                        type: Sequelize.STRING,
                    },
                    value: {
                        type: Sequelize.STRING,
                    },
                });
                const FindCommand = await CommandFunction.findOne({ where: { name: EN.ticket.Name } });

                if (FindCommand) {
                    if (FindCommand.value === "Disable") {
                        return message.reply({
                            content: Message.CommandDisabled,
                        });
                    };
                };

                //

                const Logging = sequelize.define("Logging", {
                    GuildID: {
                        type: Sequelize.STRING,
                    },
                    ChannelIDBan: {
                        type: Sequelize.STRING,
                    },
                    Language: {
                        type: Sequelize.STRING,
                    },
                });
                const LoggingData = await Logging.findOne({ where: { GuildID: message.guild.id } });

                let LanguageData = LoggingData.language;

                if (!LanguageData || LanguageData === "en") Language = EN;
                if (LanguageData === "fr") Language = FR;
                if (LanguageData === "de") Language = DE;
                if (LanguageData === "sp") Language = SP;
                if (LanguageData === "nl") Language = NL;

                //

                if (message.member.permissions.has("MANAGE_CHANNELS")) {
                    if (message.guild.me.permissions.has("MANAGE_CHANNELS")) {
                        let collector = new Discord.MessageCollector(message.channel, message => message.author.id === message.author.id, { time: 10000 });

                        if (args.length < 1) {
                            const ErrorEmbed = new MessageEmbed()
                                .setTitle("Ticket System")
                                .addFields(
                                    { name: "1. Setup", value: "To setup the ticket system, do this ``" + Config.Prefix + "ticket setup``" }
                                )
                                .setColor(Color.Blue);

                            return message.reply({
                                embeds: [ErrorEmbed],
                            });
                        };

                        // 

                        if (args[0] === "setup") {
                            let filter = message => message.author.id === message.author.id;

                            const SetupEmbed = new MessageEmbed()
                                .setTitle("Ticket System")
                                .setDescription("**1. Name**\n\nGive your ticket a name to make it easier to recognize it!")
                                .setColor(Color.Blue);

                            message.reply({
                                embeds: [SetupEmbed],
                            }).then(() => {
                                console.log("AAA")
                                message.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 30000,
                                    errors: ['time']
                                }).then(message => {
                                    console.log("BBB")
                                    console.log(message)
                                }).catch(collected => {
                                    message.channel.send('Timeout - You waited too long!');
                                });
                            })

                            SetupEmbed.setDescription("**2. Description**\n\nGive your ticket a name to explain what it's gonna do!")
                        };
                    } else {
                        return message.reply({
                            content: Language.ticket.permission.Me,
                        });
                    };
                } else {
                    return message.reply({
                        content: Language.ticket.permission.Myself,
                    });
                };
            };
        } catch (error) {
            let FetchGuild = bot.guilds.cache.get(Config.guildId);
            let CrashChannel = FetchGuild.channels.cache.get(Config.CrashChannel);

            return CrashChannel.send({ content: "**Error in the '" + LanguageEN.ticket.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};