const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.welcomemenu;
const en = LanguageEN.welcomemenu;
const de = LanguageDE.welcomemenu;
const sp = LanguageSP.welcomemenu;
const nl = LanguageNL.welcomemenu;

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
        .addChannelOption(option => option
            .setName("welcome")
            .setDescription("Channel to send the verification message")
            .setRequired(true))
        .addChannelOption(option => option
            .setName("rules")
            .setDescription("Channel of the rules to mention in this message")
            .setRequired(true)),
    execute: async (interaction, sequelize, Sequelize) => {
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

        if (interaction.member.permissions.has("MANAGE_GUILD")) {
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
            }

            await interaction.reply({
                content: "Welcome verification message sent!",
                ephemeral: true,
            });

            const channelToSend = interaction.guild.channels.cache.get(welcomeOptions.id);

            const buttonToVerify = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('buttonToVerify')
                        .setLabel('✅ Verify')
                        .setStyle('SUCCESS'),
                );

            const secondMessage = new MessageEmbed()
                .setTitle("Verification")
                .setDescription(
                    `Welcome to **` + interaction.guild.name + `**, to gain access to the server, please click on the button below to start your verification.\n` +
                    `\nWhen you're doing your verification, please add details and take your time. There's chance you don't get accepted if you don't put any "efforts" on it.\n` +
                    `\n> :warning: If the button doesn't do anything, please make sure your discord is updated!\n` +
                    `\n*When clicking on the button 'Verify' you accept the <#` + rulesOptions.id + `> and it's consequences if you're breaking them.*`
                )
                .setColor(Color.Green)

            return channelToSend.send({
                embeds: [secondMessage],
                components: [buttonToVerify],
            });
        }
    }
};