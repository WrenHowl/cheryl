const { Events } = require('discord.js');
const { en } = require('.../preset/language')
const { db } = require('.../server');

async function ticketCreate(request) {

    db.releaseConnection(request);
}

async function inTicket(request) {

    db.releaseConnection(request);
}

async function action() {
    const request = await db.getConnection();

    const actionFind = await request.query(
        `SELECT * FROM actionimages WHERE messageId=?`,
        [interaction.message.id]
    )

    if (actionFind[0][0] == undefined) return;

    userId = actionFind[0][0]['userId'];
    url = actionFind[0][0]['url'];
    category = actionFind[0][0]['category'];
    createdAt = actionFind[0][0]['createdAt'];

    let suggestionEmbed = new EmbedBuilder()
        .addFields(
            { name: 'User', value: `<@${userId}>`, inline: true },
            { name: 'Category', value: category, inline: true },
            { name: 'Image URL', value: imageUrl, inline: true },
        )
        .setImage(interaction.message.embeds[0].image.url);

    // Fetching the message to edit it
    interaction.channel.messages.fetch(interaction.message.id).then(async () => {
        // Checking for the interaction name and sending the appropriate response
        switch (interaction.customId) {
            case ('acceptSuggestionAction'):
                await request.query(
                    `UPDATE actionimages SET url=? WHERE messageId=?`,
                    [interaction.message.embeds[0].image.url, interaction.message.id]
                );

                suggestionEmbed.addFields(
                    { name: 'Status', value: 'Accepted' }
                );
                suggestionEmbed.setColor('Green');

                response = `The image you suggested the (${createdAt}) has been denied. Thank you for your contribution!`;
                break;
            case ('denySuggestionAction'):
                suggestionEmbed.addFields(
                    { name: 'Status', value: 'Denied' },
                );
                suggestionEmbed.setColor('Red');

                response = `The image (${actionImageData.id}) you suggested has been denied.`;

                request.query(
                    `DELETE FROM actionimages WHERE messageId=?`,
                    [interaction.message.id]
                );
                break;
        };

        bot.users.cache.get(actionImageData.userId).send({
            content: response,
        });

        await interaction.update({
            embeds: [suggestionEmbed],
            components: []
        });

    })
}

module.exports = {
    ticketCreate,
    inTicket
};