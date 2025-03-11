const { MessageFlags, PermissionsBitField } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { en, fr, de, sp, nl } = require('../../preset/language.js');
const { bot } = require('../../server.js');

// Ban a member from the server

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.commands.ban.setup.name)
        .setNameLocalizations({
            "fr": fr.commands.ban.setup.name,
            "de": de.commands.ban.setup.name,
            "es-ES": sp.commands.ban.setup.name,
            "nl": nl.commands.ban.setup.name
        })
        .setDescription(en.commands.ban.setup.description)
        .setDescriptionLocalizations({
            "fr": fr.commands.ban.setup.description,
            "de": de.commands.ban.setup.description,
            "es-ES": sp.commands.ban.setup.description,
            "nl": nl.commands.ban.setup.description
        })
        .addUserOption(option => option
            .setName(en.commands.ban.setup.user.name)
            .setNameLocalizations({
                'fr': fr.commands.ban.setup.user.name,
                'de': de.commands.ban.setup.user.name,
                'es-ES': sp.commands.ban.setup.user.name,
                'nl': nl.commands.ban.setup.user.name
            })
            .setDescription(en.commands.ban.setup.user.description)
            .setDescriptionLocalizations({
                'fr': fr.commands.ban.setup.user.description,
                'de': de.commands.ban.setup.user.description,
                'es-ES': sp.commands.ban.setup.user.description,
                'nl': nl.commands.ban.setup.user.description
            })
            .setRequired(true))
        .addStringOption(option => option
            .setName(en.commands.ban.setup.reason.name)
            .setNameLocalizations({
                'fr': fr.commands.ban.setup.reason.name,
                'de': de.commands.ban.setup.reason.name,
                'es-ES': sp.commands.ban.setup.reason.name,
                'nl': nl.commands.ban.setup.reason.name
            })
            .setDescription(en.commands.ban.setup.reason.description)
            .setDescriptionLocalizations({
                'fr': fr.commands.ban.setup.reason.description,
                'de': de.commands.ban.setup.reason.description,
                'es-ES': sp.commands.ban.setup.reason.description,
                'nl': nl.commands.ban.setup.reason.description
            })
        ),
    execute: async (interaction) => {
        const optionUser = interaction.options.getUser(en.commands.ban.setup.user.name);
        const optionReason = interaction.options.getString(en.commands.ban.setup.reason.name);
        const member = interaction.guild.members.cache.get(optionUser.id) || await interaction.guild.members.fetch(optionUser.id);

        switch (true) {
            case !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers):
                return interaction.reply({
                    content: "You do not have the required permission to execute this command.",
                    flags: [MessageFlags.Ephemeral]
                });
            case optionUser.id === interaction.member.id:
                return interaction.reply({
                    content: "You cannot ban yourself.",
                    flags: [MessageFlags.Ephemeral]
                });
            case optionUser.id === bot.user.id:
                return interaction.reply({
                    content: "You cannot ban me.",
                    flags: [MessageFlags.Ephemeral]
                });
            case optionUser.id === interaction.guild.ownerId:
                return interaction.reply({
                    content: "You cannot ban the owner of the server.",
                    flags: [MessageFlags.Ephemeral]
                });
            case member.roles.highest.position >= interaction.member.roles.highest.position && (member.roles.highest.position !== 0 && interaction.member.roles.highest.position !== 0):
                return interaction.reply({
                    content: "You cannot ban someone who is higher than you or equal to you.",
                    flags: [MessageFlags.Ephemeral]
                });
            default:
                return interaction.guild.members.ban(optionUser.id, { reason: `${optionReason} by ${interaction.user.username}` })
                    .catch(async (error) => {
                        if (error) {
                            await interaction.reply({
                                content: `Failed to ban ${optionUser.toString()}. An error message should be followed up, please send it to the developers.\n\n${error}`,
                                flags: [MessageFlags.Ephemeral]
                            });
                        }
                    })
                    .then(async () => {
                        await interaction.reply({
                            content: `${optionUser.toString()} has been banned successfully.`,
                            flags: [MessageFlags.Ephemeral]
                        });
                    });
        }
    }
};