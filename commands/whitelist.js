const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config/config.json');
const message = require('../config/message.json');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'permission' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('permission')
        .setDescription('Give permission to a user/server.')
        .addSubcommand(subcommand => subcommand
            .setName("user")
            .setDescription("Give permission to a user (Staff Cheryl).")
            .addUserOption(option => option
                .setName("user")
                .setDescription("User to manage permission.")
                .setRequired(true))
            .addStringOption(option =>
                option.setName('options')
                    .setDescription('Choose options.')
                    .setRequired(true)
                    .addChoices(
                        { name: 'add', value: 'addOptions' },
                        { name: 'remove', value: 'removeOptions' },
                    ))
            .addStringOption(option =>
                option.setName('whitelist')
                    .setDescription('Choose your whitelist.')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Blacklist', value: "blacklistPermission" },
                    )))
        .addSubcommand(subcommand => subcommand
            .setName("server")
            .setDescription("Give permission to a server (Staff Cheryl).")
            .addStringOption(option => option
                .setName("server")
                .setDescription("Server to manage permission.")
                .setRequired(true))
            .addStringOption(option =>
                option.setName('options')
                    .setDescription('Choose options.')
                    .setRequired(true)
                    .addChoices(
                        { name: 'add', value: 'addOptions' },
                        { name: 'remove', value: 'removeOptions' },
                    ))
            .addStringOption(option =>
                option.setName('whitelist')
                    .setDescription('Choose your whitelist.')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Blacklist', value: "blacklistPermission" },
                    ))),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        if (interaction.user.id === config.ownerId) {
            const Permission = sequelize.define("Permission", {
                UserName: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                UserID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                GuildID: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                BlacklistPermission: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });

            let option = interaction.options.getSubcommand();
            const options = interaction.options.getString("options");
            const addOptions = interaction.options.getString("whitelist");

            switch (option) {
                case ("user"):
                    const user = interaction.options.getUser("user");
                    const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });

                    switch (member.id) {
                        case (!member):
                            return interaction.reply({
                                content: "I can't find this user!",
                                ephemeral: true
                            })
                        case (bot.user.id):
                            return interaction.reply({
                                content: "You can't whitelist me!",
                                ephemeral: true
                            })
                        default:
                            switch (options) {
                                case ("addOptions"):
                                    switch (addOptions) {
                                        case ("blacklistPermission"):
                                            if (user) PermissionCheck = await Permission.findOne({ where: { UserID: user.id } });

                                            if (PermissionCheck) {
                                                const PermissionChange = await Permission.update({ BlacklistPermission: true }, { where: { UserID: user.id } })
                                            } else {
                                                const PermissionCreate = await Permission.create({
                                                    UserName: user.tag,
                                                    UserID: user.id,
                                                    BlacklistPermission: true,
                                                });
                                            }

                                            return interaction.reply({
                                                content: message.AddedWhitelistBlacklist,
                                                ephemeral: true,
                                            })
                                    };
                                case ("removeOptions"):
                                    switch (addOptions) {
                                        case ("blacklistPermission"):
                                            if (interaction.user.id === config.ownerId) {
                                                if (user) PermissionCheck = await Permission.findOne({ where: { UserID: user.id } });

                                                if (PermissionCheck) {
                                                    const PermissionChange = await Permission.update({ BlacklistPermission: false }, { where: { UserID: user.id } })
                                                } else {
                                                    const PermissionCreate = await Permission.create({
                                                        UserName: user.tag,
                                                        UserID: user.id,
                                                        BlacklistPermission: false,
                                                    });
                                                }

                                                return interaction.reply({
                                                    content: message.RemovedWhitelistBlacklist,
                                                    ephemeral: true,
                                                })
                                            };
                                    }
                            }
                    };
                case ("server"):
                    const server = interaction.options.getString("server");

                    switch (options) {
                        case ("addOptions"):
                            switch (addOptions) {
                                case ("blacklistPermission"):
                                    if (server) PermissionCheck = await Permission.findOne({ where: { GuildID: server } });

                                    if (PermissionCheck) {
                                        const PermissionChange = await Permission.update({ BlacklistPermission: true }, { where: { GuildID: server } })
                                    } else {
                                        const PermissionCreate = await Permission.create({
                                            GuildID: server,
                                            BlacklistPermission: true,
                                        });
                                    }

                                    return interaction.reply({
                                        content: message.AddedWhitelistBlacklist,
                                        ephemeral: true,
                                    })
                            };
                        case ("removeOptions"):
                            switch (addOptions) {
                                case ("blacklistPermission"):
                                    if (interaction.user.id === config.ownerId) {
                                        if (user) PermissionCheck = await Permission.findOne({ where: { GuildID: server } });

                                        if (PermissionCheck) {
                                            const PermissionChange = await Permission.update({ BlacklistPermission: false }, { where: { GuildID: server } })
                                        } else {
                                            const PermissionCreate = await Permission.create({
                                                GuildID: server,
                                                BlacklistPermission: false,
                                            });
                                        }

                                        return interaction.reply({
                                            content: message.RemovedWhitelistBlacklist,
                                            ephemeral: true,
                                        })
                                    };
                            }
                    };
            }
        }
    }
};