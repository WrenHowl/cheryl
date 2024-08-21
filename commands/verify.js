const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { fr, en, de, sp, nl } = require('../preset/language')

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
        let loggingData = await logging.findOne({ where: { guildId: interaction.guild.id } });

        switch (loggingData.language) {
            case ("en"):
                languageSet = en;
                break;
            case ("fr"):
                languageSet = fr;
                break;
            case ("de"):
                languageSet = de;
                break;
            case ("sp"):
                languageSet = sp;
                break;
            case ("nl"):
                languageSet = nl;
                break;
            default:
                languageSet = en;
                break;
        };

        if (!interaction.guild.id === "1082103667181764659") return;

        let profileData = await profile.findOne({ where: { userId: interaction.targetId } });
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

        // Upadting profile
        profileData ? await profile.update({ verified18: true }, { where: { userId: interaction.targetId } }) :
            await profile.create({
                userTag: interaction.targetUser.username,
                userId: interaction.targetId,
                age: "Adult",
                verified18: true,
            });

        // Sending message in channel
        let channel18 = interaction.guild.channels.cache.get("1091220263569461349")

        const verifiedEmbed = new EmbedBuilder()
            .setDescription(
                "NSFW channels access -> <#1082135024264032297>",
                "Informative roles -> <#1082135082246078464>",
            )
            .setColor("Red")

        channel18.send({
            content: "Please <@&1181362122945462323> " + member.toString() + " to the cum zone!",
            embeds: [verifiedEmbed],
        });
    }
};