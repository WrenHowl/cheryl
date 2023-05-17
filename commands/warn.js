const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const Message = require("../config/message.json");
const Config = require("../config/config.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.warn;
const en = LanguageEN.warn;
const de = LanguageDE.warn;
const sp = LanguageSP.warn;
const nl = LanguageNL.warn;

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
        .addUserOption(option => option.setName("user").setDescription("User to warn").setRequired(true))
        .addStringOption(option => option
            .setName('reason')
            .setDescription('Choose a reason')
            .setRequired(true)
        ),
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
            const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

            if (interaction.member.permissions.has("ModerateMembers")) {
                const user = interaction.options.getUser("user");
                const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(error => { });

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

                let guild = bot.guilds.cache.get(interaction.guild.id);

                guild.members.cache.get(user.id) ? userInServer = member.roles.highest.position >= interaction.member.roles.highest.position : userInServer = false;

                switch (user.id) {
                    case (!user):
                        return interaction.reply({
                            content: "I can't find this user!",
                            ephemeral: true,
                        });
                    case (interaction.member.id):
                        return interaction.reply({
                            content: "You can't warn yourself!",
                            ephemeral: true,
                        });
                    case (bot.user.id):
                        return interaction.reply({
                            content: "You can't warn me!",
                            ephemeral: true,
                        });
                    case (userInServer):
                        return interaction.reply({
                            content: "You can't warn this user, because he's higher than you!",
                            ephemeral: true,
                        });
                    default:
                        const reason = interaction.options.getString("reason");
                        const admin = interaction.user;

                        const WarnMessage = new EmbedBuilder()
                            .setDescription("``" + user.tag + "`` has been warned for ``" + reason + "``")
                            .setColor("2f3136");

                        await interaction.reply({
                            embeds: [WarnMessage],
                            ephemeral: true,
                        });

                        if (LoggingData) {
                            if (LoggingData.ChannelIDWarn) {
                                if (interaction.guild.members.me.permissionsIn(LoggingData.ChannelIDWarn).has(['SendMessages', 'ViewChannel'])) {
                                    const LogChannel = interaction.guild.channels.cache.get(LoggingData.ChannelIDWarn);

                                    const LogMessage = new EmbedBuilder()
                                        .setTitle("New Warn")
                                        .setDescription("**__User:__** ``" + user.tag + "``\n**__Reason:__** ``" + reason + "``\n**__Moderator:__** ``" + admin.tag + "``")
                                        .setFooter({ text: "ID: " + user.id })
                                        .setTimestamp()
                                        .setColor("2f3136");

                                    await LogChannel.send({
                                        embeds: [LogMessage]
                                    });
                                };
                            };
                        };

                        const WarnDm = new EmbedBuilder()
                            .setDescription("You have been warned on ``" + interaction.guild.name + "`` for ``" + reason + "`` by ``" + admin.toLocaleString() + "``.")
                            .setColor("2f3136");

                        await member.send({
                            embeds: [WarnDm],
                        }).catch(() => { return; });

                        return Warns.create({
                            UserName: user.tag,
                            UserID: user.id,
                            ModName: admin.tag,
                            ModID: admin.id,
                            Reason: reason,
                            GuildID: interaction.guild.id,
                        });
                };
            } else {
                if (interaction.guild.id === "821241527941726248") {
                    return interaction.reply({
                        content: "You cannot execute this command! You need the following roles ``Moderation`` or ``Management``.",
                        ephemeral: true,
                    });
                };

                return interaction.reply({
                    content: "You cannot execute this command! You need the following permission ``MODERATE_MEMBERS``.",
                    ephemeral: true,
                });
            };
        } catch (error) {
            let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
            console.log(error);

            return CrashChannel.send({ content: "**Error in the '" + en.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};