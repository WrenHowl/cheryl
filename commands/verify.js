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
        db.getConnection();

        let member = interaction.guild.members.cache.get(interaction.targetId);

        if (!interaction.member.roles.cache.some(role => role.id === "1191482864156557332")) {
            return interaction.reply({
                content: "You do not have the permission to do that.",
                ephemeral: true,
            });
        } else if (interaction.targetMember.roles.cache.some(role => role.id === "1084970943820075050")) {
            return interaction.reply({
                content: "This member is already verified.",
                ephemeral: true,
            });
        };

        await interaction.reply({
            content: "Success.",
            ephemeral: true,
        });

        // Giving/removing roles
        await member.roles.add("1084970943820075050", "Age Verification: Verified by " + interaction.user.tag).catch(() => { return });
        await member.roles.remove("1233066501825892383", "Age verification process");

        // Updating profile
        await db.query('SELECT userId FROM profiles WHERE userId=?',
            [interaction.targetId]
        )
            .then(async (response) => {
                if (response[0][0] == undefined) {
                    await db.query('INSERT INTO profiles (userId, userName, age, verified18) VALUES (?, ?, ?, ?) WHERE userId=?',
                        [interaction.targetId, interaction.targetUser.username, "Adult", true]
                    )
                } else {
                    await db.query('UPDATE profiles SET verified18=? FROM profiles WHERE userId=?',
                        [true, interaction.targetId]
                    )
                }
            });

        // Sending message in channel
        let channel18 = interaction.guild.channels.cache.get("1091220263569461349")

        const verifiedEmbed = new EmbedBuilder()
            .setDescription(
                "NSFW channels access -> <#1082135024264032297>",
                "Informative roles -> <#1082135082246078464>",
            )
            .setColor("Red")

        await channel18.send({
            content: "Please <@&1181362122945462323> " + member.toString() + " to the cum zone!",
            embeds: [verifiedEmbed],
        });

        return db.releaseConnection();
    }
};