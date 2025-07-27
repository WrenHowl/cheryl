const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags } = require('discord.js');
const { en, fr, de, sp, nl } = require('../../preset/language');
const configPreset = require('../../config/main.json');
const { db } = require('../../server');

// This is a private commmand use on a one server only and only executable by me.

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName(en.context.details.setup.name)
        .setNameLocalizations({
            "fr": fr.context.details.setup.name,
            "de": de.context.details.setup.name,
            "es-ES": sp.context.details.setup.name,
            "nl": nl.context.details.setup.name
        })
        .setType(ApplicationCommandType.Message),
    execute: async (interaction) => {
        const messageTarget = `https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.targetId}`;
        const message = await interaction.channel.messages.fetch(interaction.targetId)

        const embed = new EmbedBuilder()
            .setColor('DarkButNotBlack')

        const request = await db.getConnection();

        const guild_confessionData = await request.query(
            `SELECT * FROM guild_confession WHERE id=? AND message_id=?`,
            [
                interaction.guild.id,
                interaction.targetId
            ]
        );

        if (message.author.id === configPreset.botPrivateInfo.botId && message.embeds[0].title.match(/Confession/) && interaction.user.id === '291262778730217472') {
            embed.addFields(
                { name: "Confessant", value: `<@${guild_confessionData[0][0]['user_id']}>`, inline: true },
                { name: "Confessant ID", value: "``" + guild_confessionData[0][0]['user_id'] + "``", inline: true },
                { name: '\u200b', value: '\u200b', inline: true },
            )
        } else {
            embed.addFields(
                { name: "Author", value: message.author.toString(), inline: true },
                { name: "Author ID", value: "``" + message.author.id + "``", inline: true },
                { name: '\u200b', value: '\u200b', inline: true },
            )
        }

        embed.addFields(
            { name: "Message", value: messageTarget, inline: true },
            { name: "Message ID", value: "``" + interaction.targetId + "``", inline: true },
            { name: '\u200b', value: '\u200b', inline: true },
        )

        await interaction.reply({
            embeds: [embed],
            flags: [MessageFlags.Ephemeral]
        });

        return db.releaseConnection(request);
    }
}