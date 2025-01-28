const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { en, fr, de, sp, nl } = require('../../preset/language.js');
const { db } = require('../../server.js');

// Show the leaderboard of the server.

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.commands.leaderboard.setup.name)
        .setNameLocalizations({
            "fr": fr.commands.leaderboard.setup.name,
            "de": de.commands.leaderboard.setup.name,
            "es-ES": sp.commands.leaderboard.setup.name,
            "nl": nl.commands.leaderboard.setup.name
        })
        .setDescription(en.commands.leaderboard.setup.description)
        .setDescriptionLocalizations({
            "fr": fr.commands.leaderboard.setup.description,
            "de": de.commands.leaderboard.setup.description,
            "es-ES": sp.commands.leaderboard.setup.description,
            "nl": nl.commands.leaderboard.setup.description
        }),
    execute: async (interaction) => {
        const request = await db.getConnection();

        const titleReplace = en.commands.leaderboard.response.title;
        const descriptionReplace = en.commands.leaderboard.response.description;

        const embed = new EmbedBuilder()
            .setTitle(titleReplace.replace(/%Arg%/, interaction.guild.name))
            .setDescription(descriptionReplace.replace(/%Arg%/, interaction.guild.id))
            .setColor("Blue")

        const levelFind = await request.query(
            `SELECT * FROM levels WHERE guild_id=? ORDER BY level DESC`,
            [interaction.guild.id]
        );

        if (levelFind[0][0] != undefined && levelFind[0][0]['level'] > 1) {
            const levelOrderFind = await request.query(
                `SELECT * FROM levels WHERE guild_id=? ORDER BY xp DESC LIMIT 5 OFFSET 0`,
                [interaction.guild.id]
            )

            for (i = 0; i < levelOrderFind[0].length; i++) {
                embed.addFields(
                    { name: `#${i}`, value: '<@' + levelOrderFind[0][i]['user_id'] + '> \n**Level** → `' + levelOrderFind[0][i]['level'] + '` \n**XP** → `' + levelOrderFind[0][i]['xp'] + '`' }
                );
            }

            await interaction.reply({
                embeds: [embed]
            });
        } else {
            await interaction.reply({
                content: en.commands.leaderboard.response.noLevel,
                ephemeral: true,
            });
        };

        return db.releaseConnection(request);
    }
}