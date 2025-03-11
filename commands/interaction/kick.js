const { MessageFlags, PermissionsBitField } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { en, fr, de, sp, nl } = require('../../preset/language.js');
const { bot } = require('../../server.js');

// Kick a member from the server

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.commands.kick.setup.name)
        .setNameLocalizations({
            "fr": fr.commands.kick.setup.name,
            "de": de.commands.kick.setup.name,
            "es-ES": sp.commands.kick.setup.name,
            "nl": nl.commands.kick.setup.name
        })
        .setDescription(en.commands.kick.setup.description)
        .setDescriptionLocalizations({
            "fr": fr.commands.kick.setup.description,
            "de": de.commands.kick.setup.description,
            "es-ES": sp.commands.kick.setup.description,
            "nl": nl.commands.kick.setup.description
        })
        .addUserOption(option => option
            .setName(en.commands.kick.setup.user.name)
            .setNameLocalizations({
                'fr': fr.commands.kick.setup.user.name,
                'de': de.commands.kick.setup.user.name,
                'es-ES': sp.commands.kick.setup.user.name,
                'nl': nl.commands.kick.setup.user.name
            })
            .setDescription(en.commands.kick.setup.user.description)
            .setDescriptionLocalizations({
                'fr': fr.commands.kick.setup.user.description,
                'de': de.commands.kick.setup.user.description,
                'es-ES': sp.commands.kick.setup.user.description,
                'nl': nl.commands.kick.setup.user.description
            })
            .setRequired(true))
        .addStringOption(option => option
            .setName(en.commands.kick.setup.reason.name)
            .setNameLocalizations({
                'fr': fr.commands.kick.setup.reason.name,
                'de': de.commands.kick.setup.reason.name,
                'es-ES': sp.commands.kick.setup.reason.name,
                'nl': nl.commands.kick.setup.reason.name
            })
            .setDescription(en.commands.kick.setup.reason.description)
            .setDescriptionLocalizations({
                'fr': fr.commands.kick.setup.reason.description,
                'de': de.commands.kick.setup.reason.description,
                'es-ES': sp.commands.kick.setup.reason.description,
                'nl': nl.commands.kick.setup.reason.description
            })
        ),
    execute: async (interaction) => {
        const optionUser = interaction.options.getUser(en.commands.kick.setup.user.name);
        const optionReason = interaction.options.getString(en.commands.kick.setup.reason.name);
        const member = interaction.guild.members.cache.get(optionUser.id) || await interaction.guild.members.fetch(optionUser.id);

        switch (true) {
            case !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers):
                return interaction.reply({
                    content: "You do not have the required permission to execute this command.",
                    flags: [MessageFlags.Ephemeral]
                });
            case !member.kickable:
                return interaction.reply({
                    content: "You cannot kick this member, since he's not in the server.",
                    flags: [MessageFlags.Ephemeral]
                });
            case optionUser.id === interaction.member.id:
                return interaction.reply({
                    content: "You cannot kick yourself.",
                    flags: [MessageFlags.Ephemeral]
                });
            case optionUser.id === bot.user.id:
                return interaction.reply({
                    content: "You cannot kick me.",
                    flags: [MessageFlags.Ephemeral]
                });
            case optionUser.id === interaction.guild.ownerId:
                return interaction.reply({
                    content: "You cannot kick the owner of the server.",
                    flags: [MessageFlags.Ephemeral]
                });
            case member.roles.highest.position >= interaction.member.roles.highest.position && (member.roles.highest.position !== 0 && interaction.member.roles.highest.position !== 0):
                return interaction.reply({
                    content: "You cannot kick someone who is higher than you or equal to you.",
                    flags: [MessageFlags.Ephemeral]
                });
            default:
                return member.kick(optionReason)
                    .catch(async (error) => {
                        if (error) {
                            await interaction.reply({
                                content: `Failed to kick ${optionUser.toString()}. An error message should be followed up, please send it to the developers.\n\n${error}`,
                                flags: [MessageFlags.Ephemeral]
                            });
                        }
                    })
                    .then(async () => {
                        await interaction.reply({
                            content: `${optionUser.toString()} has been kicked successfully.`,
                            flags: [MessageFlags.Ephemeral]
                        });
                    });
        }
    }
};