const { Events, EmbedBuilder } = require('discord.js');
const { language } = require('../preset/language');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        language(message, languageSet);

        let member = message.interaction.user.toString();
        try {
            if (message.embeds[0].description.startsWith('Bump')) {
                await message.channel.send({
                    content: `${languageSet.bump.message.thanks_first} ${member} ${languageSet.bump.message.thanks_second}`
                });

                return setTimeout(async () => {
                    let bumpTimeEmbed = new EmbedBuilder()
                        .setTitle(languageSet.bump.message.embed.title)
                        .setURL(`https://disboard.org/server/${message.guild.id}`)
                        .setDescription(languageSet.bump.message.embed.description)
                        .setColor('Blue');

                    return message.channel.send({
                        content: `${member}`,
                        embeds: [bumpTimeEmbed]
                    });
                }, 7200000);
            };
        } catch (err) { return }
    }
};