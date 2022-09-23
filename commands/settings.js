const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'report' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Change your server settings.')
        .addSubcommand(subcommand => subcommand
            .setName("report")
            .setDescription("Change the settings of the report system")
            .addChannelOption(option => option
                .setName("channel")
                .setDescription("Channel to receive the report")
                .setRequired(true))
            .addRoleOption(option => option
                .setName("role")
                .setDescription("Role to ping")
                .setRequired(false)))
        .addSubcommand(subcommand => subcommand
            .setName("welcome")
            .setDescription("Change the settings of the welcome system")
            .addChannelOption(option => option
                .setName("channel")
                .setDescription("Channel to send the welcome message")
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName("ticket")
            .setDescription("Change the settings of the ticket system")
            .addChannelOption(option => option
                .setName("channel")
                .setDescription("Channel to send the ticket message")
                .setRequired(true))
            .addRoleOption(option => option
                .setName("staff")
                .setDescription("Role that can manage tickets")
                .setRequired(true))
            .addStringOption(option => option
                .setName("description")
                .setDescription("Add a description to the message")
                .setRequired(false)))
        .addSubcommandGroup(group => group
            .setName("logging")
            .setDescription("Change the settings of the logging system")
            .addSubcommand(subcommand => subcommand
                .setName("ban")
                .setDescription("Change logging of the ban system")
                .addChannelOption(option => option
                    .setName("channel")
                    .setDescription("Channel to receive the log")
                    .setRequired(true)))
            .addSubcommand(subcommand => subcommand
                .setName("kick")
                .setDescription("Change logging of the kick system")
                .addChannelOption(option => option
                    .setName("channel")
                    .setDescription("Channel to receive the log")
                    .setRequired(true)))
            .addSubcommand(subcommand => subcommand
                .setName("warn")
                .setDescription("Change logging of the warn system")
                .addChannelOption(option => option
                    .setName("channel")
                    .setDescription("Channel to receive the log")
                    .setRequired(true)))
            .addSubcommand(subcommand => subcommand
                .setName("blacklist")
                .setDescription("Change logging of the blacklist system")
                .addStringOption(option => option
                    .setName("set")
                    .setDescription("Enable/Disable the blacklist logger")
                    .setRequired(true)
                    .addChoices(
                        { name: "Enable", value: "true" },
                        { name: "Disable", value: "false" },
                    ))
                .addChannelOption(option => option
                    .setName("channel")
                    .setDescription("Channel to receive alert")
                    .setRequired(true)))
        )
        .addSubcommandGroup(group => group
            .setName("verification")
            .setDescription("Change the settings of the verification system")
            .addSubcommand(subcommand => subcommand
                .setName("command")
                .setDescription("Change the settings of the verification command")
                .addChannelOption(option => option.setName("welcome").setDescription("Channel to send the welcome message").setRequired(true))
                .addRoleOption(option => option.setName("staff").setDescription("Role that can verify").setRequired(true))
                .addRoleOption(option => option.setName("add").setDescription("Role to give").setRequired(true))
                .addRoleOption(option => option.setName("remove").setDescription("Role to remove").setRequired(false)))
            .addSubcommand(subcommand => subcommand
                .setName("menu")
                .setDescription("Change the settings of the verification menu")
                .addChannelOption(option => option.setName("welcome").setDescription("Channel to send the welcome message").setRequired(true))
                .addChannelOption(option => option.setName("receive").setDescription("Channel to receive the verification").setRequired(true))
                .addRoleOption(option => option.setName("staff").setDescription("Role that can verify").setRequired(true))
                .addRoleOption(option => option.setName("add").setDescription("Role to give").setRequired(true))
                .addRoleOption(option => option.setName("remove").setDescription("Role to remove").setRequired(false)))
        ),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        if (interaction.member.permissions.has("ADMINISTRATOR") | interaction.member.permissions.has("MANAGE_GUILD") | interaction.user.id === '291262778730217472') {
            const options = interaction.options.getSubcommand();
            const channelOptions = interaction.options.getChannel("channel");
            const channelOptions2 = interaction.options.getChannel("welcome");
            const channelOptions3 = interaction.options.getChannel("receive");
            const roleOptions = interaction.options.getRole("role");
            const addRoleOptions = interaction.options.getRole("add");
            const removeRoleOptions = interaction.options.getRole("remove");
            const staffRoleOptions = interaction.options.getRole("staff");
            let booleanBlacklist = interaction.options.getString("set");
            const descriptionOptions = interaction.options.getString("description");

            const Logging = sequelize.define("Logging", {
                GuildID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDReport: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDBan: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDVerify: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDEnterServer: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDWelcome: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                StaffRoleReport: {
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
                RoleToRemoveVerify: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                EnableDisableBlacklistLogger: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDBlacklist: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDWarn: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                BanByPassRole: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDKick: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                ChannelIDReceiveVerification: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                TicketRoleID: {
                    type: Sequelize.STRING,
                    unique: false,
                }
            });

            const LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });
            if (interaction.commandName === "settings") {
                switch (options) {
                    case ("report"):
                        if (channelOptions) {
                            let role = roleOptions;
                            if (role) role = roleOptions.name;
                            if (!role) role = roleOptions;

                            if (role === "@everyone") {
                                const embed = new MessageEmbed()
                                    .setDescription("Settings Error")
                                    .addFields(
                                        { name: "**Role provided**", value: "This role (@everyone) cannot be used!", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            }

                            if (!LoggingData) {
                                if (!roleOptions) {
                                    const ReportChannelCreateData = await Logging.create({
                                        GuildID: interaction.guild.id,
                                        ChannelIDReport: channelOptions.id,
                                    })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Created")
                                        .addFields(
                                            { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    })
                                }

                                const ReportChannelCreateData = await Logging.create({
                                    GuildID: interaction.guild.id,
                                    ChannelIDReport: channelOptions.id,
                                    StaffRoleReport: roleOptions.id,
                                })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                        { name: "**Role to Ping:**", value: "<@&" + roleOptions.id + ">", inline: true }
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            } else {
                                if (!roleOptions) {
                                    const ReportChannelChangeData = await Logging.update({ ChannelIDReport: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Created")
                                        .addFields(
                                            { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    })
                                }

                                const ReportChannelChangeData = await Logging.update({ ChannelIDReport: channelOptions.id }, { where: { GuildID: interaction.guild.id } })
                                const ReportStaffRoleChangeData = await Logging.update({ StaffRoleReport: roleOptions.id }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                        { name: "**Role to Ping:**", value: "<@&" + roleOptions.id + ">", inline: true }
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            }
                        };
                    case ("verification"):
                        if (channelOptions2 & staffRoleOptions & addRoleOptions) {
                            let removeRole = removeRoleOptions;
                            if (removeRole) removeRole = removeRoleOptions.name;
                            if (!removeRole) removeRole = removeRoleOptions;

                            if (staffRoleOptions.name === "@everyone" | addRoleOptions.name === "@everyone" | removeRole === "@everyone") {
                                const embed = new MessageEmbed()
                                    .setDescription("Settings Error")
                                    .addFields(
                                        { name: "**Role provided**", value: "This role, @everyone, cannot be used!", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            }

                            if (!LoggingData) {
                                if (!removeRoleOptions) {
                                    const verificationChannelCreateData = await Logging.create({
                                        GuildID: interaction.guild.id,
                                        ChannelIDVerify: channelOptions2.id,
                                        StaffRoleVerify: staffRoleOptions.id,
                                        RoleToAddVerify: addRoleOptions.id,
                                    });

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Created")
                                        .addFields(
                                            { name: "**Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                            { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                            { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    });
                                };

                                const verificationChannelCreateData = await Logging.create({
                                    GuildID: interaction.guild.id,
                                    ChannelIDVerify: channelOptions2.id,
                                    StaffRoleVerify: staffRoleOptions.id,
                                    RoleToAddVerify: addRoleOptions.id,
                                    RoleToRemoveVerify: removeRoleOptions.id,
                                });

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                        { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                        { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                        { name: "**Role to Remove**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            } else {
                                if (!removeRoleOptions) {
                                    const VerificationChannelChangeData1 = await Logging.update({ ChannelIDVerify: channelOptions2.id }, { where: { GuildID: interaction.guild.id } })
                                    const VerificationChannelChangeData2 = await Logging.update({ StaffRoleReport: staffRoleOptions.id }, { where: { GuildID: interaction.guild.id } })
                                    const VerificationChannelChangeData3 = await Logging.update({ RoleToAddVerify: addRoleOptions.id }, { where: { GuildID: interaction.guild.id } })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Changed")
                                        .addFields(
                                            { name: "**Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                            { name: "**Staff:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                            { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    });
                                };

                                const VerificationChannelChangeData1 = await Logging.update({ ChannelIDVerify: channelOptions2.id }, { where: { GuildID: interaction.guild.id } })
                                const VerificationChannelChangeData2 = await Logging.update({ StaffRoleReport: staffRoleOptions.id }, { where: { GuildID: interaction.guild.id } })
                                const VerificationChannelChangeData3 = await Logging.update({ RoleToAddVerify: addRoleOptions.id }, { where: { GuildID: interaction.guild.id } })
                                const VerificationChannelChangeData4 = await Logging.update({ RoleToRemoveVerify: removeRoleOptions.id }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Changed")
                                    .addFields(
                                        { name: "**Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                        { name: "**Staff:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                        { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                        { name: "**Role to remove:**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            };
                        };
                    case ("welcome"):
                        if (channelOptions) {
                            if (!LoggingData) {
                                const ReportChannelCreateData = await Logging.create({
                                    GuildID: interaction.guild.id,
                                    ChannelIDWelcome: channelOptions.id,
                                })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Welcome Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            } else {
                                const ReportChannelChangeData = await Logging.update({ ChannelIDWelcome: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                                const embed = new MessageEmbed()
                                    .setDescription("Settings Created")
                                    .addFields(
                                        { name: "**Welcome Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                    )

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                })
                            }
                        };
                    /*case ("ticket"):
                        if (channelOptions & staffRoleOptions) {
                            const TicketCreateData = await Logging.create({
                                GuildID: interaction.guild.id,
                                TicketRoleID: staffRoleOptions.id,
                            });
                        } else {
                            const TicketChangeData = Logging.update({ TicketRoleID: staffRoleOptions.id }, { where: { GuildID: interaction.guild.id } })
                        }

                        const channelToSend = interaction.guild.channels.cache.get(channelOptions.id);

                        const buttonToCreateTicket = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('buttonToCreateTicket')
                                    .setLabel('➕ Create')
                                    .setStyle('SUCCESS'),
                            );

                        if (descriptionOptions) {
                            const ticketMessage = new MessageEmbed()
                                .setTitle("Ticket")
                                .setDescription(descriptionOptions)
                                .setColor("2f3136")

                            channelToSend.send({
                                embeds: [ticketMessage],
                                components: [buttonToCreateTicket]
                            });
                        } else {
                            const ticketMessage = new MessageEmbed()
                                .setTitle("Ticket")
                                .setDescription("You need help? Click on the button below to create a ticket!")
                                .setColor("2f3136")

                            channelToSend.send({
                                embeds: [ticketMessage],
                                components: [buttonToCreateTicket]
                            });
                        }

                        return interaction.reply({
                            content: "Welcome message/menu sent!",
                            ephemeral: true,
                        });*/
                };

                const secondOptions = interaction.options.getSubcommandGroup();

                switch (secondOptions) {
                    case ("logging"):
                        switch (options) {
                            case ("ban"):
                                if (channelOptions) {
                                    if (!LoggingData) {
                                        const banChannelCreateData = await Logging.create({
                                            GuildID: interaction.guild.id,
                                            ChannelIDBan: channelOptions.id,
                                        })

                                        const embed = new MessageEmbed()
                                            .setDescription("Settings Created")
                                            .addFields(
                                                { name: "**Channel**", value: "<#" + channelOptions.id + ">!", inline: true },
                                            )

                                        return interaction.reply({
                                            embeds: [embed],
                                            ephemeral: true,
                                        })
                                    }

                                    const banChannelChangeData = await Logging.update({ ChannelIDBan: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Changed")
                                        .addFields(
                                            { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    })
                                };
                            case ("kick"):
                                if (channelOptions) {
                                    if (!LoggingData) {
                                        const kickChannelCreateData = await Logging.create({
                                            GuildID: interaction.guild.id,
                                            ChannelIDKick: channelOptions.id,
                                        })

                                        const embed = new MessageEmbed()
                                            .setDescription("Settings Created")
                                            .addFields(
                                                { name: "**Channel**", value: "<#" + channelOptions.id + ">!", inline: true },
                                            )

                                        return interaction.reply({
                                            embeds: [embed],
                                            ephemeral: true,
                                        })
                                    }

                                    const kickChannelChangeData = await Logging.update({ ChannelIDKick: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Changed")
                                        .addFields(
                                            { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    })
                                };
                            case ("warn"):
                                if (channelOptions) {
                                    if (!LoggingData) {
                                        const warnChannelCreateData = await Logging.create({
                                            GuildID: interaction.guild.id,
                                            ChannelIDWarn: channelOptions.id,
                                        })

                                        const embed = new MessageEmbed()
                                            .setDescription("Settings Created")
                                            .addFields(
                                                { name: "**Channel**", value: "<#" + channelOptions.id + ">!", inline: true },
                                            )

                                        return interaction.reply({
                                            embeds: [embed],
                                            ephemeral: true,
                                        })
                                    }

                                    const warnChannelChangeData = await Logging.update({ ChannelIDWarn: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Changed")
                                        .addFields(
                                            { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true },
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    })
                                };
                            case ("blacklist"):
                                if (booleanBlacklist) {
                                    if (booleanBlacklist === "true") booleanBlacklist = "Enabled";
                                    if (booleanBlacklist === "false") booleanBlacklist = "Disabled";

                                    if (!LoggingData) {
                                        const blacklistData = await Logging.create({
                                            GuildID: interaction.guild.id,
                                            ChannelIDBlacklist: channelOptions.id,
                                            EnableDisableBlacklistLogger: booleanBlacklist,
                                        })

                                        const embed = new MessageEmbed()
                                            .setDescription("Settings Created")
                                            .addFields(
                                                { name: "**Set**", value: booleanBlacklist, inline: true },
                                                { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true }
                                            )

                                        return interaction.reply({
                                            embeds: [embed],
                                            ephemeral: true,
                                        })
                                    }

                                    const BlacklistChangeData = await Logging.update({ EnableDisableBlacklistLogger: booleanBlacklist }, { where: { GuildID: interaction.guild.id } })
                                    const BlacklistChannelChangeData = await Logging.update({ ChannelIDBlacklist: channelOptions.id }, { where: { GuildID: interaction.guild.id } })

                                    const embed = new MessageEmbed()
                                        .setDescription("Settings Changed")
                                        .addFields(
                                            { name: "**Set**", value: booleanBlacklist, inline: true },
                                            { name: "**Channel**", value: "<#" + channelOptions.id + ">", inline: true }
                                        )

                                    return interaction.reply({
                                        embeds: [embed],
                                        ephemeral: true,
                                    })

                                };
                        };
                    case ("verification"):
                        let removeRole = removeRoleOptions;
                        if (removeRole) removeRole = removeRoleOptions.name;
                        if (!removeRole) removeRole = removeRoleOptions;

                        switch (options) {
                            case ("command"):
                                if (channelOptions2 & staffRoleOptions & addRoleOptions) {
                                    if (staffRoleOptions.name === "@everyone" | addRoleOptions.name === "@everyone" | removeRole === "@everyone") {
                                        const embed = new MessageEmbed()
                                            .setDescription("Settings Error")
                                            .addFields(
                                                { name: "**Role provided**", value: "This role, @everyone, cannot be used!", inline: true },
                                            )

                                        return interaction.reply({
                                            embeds: [embed],
                                            ephemeral: true,
                                        })
                                    }

                                    if (!LoggingData) {
                                        if (!removeRoleOptions) {
                                            const verificationChannelCreateData = await Logging.create({
                                                GuildID: interaction.guild.id,
                                                ChannelIDVerify: channelOptions2.id,
                                                StaffRoleVerify: staffRoleOptions.id,
                                                RoleToAddVerify: addRoleOptions.id,
                                            });

                                            const embed = new MessageEmbed()
                                                .setDescription("Settings Created")
                                                .addFields(
                                                    { name: "**Welcome Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                                    { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                                    { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                                )

                                            return interaction.reply({
                                                embeds: [embed],
                                                ephemeral: true,
                                            });
                                        };

                                        const verificationChannelCreateData = await Logging.create({
                                            GuildID: interaction.guild.id,
                                            ChannelIDVerify: channelOptions2.id,
                                            StaffRoleVerify: staffRoleOptions.id,
                                            RoleToAddVerify: addRoleOptions.id,
                                            RoleToRemoveVerify: removeRoleOptions.id,
                                        });

                                        const embed = new MessageEmbed()
                                            .setDescription("Settings Created")
                                            .addFields(
                                                { name: "**Welcome Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                                { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                                { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                                { name: "**Role to Remove**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                            )

                                        return interaction.reply({
                                            embeds: [embed],
                                            ephemeral: true,
                                        });
                                    } else {
                                        if (!removeRoleOptions) {
                                            const VerificationChannelChangeData1 = await Logging.update({ ChannelIDVerify: channelOptions2.id }, { where: { GuildID: interaction.guild.id } })
                                            const VerificationChannelChangeData2 = await Logging.update({ StaffRoleReport: staffRoleOptions.id }, { where: { GuildID: interaction.guild.id } })
                                            const VerificationChannelChangeData3 = await Logging.update({ RoleToAddVerify: addRoleOptions.id }, { where: { GuildID: interaction.guild.id } })

                                            const embed = new MessageEmbed()
                                                .setDescription("Settings Changed")
                                                .addFields(
                                                    { name: "**Welcome Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                                    { name: "**Staff:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                                    { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                                )

                                            return interaction.reply({
                                                embeds: [embed],
                                                ephemeral: true,
                                            });
                                        };

                                        const VerificationChannelChangeData1 = await Logging.update({ ChannelIDVerify: channelOptions2.id }, { where: { GuildID: interaction.guild.id } })
                                        const VerificationChannelChangeData2 = await Logging.update({ StaffRoleReport: staffRoleOptions.id }, { where: { GuildID: interaction.guild.id } })
                                        const VerificationChannelChangeData3 = await Logging.update({ RoleToAddVerify: addRoleOptions.id }, { where: { GuildID: interaction.guild.id } })
                                        const VerificationChannelChangeData4 = await Logging.update({ RoleToRemoveVerify: removeRoleOptions.id }, { where: { GuildID: interaction.guild.id } })

                                        const embed = new MessageEmbed()
                                            .setDescription("Settings Changed")
                                            .addFields(
                                                { name: "**Welcome Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                                { name: "**Staff:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                                { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                                { name: "**Role to remove:**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                            )

                                        return interaction.reply({
                                            embeds: [embed],
                                            ephemeral: true,
                                        });
                                    };

                                };
                            case ("menu"):
                                if (channelOptions2 & channelOptions3 & staffRoleOptions & addRoleOptions) {

                                    if (staffRoleOptions.name === "@everyone" | addRoleOptions.name === "@everyone" | removeRole === "@everyone") {
                                        const embed = new MessageEmbed()
                                            .setDescription("Settings Error")
                                            .addFields(
                                                { name: "**Role provided**", value: "This role, @everyone, cannot be used!", inline: true },
                                            )

                                        return interaction.reply({
                                            embeds: [embed],
                                            ephemeral: true,
                                        })
                                    }

                                    if (!LoggingData) {
                                        if (!removeRoleOptions) {
                                            const verificationChannelCreateData = await Logging.create({
                                                GuildID: interaction.guild.id,
                                                ChannelIDVerify: channelOptions2.id,
                                                ChannelIDReceiveVerification: channelOptions3.id,
                                                StaffRoleVerify: staffRoleOptions.id,
                                                RoleToAddVerify: addRoleOptions.id,
                                            });

                                            const embed = new MessageEmbed()
                                                .setDescription("Settings Created")
                                                .addFields(
                                                    { name: "**Welcome Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                                    { name: "**Receive Channel**", value: "<#" + channelOptions3.id + ">", inline: true },
                                                    { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                                    { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                                )

                                            return interaction.reply({
                                                embeds: [embed],
                                                ephemeral: true,
                                            });
                                        };

                                        const verificationChannelCreateData = await Logging.create({
                                            GuildID: interaction.guild.id,
                                            ChannelIDVerify: channelOptions2.id,
                                            ChannelIDReceiveVerification: channelOptions3.id,
                                            StaffRoleVerify: staffRoleOptions.id,
                                            RoleToAddVerify: addRoleOptions.id,
                                            RoleToRemoveVerify: removeRoleOptions.id,
                                        });

                                        const embed = new MessageEmbed()
                                            .setDescription("Settings Created")
                                            .addFields(
                                                { name: "**Welcome Channel**", value: "<#" + channelOptions2.id + ">", inline: true },
                                                { name: "**Receive Channel**", value: "<#" + channelOptions3.id + ">", inline: true },
                                                { name: "**Staff Role**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                                { name: "**Role to Add**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                                { name: "**Role to Remove**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                            )

                                        return interaction.reply({
                                            embeds: [embed],
                                            ephemeral: true,
                                        });
                                    } else {
                                        if (!removeRoleOptions) {
                                            const VerificationChannelChangeData1 = await Logging.update({ ChannelIDVerify: channelOptions2.id }, { where: { GuildID: interaction.guild.id } })
                                            const VerificationChannelChangeData2 = await Logging.update({ ChannelIDReceiveVerification: channelOptions3.id }, { where: { GuildID: interaction.guild.id } })
                                            const VerificationChannelChangeData3 = await Logging.update({ StaffRoleReport: staffRoleOptions.id }, { where: { GuildID: interaction.guild.id } })
                                            const VerificationChannelChangeData4 = await Logging.update({ RoleToAddVerify: addRoleOptions.id }, { where: { GuildID: interaction.guild.id } })

                                            const embed = new MessageEmbed()
                                                .setDescription("Settings Changed")
                                                .addFields(
                                                    { name: "**Welcome Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                                    { name: "**Receive Channel**", value: "<#" + channelOptions3.id + ">", inline: true },
                                                    { name: "**Staff Role:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                                    { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                                )

                                            return interaction.reply({
                                                embeds: [embed],
                                                ephemeral: true,
                                            });
                                        };

                                        const VerificationChannelChangeData1 = await Logging.update({ ChannelIDVerify: channelOptions2.id }, { where: { GuildID: interaction.guild.id } })
                                        const VerificationChannelChangeData2 = await Logging.update({ ChannelIDReceiveVerification: channelOptions3.id }, { where: { GuildID: interaction.guild.id } })
                                        const VerificationChannelChangeData3 = await Logging.update({ StaffRoleReport: staffRoleOptions.id }, { where: { GuildID: interaction.guild.id } })
                                        const VerificationChannelChangeData4 = await Logging.update({ RoleToAddVerify: addRoleOptions.id }, { where: { GuildID: interaction.guild.id } })
                                        const VerificationChannelChangeData5 = await Logging.update({ RoleToRemoveVerify: removeRoleOptions.id }, { where: { GuildID: interaction.guild.id } })

                                        const embed = new MessageEmbed()
                                            .setDescription("Settings Changed")
                                            .addFields(
                                                { name: "**Welcome Channel:**", value: "<#" + channelOptions2.id + ">", inline: true },
                                                { name: "**Receive Channel**", value: "<#" + channelOptions3.id + ">", inline: true },
                                                { name: "**Staff Role:**", value: "<@&" + staffRoleOptions.id + ">", inline: true },
                                                { name: "**Role to add:**", value: "<@&" + addRoleOptions.id + ">", inline: true },
                                                { name: "**Role to remove:**", value: "<@&" + removeRoleOptions.id + ">", inline: true },
                                            )

                                        return interaction.reply({
                                            embeds: [embed],
                                            ephemeral: true,
                                        });
                                    }
                                };
                        };
                };
            };
        } else {
            return interaction.reply({
                content: "You cannot execute that command! You need the following permission ``ADMINISTRATOR`` or ``MANAGE_GUILD``.",
                ephemeral: true,
            })
        }
    }
};