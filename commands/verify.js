const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { fr, en, de, sp, nl } = require('../preset/language')
const { db } = require('../server');

// This is a private commmand use on a one server only and only executable by me.

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName(en.verify.default.name)
        .setNameLocalizations({
            "fr": fr.verify.default.name,
            "de": de.verify.default.name,
            "es-ES": sp.verify.default.name,
            "nl": nl.verify.default.name
        })
        .setType(ApplicationCommandType.User),
    execute: async (interaction) => {
        if (!interaction.guild.id === "1082103667181764659") return;

        const request = await db.getConnection();

        // Check for the permission of the user executing the command.
        if (!interaction.member.roles.cache.some(role => role.id === '1191482864156557332')) {
            return interaction.reply({
                content: "You do not have the permission to do that.",
                ephemeral: true,
            });
        }

        // Check for the roles that the member has.
        let reason = `User verified by ${interaction.user.tag}.`;

        if (interaction.targetMember.roles.cache.some(role => role.id === '1084970943820075050')) {
            return interaction.reply({
                content: `${interaction.targetUser.toString()} is already verified.`,
                ephemeral: true,
            });
        } else if (!interaction.targetMember.roles.cache.some(role => role.id === '1084970943820075050')) {
            await member.roles.add(
                '1084970943820075050',
                reason
            )
        } else if (!interaction.targetMember.roles.cache.some(role => role.id === '1233066501825892383')) {
            await member.roles.remove(
                '1233066501825892383',
                reason
            )
        }

        // Replying to the user.
        await interaction.reply({
            content: `Currently trying to verify ${member.toString()}.`,
            ephemeral: true,
        });

        // Updating the profile.
        const profileFind = await request.query(
            'SELECT userId FROM profiles WHERE userId=?',
            [interaction.targetId]
        )

        if (profileFind[0][0] == undefined) {
            await request.query(
                'INSERT INTO profiles (userId, userName, age, verified18) VALUES (?, ?, ?, ?)',
                [interaction.targetId, interaction.targetUser.username, "Adult", true]
            )
        } else {
            await request.query(
                'UPDATE profiles SET verified18=? FROM profiles WHERE userId=?',
                [true, interaction.targetId]
            )
        }

        // Sending message in channel.
        const verifiedEmbed = new EmbedBuilder()
            .setDescription(
                'NSFW channels access -> <#1082135024264032297>',
                'Informative roles -> <#1082135082246078464>',
            )
            .setColor('Red')

        const channel18 = interaction.guild.channels.cache.get('1091220263569461349')
        await channel18.send({
            content: `${member.toString()} just got verified! Please make him feel welcomed~`,
            embeds: [verifiedEmbed],
        });

        return db.releaseConnection(request);
    }
};