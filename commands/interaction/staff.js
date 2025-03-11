const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { en, fr, de, sp, nl } = require('../../preset/language');
const { bot, db } = require('../../server');
const configPreset = require('../../config/main.json');

// Display information about a user to know if they are a member of the staff of Cheryl or not.

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.commands.staff.setup.name)
        .setNameLocalizations({
            "fr": fr.commands.staff.setup.name,
            "de": de.commands.staff.setup.name,
            "es-ES": sp.commands.staff.setup.name,
            "nl": nl.commands.staff.setup.name
        })
        .setDescription(en.commands.staff.setup.description)
        .setDescriptionLocalizations({
            "fr": fr.commands.staff.setup.description,
            "de": de.commands.staff.setup.description,
            "es-ES": sp.commands.staff.setup.description,
            "nl": nl.commands.staff.setup.description
        })
        .addUserOption(option => option
            .setName(en.commands.staff.setup.user.name)
            .setNameLocalizations({
                "fr": fr.commands.staff.setup.user.name,
                "de": de.commands.staff.setup.user.name,
                "es-ES": sp.commands.staff.setup.user.name,
                "nl": nl.commands.staff.setup.user.name
            })
            .setDescription(en.commands.staff.setup.user.description)
            .setDescriptionLocalizations({
                "fr": fr.commands.staff.setup.user.description,
                "de": de.commands.staff.setup.user.description,
                "es-ES": sp.commands.staff.setup.user.description,
                "nl": nl.commands.staff.setup.user.description
            })
            .setRequired(false)),
    execute: async (interaction) => {
        const request = await db.getConnection();

        const user = interaction.options.getUser(en.commands.staff.setup.user.name);
        const userCheck = user ?
            user :
            interaction.user;
        const fetchGuild = interaction.client.guilds.cache.get(configPreset.botInfo.supportServerId);
        await fetchGuild.members.fetch();
        const staffGet = fetchGuild.members.cache.get(userCheck.id);

        const staffRoles = [
            "Lead Developer",
            "Developer",
            "Admin",
            "Mod",
            "Helper"
        ]

        if (staffRoles.includes(staffGet.roles.highest.name)) {
            defaultString = en.commands.staff.response.description.isStaff;
            replyString = defaultString.replace(/%StaffRank%/g, staffGet.roles.highest.name);
            thumbnailStaff = configPreset.other.isStaff;
            color = 'Green';
        } else {
            replyString = en.commands.staff.response.description.notStaff;
            thumbnailStaff = configPreset.other.isNotStaff;
            color = 'Red';
        }

        description = replyString.replace(/%Username%/g, userCheck.toString()).replace(/%BotName%/g, bot.user.username)

        const embed = new EmbedBuilder()
            .setColor(color)
            .setThumbnail(thumbnailStaff)
            .setDescription(description);

        await interaction.reply({
            embeds: [embed],
        });

        return db.releaseConnection(request);
    }
};