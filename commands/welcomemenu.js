const { ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder } = require('discord.js');
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
        .addChannelOption(option => option
            .setName("welcome")
            .setDescription("Channel to send the verification message")
            .setRequired(true))
        .addChannelOption(option => option
            .setName("rules")
            .setDescription("Channel of the rules to mention in this message")
            .setRequired(true)),
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

            const welcomeOptions = interaction.options.getChannel("welcome");
            const rulesOptions = interaction.options.getChannel("rules");

            if (interaction.member.permissions.has("ManageGuild")) {
                const Logging = sequelize.define("Logging", {
                    GuildID: {
                        type: Sequelize.STRING,
                        unique: false,
                    },
                    ChannelIDVerify: {
                        type: Sequelize.STRING,
                        unique: false,
                    },
                    StaffRoleVerify: {
                        type: Sequelize.STRING,
                        unique: false,
                    },
                    RoleToAddVerify: {
                        type: Sequelize.STRING,
                        unique: false,
                    },
                    ChannelIDReceiveVerification: {
                        type: Sequelize.STRING,
                        unique: false,
                    },
                });

                const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

                if (!LoggingData) {
                    return interaction.reply({
                        content: "There's some setting that aren't setup on that server for that command. Please use ``/settings`` to start setting it up.",
                        ephemeral: true,
                    });
                } else if (!LoggingData.ChannelIDVerify || !LoggingData.ChannelIDReceiveVerification || !LoggingData.StaffRoleVerify || !LoggingData.RoleToAddVerify) {
                    return interaction.reply({
                        content: "There's some setting that aren't setup on that server for that command. Please use ``/settings`` to start setting it up.",
                        ephemeral: true,
                    });
                };

                await interaction.reply({
                    content: "Welcome verification message sent!",
                    ephemeral: true,
                });

                const channelToSend = interaction.guild.channels.cache.get(welcomeOptions.id);

                const buttonToVerify = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('buttonToVerify')
                            .setLabel('✅ Verify')
                            .setStyle(ButtonStyle.Success)
                    );

                const secondMessage = new EmbedBuilder()
                    .setTitle("Verification")
                    .setDescription(
                        `Welcome to **` + interaction.guild.name + `**, to gain access to the server, please click on the button below to start your verification.\n` +
                        `\nWhen you're doing your verification, please add details and take your time. There's chance you don't get accepted if you don't put any "efforts" on it.\n` +
                        `\n> :warning: If the button doesn't do anything, please make sure your discord is updated!\n` +
                        `\n*When clicking on the button 'Verify' you accept the <#` + rulesOptions.id + `> and it's consequences if you're breaking them.*`
                    )
                    .setColor(Color.Green);

                return channelToSend.send({
                    embeds: [secondMessage],
                    components: [buttonToVerify],
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