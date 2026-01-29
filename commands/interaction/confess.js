const { EmbedBuilder, MessageFlags } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { en, fr, de, sp, nl } = require('../../preset/language.js');
const { db } = require('../../server.js');

// Confess to something in the c hanne;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.commands.confess.setup.name)
        .setNameLocalizations({
            "fr": fr.commands.confess.setup.name,
            "de": de.commands.confess.setup.name,
            "es-ES": sp.commands.confess.setup.name,
            "nl": nl.commands.confess.setup.name
        })
        .setDescription(en.commands.confess.setup.description)
        .setDescriptionLocalizations({
            "fr": fr.commands.confess.setup.description,
            "de": de.commands.confess.setup.description,
            "es-ES": sp.commands.confess.setup.description,
            "nl": nl.commands.confess.setup.description
        })
        .addStringOption(option => option
            .setName(en.commands.confess.setup.message.name)
            .setNameLocalizations({
                "fr": fr.commands.confess.setup.message.name,
                "de": de.commands.confess.setup.message.name,
                "es-ES": sp.commands.confess.setup.message.name,
                "nl": nl.commands.confess.setup.message.name
            })
            .setDescription(en.commands.confess.setup.message.description)
            .setDescriptionLocalizations({
                "fr": fr.commands.confess.setup.message.description,
                "de": de.commands.confess.setup.message.description,
                "es-ES": sp.commands.confess.setup.message.description,
                "nl": nl.commands.confess.setup.message.description
            })
            .setRequired(true)
        ),
    execute: async (interaction) => {
        const confessionMessage = interaction.options.getString(en.commands.confess.setup.message.name);

        const request = await db.getConnection();

        const guildData = await request.query(
            `SELECT confession_count FROM guilds WHERE id=?`,
            [
                interaction.guild.id
            ]
        );

        const embed = new EmbedBuilder()
            .setTitle(`Confession #${guildData[0][0]['confession_count']}`)
            .setDescription(confessionMessage)
            .setColor('DarkButNotBlack')

        const guild_settingsData = await request.query(
            `SELECT confession_channelDestination FROM guild_settings WHERE id=?`,
            [
                interaction.guild.id
            ]
        );

        if (typeof guild_settingsData[0][0]['confession_channelDestination'] !== "object") {
            confession = await interaction.guild.channels.cache.get(guild_settingsData[0][0]['confession_channelDestination']).send({
                embeds: [embed]
            });
        } else {
            confession = await interaction.channel.send({
                embeds: [embed]
            });
        }

        await interaction.reply({
            content: `Confession sent in <#${guild_settingsData[0][0]['confession_channelDestination']}>`,
            flags: [MessageFlags.Ephemeral],
        });

        // Increase the confession count
        await request.query(
            `UPDATE guilds SET confession_count=confession_count + 1 WHERE id=?`,
            [
                interaction.guild.id
            ]
        );

        // Log basic information for moderation purpose
        await request.query(
            `INSERT INTO guild_confession (id, message_id, user_id) VALUES (?, ?, ?)`,
            [
                interaction.guild.id,
                confession.id,
                interaction.user.id
            ]
        );

        return db.releaseConnection(request);
    }
};